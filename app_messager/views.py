from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.renderers import JSONRenderer


from sesame.utils import get_token
from django.http import HttpResponseForbidden, JsonResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404

from .correctors import md5_chacker, check_unique_file
from .models import GroupsModel, FileModels, Chat_MessageModel
from .forms import UploadFileForm # UploadFileForm
import os
import websocket, json

from rest_framework.viewsets import ModelViewSet
from .serializers import Chat_MessageSerializer, File_MessagesSerializer, MessageUpdateSerializer
from rest_framework.response import Response
# Create your views here.

def chat_page(request, room_name):
	User = get_user_model()
	user = User.objects.get(username ='root') # !!!!!!!
	BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
	file_names_js = os.listdir(os.path.join(BASE_DIR,'app_messager\\static\\js\\'))[-1]
	file_names_css = os.listdir(os.path.join(BASE_DIR, 'app_messager\\static\\css'))[-1]
	file_names_pic = os.listdir(os.path.join(BASE_DIR, 'app_messager\\static\\pic'))[-1]

	get_token(user)
	return render(request, 'index.html', {
		'user_index': 3, # user.id,
		'static_files': {'js': file_names_js, 'css': file_names_css, 'pic': file_names_pic},
		'room_name' : room_name }
	              )


# @login_required
def HomeView(request):
	'''The homepage where all groups are listed'''
	groups = GroupsModel.objects.all()
	user = request.user
	context = {
		'groups': groups,
		'user': user
	}
	return render(request, template_name='chat/home.html', context=context)

def serialize_file_models(obj):
    if isinstance(obj, FileModels):
        return obj.__dict__
    return obj

def upload_file(request,*args, **kwargs):

	'''
	TODO: That is upload files
	:param request:
	:param listIndexes:
	:return:
	'''
	# form_class = UploadFileForm
	if request.method == 'POST':
		try:
			form_file = UploadFileForm(request.POST, request.FILES)
			files = request.FILES.getlist('file')
			# old_post_id = request.POST.get('postId');
			lis_indexes = []
			if form_file.is_valid():
				for pic in list(files):
					file_model = FileModels(link=pic, size=pic.size)
					link_new_file = file_model.link

					file_model.save()
					id_new_file = file_model.id
					''' ------ '''
					fs_old = FileModels.objects.all()
					fs_old_list = list(fs_old)
					unique_true_link = check_unique_file(id_new_file, str(link_new_file), fs_old_list)
					print('TYPE: ==', type(unique_true_link) == str)

					if type(unique_true_link) == str:
						FileModels.objects.get(id=id_new_file).delete()
						result = [res.__dict__ for res in FileModels.objects.filter(link=unique_true_link)]
						lis_indexes.append(result[0]['id'])
					else:
						result = str((file_model).id)

						lis_indexes.append(result)
				'''An Id returning of the new file'''
				lis_indexes_copy = list(set(lis_indexes))[:]
				result_string = json.dumps({"list_indexes": lis_indexes_copy})
				return JsonResponse({"index": result_string})
		except (Exception, FileExistsError):
			print('[upload_file > POST]: There is something now that is wrong')
			return JsonResponse({"ERROR": Exception })
	elif request.method == 'GET':
		try:
			if ('indexes' in dict(request.GET)):
				params_list = list((request.GET).getlist('indexes'))[0].split(',')
				params_len:int = len(params_list)

				if (params_len > 0):
					link_list = []
					for i in range(0, params_len):
						f_row = FileModels.objects.filter(id = int(params_list[i]))
						link_list.append([str((list(f_row)[0]).link), str((list(f_row)[0]).id)]) ## link_list.append(str((list(f_row)[0]).link))

					json_str = json.dumps({'linkList': link_list})
					return JsonResponse({'files':json_str})
		except (Exception):
			print('[upload_file > GET]: There is something now that is wrong')
	return JsonResponse({"error": 'Here is something that wrong~!'})



class PostAPIFilterViews(ModelViewSet):
	queryset = Chat_MessageModel.objects.all()
	serializer_class = Chat_MessageSerializer

	def get(self, request, format=None):
		if request.method != 'GET':
			return

		queryset = request.query_params['searcher']
		new_data = Chat_MessageModel.objects.filter(content__contains = queryset)
		args = []
		for i in range(0, len(list(new_data))):
			new_data_dict = new_data[i].__dict__
			kwargs = {
				'authorId': new_data_dict['author_id'],
				'message': new_data_dict['content'],
				'groupId': new_data_dict['group_id'],
				"postId": new_data_dict['subgroup_id'],
				'dataTime':new_data_dict['timestamp']
			}
			args.append(kwargs);
		r = JSONRenderer().render({'searcher': args})

		return Response(r)


class MessageUpdateViews(ModelViewSet):
	queryset = Chat_MessageModel.objects.all()
	serializer_class = MessageUpdateSerializer

	def update(self, request, *args, **kwargs):
		if self.request.stream.method == 'PATCH':
			pk = kwargs.get('pk', None)
			if not pk:
				return Response({'error': "Method PATCH not allowed"})

			try:
				instance = Chat_MessageModel.objects.filter(pk=pk)
			except Chat_MessageModel.DoesNotExist:
				return Response({'error': "Object not found"}, status=status.HTTP_404_NOT_FOUND)
			# serializer.update(validated_data=request.data, instance=instance[0])
			serializer = self.get_serializer(instance[0], data=request.data, partial=True)
			# serializer.save()

			if serializer.is_valid():
				serializer.save()
				return Response(serializer.data, status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

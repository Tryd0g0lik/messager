from datetime import datetime
from http import HTTPStatus

from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_protect
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.views import APIView


from sesame.utils import get_token
from django.http import HttpResponseForbidden, JsonResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404


from project.settings import BASE_DIR, MEDIA_ROOT
from .correctors import md5_chacker, check_unique_file
from .models import GroupsModel, FileModels, Chat_MessageModel
from .forms import UploadFileForm # UploadFileForm
import os
import websocket, json

from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.viewsets import ModelViewSet
from .serializers import Chat_MessageSerializer, File_MessagesSerializer
from rest_framework.response import Response
from rest_framework import status, generics
import hashlib
# Create your views here.
from django.http import HttpResponse

def chat_page(request, room_name):
	User = get_user_model()
	# user = User.objects.all()
	user = User.objects.get(username ='root') # !!!!!!!
	BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
	file_names_js = os.listdir(os.path.join(BASE_DIR,'app_messager\\static\\js\\'))[-1]
	file_names_css = os.listdir(os.path.join(BASE_DIR, 'app_messager\\static\\css'))[-1]
	file_names_pic = os.listdir(os.path.join(BASE_DIR, 'app_messager\\static\\pic'))[-1]

	get_token(user)
	# ws = websocket.WebSocket()
	# ws.connect('ws://localhost:6379/ws/tableData/')
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

def upload_file(request, listIndexes = None):
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



class UpdateMessages(generics.UpdateAPIView):
	queryset = Chat_MessageModel.objects.all()
	serializer_class = Chat_MessageSerializer

	def patch(self, request, *args, **kwargs):
		'''
		TODO: rewrite chat text/message and files add
		:param request:
		:param args:
		:param kwargs:
		:return:
		'''
		queryse_post_id = kwargs['pk']
		queryset_file =  request.data['filesId'] if 'filesId' in request.data else [] # list a file's indexes
		queryset_contents = request.data['content'] if 'content' in request.data else ''
		new_list_indexes = []
		'''receive an all rows. If a row > 1  then we have files from single post'''
		chat_list = Chat_MessageModel.objects.filter(subgroup_id=queryse_post_id)

		if (len(chat_list) == 0):
			JsonResponse({'update': False})

		'''simply a metadata for patch'''
		if (len(queryset_file) > 0):
			if (chat_list[0].file_id == None):
				file_id = None
			else:
				file_id = chat_list[0].file_id


			check = False # row does not has a file in message/post from db (That metadata)
			if (file_id != None and len(chat_list) > 0):
				check = True # in row is a file
				''' drop the file_id duplicate from еру received list'''
				for i in range(0, len(queryset_file)):
					for ind in range(0, len(chat_list)):
						if (int(queryset_file[i]) == chat_list[ind]):
							new_list_indexes.append(queryset_file.pop(i))
							chat_list.pop(ind)
							i -=1
							ind -=1

			response_i = -1
			chat_copy = chat_list[:]
			if (check == True):
				for i in range(0, len(queryset_file)):
					if queryset_contents != chat_copy[0].content:
						'''rewrites content/message of db's old row'''
						for i in range(0, len(chat_list)):
							chat_list[i].content = queryset_contents if queryset_contents != chat_copy[i].content else chat_copy[i].content
							chat_list[i].save()

					Chat_MessageModel(
						content= queryset_contents if queryset_contents != chat_copy[0].content else chat_copy[0].content,
						author_id= chat_copy[0].author_id,
						file_id= int(queryset_file[0]) if len(queryset_file) > 0 else None,
						group_id = chat_copy[0].group_id,
						subgroup_id= chat_copy[0].subgroup_id,
					).save()
					new_list_indexes.append(queryset_file.pop(0))


			elif (check == False):
				chat_list[0].file_id = int(queryset_file[0]) if len(queryset_file) > 0 else None
				chat_list[0].content = queryset_contents if queryset_contents != chat_copy[0].content else chat_copy[0].content
				chat_list[0].save()
				new_list_indexes.append(queryset_file.pop(0))

				for i in range(0, len(queryset_file)):
					Chat_MessageModel(
						content=queryset_contents if queryset_contents != chat_list[0].content else chat_list[0].content,
						author_id=chat_list[0].author_id,
						file_id=int(queryset_file[0]),
						group_id=chat_list[0].group_id,
						subgroup_id=chat_list[0].subgroup_id,
					).save()
					new_list_indexes.append(queryset_file.pop(0))

		else:
			for i in range(0, len(chat_list)):
				chat_list[i].content = queryset_contents
				chat_list[i].save()

		request.pk = kwargs['pk']
		return  JsonResponse(request)
		# return self.partial_update(request, *args, **kwargs)
#
class PostAPIDetailView(generics.RetrieveUpdateDestroyAPIView):
	queryset = Chat_MessageModel.objects.all()
	serializer_class = Chat_MessageSerializer
	list_backends = []


class PostAPIFilterViews(generics.ListCreateAPIView):
	queryset = Chat_MessageModel.objects.all()
	serializer_class = Chat_MessageSerializer

	def get(self, request, *args, **kwargs):
		self.status_code = HTTPStatus.OK
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
		self.r = {'searcher': args, 'status_code': 200}
		return JsonResponse(self.r) # self.list(request, args, **kwargs)
	def post(self, request, *args, **kwargs):
		'''
		TODO: Create a new post
		:param request:
		:param args:
		:param kwargs:
		:return:
		'''
		from app_messager.models import SubGroupsModel, GroupsModel
		json_data = dict(request.data)
		queryset_corrects =json_data['corrects'] if 'corrects' in json_data else ''
		queryset_eventtime=json_data['eventtime'] if 'eventtime' in json_data else ''

		queryset_message = ''
		if 'eventtime' in json_data:
			queryset_message=json_data['message']
		elif 'content' in json_data:
			queryset_message = json_data['content'][0]

		queryset_userId=int(json_data['userId']) if 'userId' in json_data else \
			int(json_data['author'][0])

		queryset_groupId=json_data['groupId'] if 'groupId' in json_data else \
			GroupsModel.objects.get(pk=int(json_data['group'][0])).uuid

		subgroup = SubGroupsModel();
		subgroup.save()
		queryset_subgroup_id = SubGroupsModel.objects.last().id

		print('============ send_chat_message_inDB ============')
		group_all = GroupsModel.objects.all()
		group_all_len = len(list(group_all))

		id = 0
		# 	'''
		# 		Check a group number 'ID' in the 'groupId'
		# 	'''
		for i in range(0, group_all_len):
			if (str(list(group_all)[i].uuid) in str(queryset_groupId)):
				id = list(group_all)[i].id

		chat: object = {}
		file = []
		if ('fileIndex' in json_data or \
			('file' in json_data and len(json_data['file'][0]) != 0)): # data_message

			if 'file' in json_data:
				file = json_data['file']
				if len(file[0]) == 0:
					file = []
			# chat.file_id = data_message['fileIndex']
			elif 'fileIndex' in json_data:
				file = json_data['fileIndex']

			for ind in range(0, len(list(file))):
				chat = Chat_MessageModel(content = f"{queryset_message}", group_id = id,
				                         author_id = queryset_userId,
				                         file_id=int(list(file)[ind]),
				                         subgroup_id = queryset_subgroup_id)
				chat.save()

		elif ('fileIndex' not in json_data): # data_message
			chat = Chat_MessageModel(content = f"{queryset_message}",
			                         group_id = id, author_id = queryset_userId,
			                         file_id=None, subgroup_id = queryset_subgroup_id)
			chat.save()
		resp = Chat_MessageModel.objects.get(pk=chat.id).__dict__
		# "id":resp['id'],
		kwargs = {
			'corrects': queryset_corrects,
	    'userId':resp['author_id'],
	    'message':resp['content'],
	    'groupId':resp['group_id'],
			"postId": resp['subgroup_id'],
			"eventtime":queryset_eventtime,
			'fileIndex':file,
			'indexes':file,
	    'fileInd': resp['file_id'],
	    'subgroup_id': resp['subgroup_id']
	    }
		return JsonResponse({'data': kwargs})# self.create(request, *args, **kwargs)

	# def get(self, request, *args, **kwargs):
	# 	query_keys = request.query_params.keys()
	# 	query_set = request.query_params
	# 	profile_list = Chat_MessageModel.objects.filter(author_id = int(query_set.get('author_id')))
	#
	# 	if 'group_id' in query_keys:
	# 		profile_list = profile_list.filter(group_id = int(query_set.get('group_id')))
	# 	if 'content' in query_keys:
	# 		profile_list = profile_list.filter(content = query_set.get('content'))
	#
	#
	# 	serializzer = Chat_MessageSerializer(profile_list, many=True)
	# 	return  Response(serializzer.data)


## Single post/message removes
class PostAPIDeleteFilelView(generics.RetrieveUpdateDestroyAPIView):
	authentication_classes=[] #!!!  not touch
	queryset = Chat_MessageModel.objects.all()
	serializer_class = Chat_MessageSerializer
	list_backends = []

	def delete(self, request, *args, **kwargs):
		query_file_id = int( request.query_params.get('file_id')) # one the file for delete
		query_post_id = int(request.query_params.get('post_id'))
		query_post_bool = 'true' in request.query_params.get('postRemove'); # if True that is a post remove, or not
		response_file_list = FileModels.objects.filter(pk=  query_file_id)
		response_post_list = Chat_MessageModel.objects.filter(subgroup_id=query_post_id)

		# if ((len(list(response_file_list)) == 0)):
		if ((len(list(response_post_list)) > 0) and query_post_bool == True):
			response_post_list[0].subgroup.delete()
			response_post_list[0].delete()
			return JsonResponse({'remove': True})
			# return JsonResponse({'remove': False})

		response_post_list = Chat_MessageModel.objects.filter(file_id=query_file_id)# more line

		response_subgroup_id_list = Chat_MessageModel.objects \
			.filter(subgroup_id = response_post_list[0].subgroup_id)
		if len(list(response_subgroup_id_list)) >= 1:
			rows_list = response_subgroup_id_list
			if (len(list(rows_list)) > 1):
				response_post_list[0].delete()

		response_file_list[0].delete()

		return JsonResponse({'remove': False})
# def get_queryset(self, *args, **kwargs):
	# 	# instance = self.get_object()
	# 	# serializer = self.get_serializer(instance)
	# 	return Chat_MessageModel.objects.filter(pk = self.kwargs['pk'])



	#
	# 	list_list = Chat_MessageModel.objects.filter(pk=message_pk);
	# 	if (len(list_list) > 0):
	# 		file_id = list_list[0].file_id
	# 		# kwargs['pk'] = file_id
	# 		# request.parser_context['pk'] = file_id
	# 		# request.parser_context['kwargs'] = file_id
	# 		content_one = (Chat_MessageModel.objects.filter(pk=message_pk)[0]).content
	# 		content_list = Chat_MessageModel.objects.filter(content=content_one)
	#
	# 		if len(list(content_list)) == 1:
	# 			list_list[0].file_id = '[NULL]'
	# 	return self.destroy(request, *args, **kwargs)
	# def delete(self, request, *args, **kwargs):
	# 	# message_pk = kwargs['pk']
	# 	# list_list = Chat_MessageModel.objects.filter(pk=message_pk);
	#
	# 	if (len(list_list) > 0):
	# 		file_id = list_list[0].file_id
	# 		kwargs['pk'] = file_id
	# 		request.parser_context['pk'] = file_id
	# 		request.parser_context['kwargs'] = file_id
	# 		one_content = (Chat_MessageModel.objects.filter(pk=message_pk)[0]).content
	# 		list_content = Chat_MessageModel.objects.filter(content=one_content)
	# 		# file = Chat_MessageModel.objects.get(pk=message_pk).file;
	#
	# 		# if 'NoneType' in str(type(file)):
	# 		# 	file.delete()
	#
	# 		if len(list(list_content)) > 1:
	# 			list_list[0].delete()
	# 		elif len(list(list_content)) == 1:
	# 			list_list[0].file_id = '[NULL]'
	#
	# 			list_list.save()




		# return self.destroy(request, *args, **kwargs)

#

# def delete_file(request, *args, **kwargs):
# 	pass

# @login_required
# def GroupChatView(request, uuid):
# 	'''The view for a group where all messages and events are sent to the frontend'''
#
# 	group = get_object_or_404(GroupsModel, uuid=uuid)
# 	if request.user not in group.members.all():
# 		return HttpResponseForbidden('You are not a member of this group.\
#                                        Kindly use the join button')
#
# 	messages = group.message_set.all()
# 	'''
# 	messages are the message the members
# 	of a group send to the group
# 	'''
#
# 	events = group.event_set.all()
# 	'''
# 	events are the messages that indicates
# 	that a user joined or left the group.
# 	They will be sent automatically when a user join or leave the group
# 	'''
#
# 	# Combine the events and messages for a group
# 	message_and_event_list = [*messages, *events]
#
# 	# Sort the combination by the timestamp so that they are listed in order
# 	sorted_message_event_list = sorted(message_and_event_list, key=lambda x: x.timestamp)
#
# 	# get the list of all group members
# 	group_members = group.members.all()
#
# 	context = {
# 		'message_and_event_list': sorted_message_event_list,
# 		'group_members': group_members,
# 	}
#
# 	return render(request, template_name='chat/groupchat.html', context=context)

# FILES_ROOT = os.path.join(BASE_DIR, 'app_messager/media')

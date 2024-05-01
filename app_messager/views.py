from datetime import datetime

from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_protect
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
#
class PostAPIDetailView(generics.RetrieveUpdateDestroyAPIView): # generics.RetrieveUpdateAPIView
 # FilteredListSerializer
	queryset = Chat_MessageModel.objects.all()
	serializer_class = Chat_MessageSerializer # Chat_MessageSerializer
	filter_backends = []


class PostAPIFilterViews(generics.ListCreateAPIView):
	queryset = Chat_MessageModel.objects.all()
	serializer_class = Chat_MessageSerializer
	def post(self, request, *args, **kwargs):
		from app_messager.models import SubGroupsModel, GroupsModel
		json_data = dict(request.data)
		queryset_corrects = ''
		if 'corrects' in json_data:
			queryset_corrects =json_data['corrects']

		queryset_eventtime = ''
		if 'eventtime' in json_data:
			queryset_eventtime=json_data['eventtime']

		queryset_message = ''
		if 'eventtime' in json_data:
			queryset_message=json_data['message']
		elif 'content' in json_data:
			queryset_message = json_data['content'][0]

		queryset_userId = -1
		if 'userId' in json_data:
			queryset_userId=int(json_data['userId'])
		else:
			queryset_userId = int(json_data['author'][0])

		if 'groupId' in json_data:
			queryset_groupId=json_data['groupId']
		else:
			queryset_groupId = GroupsModel.objects.get(pk=int(json_data['group'][0])).uuid

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

		print('[CONSUMER > SAVED DB] BEFORE: datas record')
		# data_message = json.loads(event['text'])
		# date_str = str(queryset_eventtime)
		# corrects_bool = bool(queryset_corrects)

		# chat.autor_id = data_message['userId']

		chat: object = {}
		if ('fileIndex' in json_data or ('file' in json_data and len(json_data['file'][0]) != 0)): # data_message
			file = []
			if 'file' in json_data:
				file = json_data['file']
				if len(file[0]) == 0:
					file = []
			# chat.file_id = data_message['fileIndex']
			elif 'fileIndex' in json_data:
				file = json_data['fileIndex']

			for ind in range(0, len(list(file))):
				chat = Chat_MessageModel(content = f"{queryset_message}", group_id = id, author_id = queryset_userId[0], file_id=int(list(file)[ind]), subgroup_id = queryset_subgroup_id)
				chat.save()

		elif ('fileIndex' not in json_data): # data_message
			chat = Chat_MessageModel(content = f"{queryset_message}", group_id = id, author_id = queryset_userId,file_id=None, subgroup_id = queryset_subgroup_id)
			chat.save()
		# kwargs = Chat_MessageModel.objects.get(pk=chat.id).__dict__
		return JsonResponse({"create_post": True})# self.create(request, *args, **kwargs)
		# resp = request.query_set.get(*args, **kwargs)
		# print('resp: ', resp)

	# 	from app_messager.models import GroupsModel
	# 	json_data = json.loads(event['text'])
	#
	# 	id = 0
	# 	'''
	# 		Check a group number 'ID' in the 'groupId'
	# 	'''
	# 	group_all = GroupsModel.objects.all()
	# 	group_all_len = len(list(group_all))
	# 	for i in range(0, group_all_len):
	# 		if (str(list(group_all)[i].uuid) == json_data['groupId']):
	# 			id = list(group_all)[i].id
	#
	# 	# print('[CONSUMER > SAVED DB] BEFORE: datas record')
	# 	# data_message = json.loads(event['text'])
	# 	# date_str = str(data_message['eventtime'])
	# 	# corrects_bool = bool(data_message['corrects'])
	# 	#
	# 	# # chat.autor_id = data_message['userId']
	# 	#
	# 	# chat: object = {}
	# 	# SubGroupsModel().save()
	# 	# sub_group_id = SubGroupsModel.objects.last().id
	# 	# if ('fileIndex' in data_message):
	# 	# 	# chat.file_id = data_message['fileIndex']
	# 	# 	for ind in range(0, len(list(data_message['fileIndex']))):
	# 	# 		chat = Chat_MessageModel()
	# 	# 		chat.file_id = list(data_message['fileIndex'])[ind]
	# 	# 		chat.content = f"{data_message['message']}"  # json.dumps({f"{date_str}": f"{data_message['message']}"})
	# 	# 		chat.group_id = id
	# 	# 		chat.author_id = json_data['userId']
	# 	# 		chat.subgroup_id = sub_group_id
	# 	# 		chat.save()
	# 	#
	# 	# elif ('fileIndex' not in data_message):
	# 	# 	chat = Chat_MessageModel()
	# 	# 	chat.content = f"{data_message['message']}"  # json.dumps({f"{date_str}": f"{data_message['message']}"})
	# 	# 	chat.group_id = id
	# 	# 	chat.author_id = json_data['userId']
	# 	# 	chat.subgroup_id = sub_group_id
	# 	# 	chat.save()
	# 	#
	# 	# print('[CONSUMER > FILE] BEFORE: EVENT', 'test')
	# 	# # data_file = json.loads(event['file'])
	# 	# # upload_files.link = data_file
	# 	#
	# 	# print('[CONSUMER > is RECORD in DB] end')
	# 	# return {"_message": chat.id}


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
	filter_backends = []

	def delete(self, request, *args, **kwargs):
		query_file_id = int( request.query_params.get('file_id')) # one the file for delete
		query_post_id = int(request.query_params.get('post_id'))
		query_posrt_bool = bool(request.query_params.get('postRemove')); # if True that is a post remove, or not
		response_file_filter = FileModels.objects.filter(pk=  query_file_id)
		esponse_post_filter = Chat_MessageModel.objects.filter(pk=query_post_id)

		if ((len(list(response_file_filter)) == 0)):
			if ((len(list(esponse_post_filter)) > 0) and query_posrt_bool == True):
				esponse_post_filter[0].subgroup.delete()
				esponse_post_filter[0].delete()
				return JsonResponse({'remove': True})
			return JsonResponse({'remove': False})

		response_post_filter = Chat_MessageModel.objects.filter(file_id=query_file_id)# more line
		response_post_group = response_post_filter[0].group_id

		response_subgroup_id_filter = Chat_MessageModel.objects.filter(subgroup_id = response_post_filter[0].subgroup_id)
		if len(list(response_subgroup_id_filter)) > 1:
			rows_list = response_subgroup_id_filter.filter(group_id=response_post_group);
			if (len(list(rows_list)) > 1):
				response_post_filter[0].delete()
		response_file_filter[0].delete()

		return JsonResponse({'remove': False})
# def get_queryset(self, *args, **kwargs):
	# 	# instance = self.get_object()
	# 	# serializer = self.get_serializer(instance)
	# 	return Chat_MessageModel.objects.filter(pk = self.kwargs['pk'])



	#
	# 	filter_list = Chat_MessageModel.objects.filter(pk=message_pk);
	# 	if (len(filter_list) > 0):
	# 		file_id = filter_list[0].file_id
	# 		# kwargs['pk'] = file_id
	# 		# request.parser_context['pk'] = file_id
	# 		# request.parser_context['kwargs'] = file_id
	# 		content_one = (Chat_MessageModel.objects.filter(pk=message_pk)[0]).content
	# 		content_list = Chat_MessageModel.objects.filter(content=content_one)
	#
	# 		if len(list(content_list)) == 1:
	# 			filter_list[0].file_id = '[NULL]'
	# 	return self.destroy(request, *args, **kwargs)
	# def delete(self, request, *args, **kwargs):
	# 	# message_pk = kwargs['pk']
	# 	# filter_list = Chat_MessageModel.objects.filter(pk=message_pk);
	#
	# 	if (len(filter_list) > 0):
	# 		file_id = filter_list[0].file_id
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
	# 			filter_list[0].delete()
	# 		elif len(list(list_content)) == 1:
	# 			filter_list[0].file_id = '[NULL]'
	#
	# 			filter_list.save()




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

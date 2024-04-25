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
						link_list.append(str((list(f_row)[0]).link))

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
	# queryset = FileModels.objects.all()
	# serializer_class = File_MessagesSerializer
	queryset = Chat_MessageModel.objects.all()
	serializer_class = Chat_MessageSerializer
	filter_backends = []

	def delete(self, request, *args, **kwargs):
		req = request
		return self.destroy(request, *args, **kwargs)

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

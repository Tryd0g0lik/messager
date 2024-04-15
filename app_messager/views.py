from datetime import datetime

from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from sesame.utils import get_token
from django.http import HttpResponseForbidden, JsonResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404

from project.settings import BASE_DIR, MEDIA_ROOT
from .correctors import md5_chacker, check_unique_file
from .models import GroupsModel, FileModels
from .forms import UploadFileForm
import os
import websocket, json
import hashlib
# Create your views here.
def get_message(request):
	if request.method == 'GET':
		print('Received request a GET ')
	elif request.method == 'POST':
		print('Received request a POST ')

def chat_page(request, room_name):
	User = get_user_model()
	user = User.objects.all()
	user = User.objects.get(username ='root')
	BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
	file_names_js = os.listdir(os.path.join(BASE_DIR,'app_messager\\static\\js\\'))[-1]
	file_names_css = os.listdir(os.path.join(BASE_DIR, 'app_messager\\static\\css\\'))[-1]

	get_token(user)
	# ws = websocket.WebSocket()
	# ws.connect('ws://localhost:6379/ws/tableData/')
	return render(request, 'index.html', {
		'user_index': 3, # user.id,
		'static_files': {'js': file_names_js, 'css': file_names_css},
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

def upload_file(request):
	if request.method == 'POST':
		form_file = UploadFileForm(request.POST, request.FILES)
		if form_file.is_valid():
			file_model = FileModels(link=request.FILES['file'], size=request.FILES['file'].size )
			link_new_file = file_model.link
			file_model.save()
			id_new_file = file_model.id
			link_new_file = file_model.link

			''' ------ '''
			fs_old = FileModels.objects.all()
			fs_old_list = list(fs_old)
			unique_true_link = check_unique_file(id_new_file, str(link_new_file), fs_old_list)
			print('TYPE: ==', type(unique_true_link) == str)
			if type(unique_true_link) == str:
				FileModels.objects.get(id=id_new_file).delete()
				return JsonResponse({"old_link": unique_true_link})

			# link = file_model.link
			# result = md5_chacker(file_model)
			# print('[RESULT]: ', result)
			'''An Id returning of the new file'''
			return JsonResponse({"index": file_model.id})

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

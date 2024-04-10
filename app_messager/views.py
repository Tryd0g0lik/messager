from django.shortcuts import render
from django.contrib.auth import get_user_model
from sesame.utils import get_token
from django.http import HttpResponseForbidden
from django.shortcuts import render, get_object_or_404
from .models import GroupModel
from django.contrib.auth.decorators import login_required
import os
import websocket, json

# Create your views here.
def get_message(request):
	if request.method == "GET":
		print('Received request a GET ')
	elif request.method == "POST":
		print('Received request a POST ')

def chat_page(request, room_name):
	User = get_user_model()
	user = User.objects.all()
	user = User.objects.get(username ='root')
	BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
	file_names_js = os.listdir(os.path.join(BASE_DIR,"app_messager\\static\\js\\"))[-1]
	file_names_css = os.listdir(os.path.join(BASE_DIR, "app_messager\\static\\css\\"))[-1]

	get_token(user)
	# ws = websocket.WebSocket()
	# ws.connect('ws://localhost:6379/ws/tableData/')
	return render(request, 'index.html', {
		'user_index': user.id,
		'static_files': {'js': file_names_js, 'css': file_names_css},
		'room_name' : room_name }
	              )


# @login_required
def HomeView(request):
	'''The homepage where all groups are listed'''
	groups = GroupModel.objects.all()
	user = request.user
	context = {
		"groups": groups,
		"user": user
	}
	return render(request, template_name="chat/home.html", context=context)


# @login_required
def GroupChatView(request, uuid):
	'''The view for a group where all messages and events are sent to the frontend'''

	group = get_object_or_404(GroupModel, uuid=uuid)
	if request.user not in group.members.all():
		return HttpResponseForbidden("You are not a member of this group.\
                                       Kindly use the join button")

	messages = group.message_set.all()
	'''
	messages are the message the members
	of a group send to the group
	'''

	events = group.event_set.all()
	'''
	events are the messages that indicates
	that a user joined or left the group.
	They will be sent automatically when a user join or leave the group
	'''

	# Combine the events and messages for a group
	message_and_event_list = [*messages, *events]

	# Sort the combination by the timestamp so that they are listed in order
	sorted_message_event_list = sorted(message_and_event_list, key=lambda x: x.timestamp)

	# get the list of all group members
	group_members = group.members.all()

	context = {
		"message_and_event_list": sorted_message_event_list,
		"group_members": group_members,
	}

	return render(request, template_name="chat/groupchat.html", context=context)

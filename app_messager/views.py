from django.shortcuts import render
from django.contrib.auth import get_user_model
from sesame.utils import get_token
import os
import websocket, json

# Create your views here.
def home_page(request):
	User = get_user_model()
	user = User.objects.all()
	user = User.objects.get(username ='root')
	BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
	file_names_js = os.listdir(os.path.join(BASE_DIR,"app_messager\\static\\js\\"))[-1]
	file_names_css = os.listdir(os.path.join(BASE_DIR, "app_messager\\static\\css\\"))[-1]

	get_token(user)
	# ws = websocket.WebSocket()
	# ws.connect('ws://localhost:6379/ws/tableData/')
	return render(request, 'index.html', {'user_index': user.id, 'static_files': {'js': file_names_js, 'css': file_names_css} })

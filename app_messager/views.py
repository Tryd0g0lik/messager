from django.shortcuts import render
from django.contrib.auth import get_user_model
from sesame.utils import get_token
import websocket, json

# Create your views here.
def home_page(request):
	# User = get_user_model()
	# user = User.objects.get(username="root")
	# get_token(user)
	# ws = websocket.WebSocket()
	# ws.connect('ws://localhost:6379/ws/tableData/')
	return render(request, 'index.html', {})

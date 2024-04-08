from django.shortcuts import render
from django.contrib.auth import get_user_model
from sesame.utils import get_token
import websocket, json

# Create your views here.
def home_page(request):
	User = get_user_model()
	user = User.objects.all()
	user = User.objects.get(username ='root')
	# user_active = [u for u in user if u.is_active == True ]

	get_token(user)
	# ws = websocket.WebSocket()
	# ws.connect('ws://localhost:6379/ws/tableData/')
	return render(request, 'index.html', {'user_index': user.id})

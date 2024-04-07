from django.shortcuts import render
import websocket, json

# Create your views here.
def home_page(request):
	# ws = websocket.WebSocket()
	# ws.connect('ws://localhost:6379/ws/tableData/')
	return render(request, 'index.html', {})

from django.urls import re_path

from app_messager import consumers

websocket_urlpatterns = [
    re_path(r"ws/chat/$", consumers.ChatConsumer.as_asgi()), # /chat/(?P<room_name>\w+)/$
]

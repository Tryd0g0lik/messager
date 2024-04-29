from django.urls import re_path, path

from app_messager import consumers

websocket_urlpatterns = [
    re_path(r"ws/chat/$", consumers.ChatConsumer.as_asgi()),
    re_path(r"ws/chat/delete/$", consumers.ChatConsumer.as_asgi()),
    # path('ws/chat/upload/', consumers.UplodFileConsumer.as_asgi()),# /chat/(?P<room_name>\w+)/$
]

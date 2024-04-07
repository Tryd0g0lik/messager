import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
from django.urls import path

from app_messager import consumers

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")
# Initialize Django ASGI application early to ensure the AppRegistry
# is populated before importing code that may import ORM models.
django_asgi_app = get_asgi_application()

from app_messager.consumers import ChatConsumer  # AdminChatConsumer, PublicChatConsumer

ws_pattern = [
	path("ws", consumers.ChatConsumer),
]

# router
# https://channels.readthedocs.io/en/latest/topics/routing.html#protocoltyperouter
application = ProtocolTypeRouter({
	"http": django_asgi_app,
	"websocket": AllowedHostsOriginValidator(
		AuthMiddlewareStack(  #
			# There to connecting websocket
			URLRouter(ws_pattern)  # https://youtu.be/r6oTcAYDRt0?t=590 https://youtu.be/XcV09pJ4upU?t=672
		),  # ['127.0.1', "http://custom-tools.online/" ]
	),
}
)

# application = ProtocolTypeRouter({
#     # Django's ASGI application to handle traditional HTTP requests
#     "http": django_asgi_app,
#
#     # WebSocket chat handler
#     "websocket": AllowedHostsOriginValidator(
#         AuthMiddlewareStack(
#             URLRouter([
#                 path("ws", ChatConsumer),
#                 # path("chat/", PublicChatConsumer.as_asgi()),
#             ])
#         )
#     ),
# })


# import os
#
# from channels.routing import ProtocolTypeRouter
# from django.core.asgi import get_asgi_application
#
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
# # Initialize Django ASGI application early to ensure the AppRegistry
# # is populated before importing code that may import ORM models.
# django_asgi_app = get_asgi_application()
#
# application = ProtocolTypeRouter({
#     "http": django_asgi_app,
#     # Just HTTP for now. (We can add other protocols later.)
# })

import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")
# Initialize Django ASGI application early to ensure the AppRegistry
# is populated before importing code that may import ORM models.

from app_messager.routing import websocket_urlpatterns


# ws_pattern = [
# 	# path("ws", consumers.ChatConsumer.as_asgi()),
# 	re_path(r"/ws", consumers.ChatConsumer.as_asgi()), # /chat/(?P<room_name>\w+)/$
# ]

# router
# https://channels.readthedocs.io/en/latest/topics/routing.html#protocoltyperouter
application = ProtocolTypeRouter({
	# Django's ASGI application to handle traditional HTTP requests
	"http": get_asgi_application(),
	"websocket": AllowedHostsOriginValidator(
		AuthMiddlewareStack(  #
			# There to connecting websocket
			URLRouter(websocket_urlpatterns)  # https://youtu.be/r6oTcAYDRt0?t=590 https://youtu.be/XcV09pJ4upU?t=672
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

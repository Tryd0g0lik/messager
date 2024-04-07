from  channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
# from django.core.asgi import get_asgi_application
from channels.security.websocket import OriginValidator
from django.urls import path
from app_messager import consummer
import os
from django.core.asgi import get_asgi_application

ws_pattern = [
	path("ws",consummer.TableData),
]

# router
application =  ProtocolTypeRouter(
	{
		# "http": django_asgi_app,
		"websocket": AuthMiddlewareStack( #  AllowedHostsOriginValidator(
			# There to connecting websocket

				URLRouter( ws_pattern ) # https://youtu.be/r6oTcAYDRt0?t=590 https://youtu.be/XcV09pJ4upU?t=672
 			),  # ['127.0.1', "http://custom-tools.online/" ]
		#),
	}
)
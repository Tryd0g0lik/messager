from  channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
# from django.core.asgi import get_asgi_application
from channels.security.websocket import OriginValidator
from django.urls import path


application =  ProtocolTypeRouter(
	{
		# "http": django_asgi_app,
		"websocket": AllowedHostsOriginValidator(
			# There to connecting websocket
			AuthMiddlewareStack(URLRouter(  [ # https://youtu.be/XcV09pJ4upU?t=672
				# path("", AdminChatConsumer.as_asgi()), # path: r"^longo/$"
				],))  #
['127.0.1', "http://custom-tools.online/" ]
		),
	}
)
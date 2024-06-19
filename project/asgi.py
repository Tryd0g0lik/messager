import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")
# Initialize Django ASGI application early to ensure the AppRegistry
# is populated before importing code that may import ORM models.

from app_messager.routing import websocket_urlpatterns


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


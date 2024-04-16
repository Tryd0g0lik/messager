"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin

from django.urls import path, re_path, include

from django.conf.urls.static import static

import app_messager
from app_messager import views
from project import settings
from django.views.defaults import page_not_found, server_error, permission_denied, bad_request
urlpatterns = [
    path('admin/', admin.site.urls),
    path('ws/<str:room_name>/', views.chat_page, name="room"),
    path('ws/chat/upload/', views.upload_file, name="upload_file")


    # path('chat/', views.get_message),
    # url()
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


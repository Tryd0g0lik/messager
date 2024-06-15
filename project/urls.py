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
from rest_framework.routers import DefaultRouter

import app_messager
from app_messager import views
from project import settings
from django.views.defaults import page_not_found, server_error, permission_denied, bad_request

from project.rest_routers import router

# r = DefaultRouter()
# r.register()
urlpatterns = [
    path('admin/', admin.site.urls),
    path('ws/<str:room_name>/', views.chat_page, name="room"),
    path('ws/chat/upload/', views.upload_file, name="upload_file"),
    path('api/v1/', include(router.urls)), # , "myapi"
    # path(r'api/v1/chat/make/post/', views.PostAPIFilterViews.as_view()),
    # path(r'api/v1/search/get/', views.PostAPIFilterViews.as_view({'get':'list'})),
    # path(r'api/v1/chat/upload/files/', views.upload_file, name="upload_file"),
    # path(r'api/v1/chat/update/<int:pk>/', views.UpdateMessages.as_view()),# update the one post # , name="requests_messages" # (([0-9]{2,4}|[-]){1,5}_[0-9:\.]{2,13})[0-9]{1,2}$'
    # path(r'api/v1/chat/delete/files/', views.PostAPIDeleteFilelView.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


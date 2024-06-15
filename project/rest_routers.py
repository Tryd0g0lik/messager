from rest_framework.routers import DefaultRouter

from app_messager import views

router = DefaultRouter()
# router.register(r'chat/make/post/', views.PostAPIFilterViews.as_view(), basename='postchat')
router.register(r'search', views.PostAPIFilterViews, basename='getchat')
# router.register(r'chat/upload/files/', views.upload_file, basename="upload_file")
# router.register(r'chat/update/<int:pk>/', views.UpdateMessages.as_view(), basename='updatemessageid')# update the one post # , name="requests_messages" # (([0-9]{2,4}|[-]){1,5}_[0-9:\.]{2,13})[0-9]{1,2}$'
# router.register(r'chat/delete/files/', views.PostAPIDeleteFilelView.as_view(), basename='chatfiles')


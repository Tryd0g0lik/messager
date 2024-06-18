from rest_framework.routers import DefaultRouter

from app_messager import views

router = DefaultRouter()
# router.register(r'chat/make/post/', views.PostAPIFilterViews.as_view(), basename='postchat')
router.register(r'get', views.PostAPIFilterViews, basename='message_get')
router.register(r'update', views.MessageUpdateViews, basename='message_update')

# router.register(r'chat/upload/files/', views.upload_file, basename="upload_file")
# router.register(r'chat/update/<int:pk>/', views.UpdateMessages.as_view(), basename='updatemessageid')# update the one post # , name="requests_messages" # (([0-9]{2,4}|[-]){1,5}_[0-9:\.]{2,13})[0-9]{1,2}$'
# router.register(r'chat/delete/files/', views.PostAPIDeleteFilelView.as_view(), basename='chatfiles')

# <QueryDict: {'author': ['3'], 'content': ['ds-88\r\n'], 'group': ['1'], 'file': ['']}>


# initial_data: {'corrects': False, 'eventtime': '2024-6-15@4:53:24 PM', 'message': 'ddds-66 -33', 'userId': '3', 'groupId': '7a3a744a-64ab-492b-89bf-9ee7c72b91f1'}
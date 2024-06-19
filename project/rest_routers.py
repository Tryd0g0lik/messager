from rest_framework.routers import DefaultRouter

from app_messager import views

router = DefaultRouter()
router.register(r'get', views.PostAPIFilterViews, basename='message_get')
router.register(r'update', views.MessageUpdateViews, basename='message_update')

# <QueryDict: {'author': ['3'], 'content': ['ds-88\r\n'], 'group': ['1'], 'file': ['']}>


# initial_data: {'corrects': False, 'eventtime': '2024-6-15@4:53:24 PM', 'message': 'ddds-66 -33', 'userId': '3', 'groupId': '7a3a744a-64ab-492b-89bf-9ee7c72b91f1'}


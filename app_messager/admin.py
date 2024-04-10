from django.contrib import admin

# Register your models here.
from .models import *
# Register your models here.

admin.site.register(Messeger_User)
admin.site.register(Chat_MessageModel)
admin.site.register(EventsModels)
admin.site.register(GroupsModel)
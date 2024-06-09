import pytest
import os
import django
from django.conf import settings
from rest_framework.test import APIClient

from app_messager.models import Chat_MessageModel, SubGroupsModel, GroupsModel, Messeger_User, User
# from test.test_messeger_api.test_db import TestApi
# def test_api_get():
# 	testapi = TestApi()
#
# 	testapi.test_api() # api_url="api/v1/search/get/"
def test_checking():
	assert 2 == 2
import pytest
from django.contrib.auth.models import User

from app_messager.models import Messeger_User, SubGroupsModel, Chat_MessageModel, GroupsModel
import asyncio
from asgiref.sync import sync_to_async
from pytest import mark
loop: asyncio.AbstractEventLoop
'''
,
	("Kolya", "NA","d", "7a3a744a-64ab-492b-89bf-9ee7c72b91f1",
	 "6b8b22c4-ace6-4306-a113-7cdd04e6f723", "That is a test's content" )
'''


# class TestApi:
	# loop: asyncio.AbstractEventLoop


	# @pytest.mark.django_db
	# @pytest.fixture(scope='session')
# @pytest.mark.asyncio(scope="module")
# @pytest.mark.usefixtures("django_db_setup")

# @sync_to_async()
# @asyncio_fixture
# def db_():
# 	User.objects.create_user("admin")
# 	user = User.objects.filter(id=1)
# 	Messeger_User.objects.create(
# 		user_id=user[0].id,
# 		status="A",
# 		sub_status="s"
# 	)
# 	author = Messeger_User.objects.filter(id=1)
#
# 	print(f'[STEP 2]:  "AUTOR: {author}')
# 	GroupsModel.objects.create(hide=False,
# 	                           uuid="3e154e33-5989-4c27-9e28-c179f57c20e7",
# 	                           name='First test name group',
# 	                           title_order='First Title order:')
# 	groups = GroupsModel.objects.filter(id=1)
#
# 	SubGroupsModel.objects.create(uuid="4144eda1-9f35-4ce1-ad62-2bf68cb48cda")
# 	subgroup = SubGroupsModel.objects.filter(id=1)
#
# 	Chat_MessageModel.objects.create(group_id=groups[0].id, content="That is a test's content", author_id=author[0].id,
# 	                                 subgroup_id=subgroup[0].id)
# @mark.asyncio
# @mark.asyncio

# @mark.sync_to_async
@mark.django_db
def test_api(client):
	try:
		# Act
		# db_()
		response = client.get("api/v1/search/get/")
		# Assert
		assert response.status_code == 200
		data = response.json()
		print(f'DATA: {data}')
		assert 3 == 0
		assert len(data) == 0
	except Exception as e:
		print(f'Err: {e}')
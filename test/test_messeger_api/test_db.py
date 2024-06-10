import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from app_messager.models import Messeger_User, SubGroupsModel, Chat_MessageModel, GroupsModel
import asyncio
from django.contrib.auth import get_user_model
from test.confrest import django_db_setup
loop: asyncio.AbstractEventLoop
'''
,
	("Kolya", "NA","d", "7a3a744a-64ab-492b-89bf-9ee7c72b91f1",
	 "6b8b22c4-ace6-4306-a113-7cdd04e6f723", "That is a test's content" )
'''
@pytest.mark.usefixtures("django_db_setup")
@pytest.mark.asyncio(scope="module")
class TestApi:
	@pytest.fixture
	def client(self):
		return APIClient()

	# @pytest.mark.django_db
	# @pytest.fixture(scope='session')

	async def test_api(self, client):
		# Arrange
		# with django_db_setup.unblock():
		await  User.objects.create_user("admin")
		print(f'[STEP 1]:  "user: was got{True}')
		await  Messeger_User.objects.create(
			user_id=1,
			status="A",
			sub_status="s"
		)
		author = await Messeger_User.objects.filter(id=1)

		print(f'[STEP 2]:  "autor: was got{True}')
		await GroupsModel.objects.create(hide=False,
		                                   uuid="3e154e33-5989-4c27-9e28-c179f57c20e7",
		                                   name='First test name group',
		                                   title_order='First Title order:')
		groups = await  GroupsModel.objects.filter(id=1)

		await  SubGroupsModel.objects.create(uuid="4144eda1-9f35-4ce1-ad62-2bf68cb48cda")
		subgroup = await SubGroupsModel.objects.filter(id=1)

		await Chat_MessageModel.objects.create(group=groups[0], content="That is a test's content", author=author[0],
		                                 subgroup=subgroup[0])
		print(f'TRUE: {True}')
		try:
			# Act
			response = await client.get("api/v1/search/get/")
			print(f'[STEP 3]:  "autor: was got{True}')
			# Assert
			assert response.status_code == 200
			data = response.json()
			print(f'DATA: {data}')
			assert 3 == 0
			assert len(data) == 0
		except Exception as e:
			print(f'Err: {e}')
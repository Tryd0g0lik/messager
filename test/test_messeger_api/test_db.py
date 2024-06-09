import pytest
from rest_framework.test import APIClient
from app_messager.models import User, Messeger_User, GroupsModel, SubGroupsModel, Chat_MessageModel

@pytest.mark.django_db
class TestApi:
	@pytest.fixture
	def client(self):
		return APIClient()

	@pytest.mark.fixture
	@pytest.mark.parametrize(
	["name", "status", "sub_status", "group_index", "subgroup_index", "content"],
	[
	["admin", "A","s", "3e154e33-5989-4c27-9e28-c179f57c20e7",
	 "4144eda1-9f35-4ce1-ad62-2bf68cb48cda", "That is a test's content" ],
	{"Kolya", "NA","d", "7a3a744a-64ab-492b-89bf-9ee7c72b91f1",
	 "6b8b22c4-ace6-4306-a113-7cdd04e6f723", "That is a test's content" }
	])
	def create_db(self, name, status, sub_status, group_index, subgroup_index, content):
		User.objects.create_user(name)
		user = User.objects.filter(name=name)
		print(f'[STEP 1]: {True}')
		author = Messeger_User.objects.create(
			status=status,
			sub_status=sub_status,
			user=user[0])
		group = GroupsModel.objects.create(hide=False,
		                           uuid=group_index,
		                           name='First test name group',
		                           title_order='First Title order:')
		subgroup = SubGroupsModel.objects.create(uuid=subgroup_index)
		Chat_MessageModel.objects.create(content=content, author=author[0], group=group[0], subgroup=subgroup[0])
		print(f'TRUE: {True}')
		# Add assertions here
		assert user.exists()
		assert author.exists()
		assert group.exists()
		assert subgroup.exists()
		assert Chat_MessageModel.objects.filter(content=content).exists()




	def test_api(self, client, create_db):
		# Arrange
		try:
			# Act
			response = client.get("api/v1/search/get/")

			# Assert
			assert response.status_code == 200
			data = response.json()
			print(f'DATA: {data}')
			assert len(data) == 0
		except Exception as e:
			print(f'Err: {e}')
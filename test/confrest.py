import pytest

from project import settings

from rest_framework.test import APIClient
# @pytest.fixture(scope='class')
# def django_db_setup(django_db_setup, django_db_blocker):
# 	with django_db_blocker.unblock():
# 		settings.DATABASES['default'] = {
# 			'ENGINE': 'django.db.backends.postgresql',
# 			'NAME': 'messager',
# 			'USER': 'postgres',
# 			'PASSWORD': '123',
# 			'HOST': '127.0.0.1',
# 		}


@pytest.fixture
def client():
		yield APIClient()
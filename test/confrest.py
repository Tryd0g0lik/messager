import pytest

from project import settings


@pytest.fixture(scope='class')

def django_db_setup(django_db_setup, django_db_blocker):
	with django_db_blocker.unblock():
		settings.DATABASES['default'] = {
			'ENGINE': 'django.db.backends.postgresql',
			'NAME': 'messager',
			'USER': 'postgres',
			'PASSWORD': '123',
			'HOST': '127.0.0.1',
		}
		yield

from django import forms
from django.core import validators
from .models import FileModels

class UploadFileForm(forms.Form):
	file = forms.FileField(validators=[
		validators.FileExtensionValidator(
			allowed_extensions=('git', 'png', 'jpg', 'jpeg', 'doc', 'pdf', 'xls', 'xls', 'xlsx',
			                    'doc', 'docx', 'ods', 'odt'))],
	error_messages={
		'invalid_extension':"This is unknown format"
	}) # path="app_messager/media/"

	class Meta:
		model = FileModels
		file = '__all__'
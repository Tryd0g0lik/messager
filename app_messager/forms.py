
from django import forms
from django.core import validators

from .correctors import extension
from .models import FileModels

# class FileFieldForm(forms.Form):
# 	file = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple': True}),
# 		validators=[
# 		validators.FileExtensionValidator(
# 			allowed_extensions=extension)],
# 	error_messages={
# 		'invalid_extension':"This is unknown format"
# 	}) # path="app_messager/media/"
#
# 	class Meta:
# 		model = FileModels
# 		file = '__all__'
#

class UploadFileForm(forms.Form):
	file = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple': True}),
	validators=[
		validators.FileExtensionValidator(
			allowed_extensions=extension)],
	error_messages={
		'invalid_extension':"This is unknown format"
	}) # path="app_messager/media/"

	class Meta:
		model = FileModels
		file = '__all__'
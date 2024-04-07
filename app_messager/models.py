from django.db import models
# from django.contrib.auth.models import AbstractUser, User, Group
class TypeRequastion(models.TextChoices):
	'''
	TODO: Первый пользователь - автор заявки. Второй пользователь - тот, кто нажал кнопку перехода в диалог (мессенджер).
	'''

	PARENTS = "A", "Author"
	CHILDE = "NA", "NoAuthor"

class TypeSubRequastion(models.TextChoices):
	'''
	TODO: Статус пользователя
	'''

	PARENTS = "S", "Seller"
	CHILDE = "B", "Buyer"



class Messages(models.Model):
	id_users = models.IntegerField()
	# pass
# Create your models here.
# class AdvUser(AbstractUser):
# 	user = models.ForeignKey(
# 		User,
# 		on_delete=models.CASCADE,
# 		related_name="myUser",
# 	)
# 	groups = models.ForeignKey(
# 		Group,
# 		on_delete=models.CASCADE,
# 		related_name="myGroup",
# 	)
# 	user_permissions =models.ForeignKey(
# 		Group,
# 		on_delete=models.CASCADE,
# 		related_name="myGroup",
# 	)
# 	class Meta(AbstractUser.Meta):
# 		pass

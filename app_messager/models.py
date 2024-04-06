from django.db import models
# from django.contrib.auth.models import AbstractUser, User, Group
class TypeMenuChoise(models.TextChoices):
	'''
	TODO: The type title of menu
	'''

	PARENTS = "PARENTS", "Родительский"
	CHILDE = "CHILDE", "Дочернеий"
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

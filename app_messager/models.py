from django.db import models
from django.contrib.auth.models import AbstractUser, User, Group


# # Create your models here.
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

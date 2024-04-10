from django.db import models
from django.contrib.auth import get_user_model
from uuid import uuid4
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
# from django.contrib.auth.models import AbstractUser, User, Group
class Messeger_TypeRequastionModel(models.TextChoices):
	'''
	TODO: This's the first user. It's the order's (group's)  autor
	'''
	PARENTS = "A", _("Author")
	CHILDE = "NA", _("NoAuthor")


class Messeger_SubTypeRequastionModel(models.TextChoices):
  '''
  TODO: This's the user's level
  '''
  PARENTS = "S", _("Seller")
  CHILDE = "B", _("Buyer")

User = get_user_model()
class Messeger_GroupModel(models.Model):
  '''The group model where multiple users can share and discuss ideas'''
  uuid = models.UUIDField(default=uuid4, editable=False)
  name = models.CharField(max_length=30)
  members = models.ManyToManyField(User)
  status = models.CharField(choices=Messeger_TypeRequastionModel, default=Messeger_TypeRequastionModel.PARENTS, max_length=10)
  sub_status = models.CharField(choices=Messeger_SubTypeRequastionModel, default=Messeger_SubTypeRequastionModel.PARENTS, max_length=10)
  title_order = models.CharField()
  hide = models.BooleanField()
  
  def __str__(self) -> str:
      return f"Group {self.name}-{self.uuid}"

  def get_absolute_url(self):
      return reverse("group", args=[str(self.uuid)])

  def add_user_to_group(self, user:User):
      '''A helper function to add a user to a group and create an event object'''
      self.members.add(user)
      self.event_set.create(type="Join", user=user)
      self.save()

  def remove_user_from_group(self, user:User):
      '''An helper function to remove users from group members when they \
      leave the group and create an event for the timestamp the user left the group'''
      self.members.remove(user)
      self.event_set.create(type="Left", user=user)
      self.save()


class Messeger_MessageModel(models.Model):
	author = models.ForeignKey(User, on_delete=models.CASCADE)
	timestamp = models.DateTimeField(auto_now_add=True)
	content = models.TextField()
	group = models.ForeignKey(Group, on_delete=models.CASCADE)

	def __str__(self) -> str:
		date = self.timestamp.date()
		time = self.timestamp.time()
		return f"{self.author}:- {self.content} @{date} {time.hour}:{time.minute}"


class Messeger_FilesModels(models.Model):
	link = models.CharField(verbose_name="File path name")
	size = models.FloatField()

class Messeger_EventModels(models.Model):
  '''
  A model that holds all events related to a group like when a user joins the group or leaves.
  '''
  group = models.ForeignKey(Group ,on_delete=models.CASCADE)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  CHOICES = [
      ("Join", "join"),
      ("Left", "left")
      ]
  type = models.CharField(choices=CHOICES, max_length=10)
  description= models.CharField(help_text="A description of the event that occurred",
  max_length=50, editable=False)
  timestamp = models.DateTimeField(auto_now_add=True)

  def save(self, *args, **kwargs):
      self.description = f"{self.user} {self.type} the {self.group.name} group"
      super().save(*args, kwargs)

  def __str__(self) -> str:
      return f"{self.description}"


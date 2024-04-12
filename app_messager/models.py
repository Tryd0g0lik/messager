from django.db import models
from django.contrib.auth import get_user_model
from uuid import uuid4
from django.urls import reverse
# from django.contrib.auth.models import AbstractUser, User, Group
# class Messeger_TypeRequastionModel(models.TextChoices):
# 	'''
# 	TODO: This's the first user. It's the order's (group's)  autor
# 	'''
# 	PARENTS = "A", _("Author")
# 	CHILDE = "NA", _("NoAuthor")
#
#
# class Messeger_SubTypeRequastionModel(models.TextChoices):
#   '''
#   TODO: This's the user's level
#   '''
#   PARENTS = "S", _("Seller")
#   CHILDE = "B", _("Buyer")


User = get_user_model()

class Messeger_User(models.Model):
	user = models.OneToOneField(User, on_delete= models.CASCADE, unique=True, )
	'''
	TODO: This's the first user. It's the order's (group's)  autor
	'''
	Status = (
		("A", "Author"),
		("NA", "NoAuthor")
	)
	status = models.CharField(choices=Status, max_length=10, )
	'''
	TODO: This's the user's level
	'''
	Sub_Status = (
		('s', "Seller"),
		('b', "Buyer")
	)
	sub_status = models.CharField(choices=Sub_Status, max_length=10, )

class GroupsModel(models.Model):
	'''The group model where multiple users can share and discuss ideas'''
	uuid = models.UUIDField(default=uuid4,  )
	name = models.CharField(max_length=30)
	members = models.ManyToManyField(Messeger_User, related_name='members_users')
	title_order = models.CharField(max_length=50)
	hide = models.BooleanField()

	def __str__(self) -> str:
		return f"Group {self.name}-{self.uuid}"

	def get_absolute_url(self):
		return reverse("group", args=[str(self.uuid)])

	def add_user_to_group(self, user:Messeger_User):
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


class Chat_MessageModel(models.Model):
	author = models.ForeignKey(Messeger_User, on_delete=models.CASCADE, related_name="autormessage")
	timestamp = models.DateTimeField(auto_now_add=True)
	content = models.TextField()
	group = models.ForeignKey(GroupsModel, on_delete=models.CASCADE, related_name="groupmessage")
	file = models.ForeignKey('FileModels', related_name="file_of_chat", on_delete=models.CASCADE, blank=True, null=True)

	def __str__(self) -> str:
		date = self.timestamp.date()
		time = self.timestamp.time()
		return f"{self.author}:- {self.content} @{date} {time.hour}:{time.minute}"

class FileModels(models.Model):
	link = models.FileField(upload_to='files/%Y/%m/%d/' , verbose_name="File path name", max_length=50)
	size = models.FloatField()

class EventsModels(models.Model):
  '''
  A model that holds all events related to a group like when a user joins the group or leaves.
  '''
  group = models.ForeignKey(GroupsModel, on_delete=models.CASCADE)
  user = models.ForeignKey(Messeger_User, on_delete=models.CASCADE)
  CHOICES = [
      ("Join", "join"),
      ("Left", "left")
      ]
  type = models.CharField(choices=CHOICES, max_length=10)
  description= models.CharField(help_text="A description of the event that occurred",  max_length=50, editable=False)
  timestamp = models.DateTimeField(auto_now_add=True)

  def save(self, *args, **kwargs):
      self.description = f"{self.user} {self.type} the {self.group.name} group"
      super().save(*args, kwargs)

  def __str__(self) -> str:
      return f"{self.description}"


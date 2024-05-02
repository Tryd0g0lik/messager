from django.db import models
from django.contrib.auth import get_user_model
from uuid import uuid4
from django.urls import reverse
import os

from app_messager.correctors import get_timestamp_path

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
	'''
	TODO: the user's messages

	@:param 'user:int' id user \n
	@:param 'status:str' for a choice '("A", "Author")' or '("NA", "NoAuthor")' \n
	@:param 'sub_status:str' for a choices a user's character, it's '('s', "Seller")' or '('b', "Buyer")'
		'''
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
	'''
	TODO: The group model where multiple users can share and discuss ideas

	@:param 'uuid:UUID' is an unique id/name group for a developer (for work internally \n
	@:param 'name:str' is a title this's group \n
	@:param 'members' is a user id. Two user is all of then in one group \n
	@:param 'title_order:str' is an order application \n
	@:param 'hide:bool' if group is display public then is True or not display
	'''
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


class SubGroupsModel(models.Model):
	'''
	TODO: This table is stores unique sub-index.
	For exemple, an one row that is index of the row's group. \
	Rows group is one or more than one rows where similar message/content but not similar files.  \
	When user sending an one message with one or more files

	'''

	uuid = models.UUIDField(default=uuid4, unique=True)

class Chat_MessageModel(models.Model):
	'''
	TODO: midll group

	@:param 'author:int' is user id \n
	@:param 'timestamp' is a data of formation \n
	@:param 'content:str' is a message text \n
	@:param 'group:int' is an id group \n
	@:param 'file:int|NoN' an id file or NoN
	'''
	author = models.ForeignKey(Messeger_User, on_delete=models.CASCADE, related_name="autormessage")
	timestamp = models.DateTimeField(auto_now_add=True)
	content = models.TextField()
	group = models.ForeignKey(GroupsModel, on_delete=models.CASCADE, related_name="groupmessage")
	file = models.ForeignKey('FileModels', related_name="filechat", on_delete=models.SET_NULL, blank=True, null=True)
	subgroup = models.ForeignKey(SubGroupsModel, on_delete=models.CASCADE, related_name='subgroup')
	def __str__(self) -> str:
		date = self.timestamp.date()
		time = self.timestamp.time()
		return f"{self.author}:- {self.content} @{date} {time.hour}:{time.minute}"


class FileModels(models.Model):
	'''
	@:param 'link:str' is a reference on file of the db \n
	@:param 'size:float' is a file's size
	'''
	link = models.FileField(upload_to='%Y/%m/%d/',
	                        verbose_name="File path name", max_length=50)
	size = models.FloatField(null=True, blank=True)

	def __str__(self):
		return 'Id: %s, Link: %s || size: %s' % (self.id, self.link, self.size)

	def delete(self, *args, **kwargs):
		self.link.delete()
		super().delete(*args, **kwargs)
class EventsModels(models.Model):
  '''
  TODO: A model that holds all events related to a group like when a user joins the group or leaves.

  @:param 'group:int' is an id of the 'GroupsModel' table \n
  @:param 'user:int' is an id of the 'Messeger_User' table \n
  @:param 'type:int' is a type '("Left", "left")' or '("Join", "join")'. It's , \n
  @:param 'description:str' is a text event's describing \n
  @:param 'timestamp:datetime' is a time of event
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


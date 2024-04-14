# Generated by Django 3.1.2 on 2024-04-10 10:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app_messager', '0004_auto_20240410_1712'),
    ]

    operations = [
        migrations.CreateModel(
            name='FileModels',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('link', models.FileField(max_length=50, upload_to='files/%Y/%m/%d/', verbose_name='File path name')),
                ('size', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Messeger_User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('A', 'Author'), ('NA', 'NoAuthor')], max_length=10, unique=True)),
                ('sub_status', models.CharField(choices=[('s', 'Seller'), ('b', 'Buyer')], max_length=10, unique=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='GroupsModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False)),
                ('name', models.CharField(max_length=30)),
                ('title_order', models.CharField(max_length=50)),
                ('hide', models.BooleanField()),
                ('members', models.ManyToManyField(to='app_messager.Messeger_User')),
            ],
        ),
        migrations.CreateModel(
            name='EventsModels',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('Join', 'join'), ('Left', 'left')], max_length=10)),
                ('description', models.CharField(editable=False, help_text='A description of the event that occurred', max_length=50)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_messager.groupsmodel')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_messager.messeger_user')),
            ],
        ),
        migrations.CreateModel(
            name='Chat_MessageModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('content', models.TextField()),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_messager.messeger_user')),
                ('file', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='file_of_chat', to='app_messager.filemodels')),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_messager.groupsmodel')),
            ],
        ),
    ]
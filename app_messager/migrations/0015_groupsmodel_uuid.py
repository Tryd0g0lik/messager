# Generated by Django 3.1.2 on 2024-04-11 04:10

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('app_messager', '0014_auto_20240411_1108'),
    ]

    operations = [
        migrations.AddField(
            model_name='groupsmodel',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4, editable=False),
        ),
    ]
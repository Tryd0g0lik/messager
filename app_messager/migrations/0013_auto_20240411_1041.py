# Generated by Django 3.1.2 on 2024-04-11 03:41

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('app_messager', '0012_auto_20240411_1021'),
    ]

    operations = [
        migrations.AlterField(
            model_name='groupsmodel',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False),
        ),
    ]
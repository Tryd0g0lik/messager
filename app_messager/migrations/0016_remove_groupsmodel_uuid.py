# Generated by Django 3.1.2 on 2024-04-11 04:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_messager', '0015_groupsmodel_uuid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='groupsmodel',
            name='uuid',
        ),
    ]

# Generated by Django 3.1.2 on 2024-04-30 05:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_messager', '0036_auto_20240430_1213'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chat_messagemodel',
            name='subgroup',
        ),
    ]

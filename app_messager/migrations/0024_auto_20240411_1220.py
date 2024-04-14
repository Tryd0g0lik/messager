# Generated by Django 3.1.2 on 2024-04-11 05:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_messager', '0023_auto_20240411_1207'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chat_messagemodel',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='message', to='app_messager.messeger_user'),
        ),
        migrations.AlterField(
            model_name='chat_messagemodel',
            name='group',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='message', to='app_messager.groupsmodel'),
        ),
    ]
# Generated by Django 3.1.2 on 2024-04-08 00:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_messager', '0002_alter_messages_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='messages',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
# Generated by Django 3.1.2 on 2024-04-11 04:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_messager', '0013_auto_20240411_1041'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='groupsmodel',
            name='uuid',
        ),
        migrations.AddField(
            model_name='groupsmodel',
            name='id',
            field=models.AutoField(auto_created=True, default=0, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
    ]

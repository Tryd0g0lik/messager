# Generated by Django 3.1.2 on 2024-04-15 00:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_messager', '0031_auto_20240415_0637'),
    ]

    operations = [
        migrations.AlterField(
            model_name='filemodels',
            name='link',
            field=models.FileField(max_length=50, upload_to='%Y/%m/%d/', verbose_name='File path name'),
        ),
    ]
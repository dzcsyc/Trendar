# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-01-13 05:06
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0007_auto_20170111_1318'),
    ]

    operations = [
        migrations.CreateModel(
            name='in_textrank',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10)),
                ('rank', models.FloatField(default=0)),
            ],
        ),
        migrations.RenameModel(
            old_name='in_elements',
            new_name='in_extract_tags',
        ),
    ]

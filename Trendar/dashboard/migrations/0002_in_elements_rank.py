# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-01-04 06:03
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='in_elements',
            name='rank',
            field=models.IntegerField(default=0),
        ),
    ]

# -*- coding:utf-8 -*-
from rest_framework import serializers
from .models import in_elements,negative,sentiment


class ElementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = in_elements
        fields = ('name', 'rank')

class NegativeSerializer(serializers.ModelSerializer):
    class Meta:
        model = negative
        fields = ('typeof', 'score', 'content')

class NegativeRecourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = negative
        fields = ('content',)

class SentimentSerializer(serializers.ModelSerializer):
    class Meta:
        model = sentiment
        fields = ('number',)
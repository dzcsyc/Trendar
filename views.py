#coding:utf-8
from __future__ import unicode_literals
from django.http import HttpResponse
from django.shortcuts import render
from .models import in_elements,latest,negative
from .models import sentiment as senti
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .serializers import ElementsSerializer,NegativeSerializer,SentimentSerializer,NegativeRecourceSerializer
from rest_framework.renderers import JSONRenderer





class JSONResponse(HttpResponse):
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)



def index(request):
    date=latest.objects.all()[:1]
    return render(request, 'home.html', {'date':date})

def whatsin(request):
    elements = in_elements.objects.all()
    print(elements)
    return render(request, 'in.html', {'data':elements})

def neg(request):
    neg = negative.objects.all()
    return render(request, 'negative.html', {'neg' : neg})

def sentiment(request):
    sen = senti.objects.all()
    return render(request, 'sentiment.html', {'sentiment': sen})

@api_view(['GET'])
def Elements_list(request):
    elements = in_elements.objects.all()
    serializer = ElementsSerializer(elements, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def negative_resource(request, typeof):
    try:
        resource = negative.objects.filter(typeof = typeof)
    except negative.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = NegativeRecourceSerializer(resource, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def Sentiment_list(request):
    sentiment = senti.objects.all()
    serializer = SentimentSerializer(sentiment, many=True)
    return JSONResponse(serializer.data)

@api_view(['GET'])
def Negative_list(request):
    neg = negative.objects.all()
    serializer = NegativeSerializer(neg, many=True)
    return Response(serializer.data)
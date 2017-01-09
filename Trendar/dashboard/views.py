#coding:utf-8
from django.http import HttpResponse
from django.shortcuts import render
from .models import in_elements,latest,negative,neg_total
from .models import sentiment as senti
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from .serializers import ElementsSerializer,NegativeSerializer,SentimentSerializer,NegativeRecourceSerializer,NegTotalSerializer



class JSONResponse(HttpResponse):
    """
    将内容转为JSON格式的HttpResponse
    """
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
    return JSONResponse(serializer.data)

@api_view(['GET'])
def negative_resource(request, typeof):
    try:
        resource = negative.objects.filter(typeof = typeof)
    except negative.DoesNotExist:
        return JSONResponse(status=status.HTTP_404_NOT_FOUND)
    serializer = NegativeRecourceSerializer(resource, many=True)
    return JSONResponse(serializer.data)

@api_view(['GET'])
def Sentiment_list(request):
    sentiment = senti.objects.all()
    serializer = SentimentSerializer(sentiment, many=True)
    return JSONResponse(serializer.data)

@api_view(['GET'])
def Negative_list(request):
    neg = negative.objects.all()
    serializer = NegativeSerializer(neg, many=True)
    return JSONResponse(serializer.data)

@api_view(['GET'])
def Neg_total(request):
    total = neg_total.objects.all()
    serializer = NegTotalSerializer(total, many=True)
    return JSONResponse(serializer.data)
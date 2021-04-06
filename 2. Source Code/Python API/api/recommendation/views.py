from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .service import Service


# Create your views here.

@api_view(['GET'])
def get_similar_info(request, id):
    response = Service.get_similar_info(int(id))
    return Response(response)


@api_view(['GET'])
def get_all_info(request):
    response = Service.get_all_info()
    return Response(response)

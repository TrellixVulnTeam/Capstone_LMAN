from django.conf.urls import url
from django.urls import path, include
from . import views

urlpatterns = [
    # path('getall/', views.get_similar_info, name='get_similar_info'),
    path('getsimilar/<id>/', views.get_similar_info, name='get_similar_info'),
    path('getall/', views.get_all_info, name='get_all_info')
]

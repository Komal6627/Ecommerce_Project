from django.core import paginator
from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from api.models import *
from api.serializers import ProductSerializer

# GET all the products with query
@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query is None:
        query = ''
    
    products = Product.objects.filter(name__iscontains = query).order_by('_id')
    page = request.query_params.get('page')
    if page is None or page.strip() == '':
        page = 1
    else:
        try:
            page = int(page)
        except ValueError:
            page = 1
    paginator = Paginator(products, 8)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(paginator.num_pages)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    
    serializer = ProductSerializer(products, many = True)
    return Response({'products': serializer.data, 'page': page, 'pages':paginator.num_pages})


#Top Products

@api_view(['GET'])
def getToProduct(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

#Get single products
def getProduct(request, pk):
    product = Product.objects.get(_id = pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


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
    
    products = Product.objects.filter(name__icontains = query).order_by('_id')
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
def getTopProduct(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

#Get single products
def getProduct(request, pk):
    product = Product.objects.get(_id = pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):  # sourcery skip: sum-comprehension, use-named-expression
    user = request.user
    product = Product.objects.get(_id = pk)
    data = request.data

    #1. Review already exists
    alreadyExist = product.review_set.filter(user = user).exist()

    if alreadyExist:
        content =  {'details': 'Product already review'}
        return Response(content, status = status.HTTP_400_BAD_REQUEST)
    
    # 2. No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    

    # 3. Create Review
    else:
        review = Review.objects.create(
            user = user,
            product = product,
            name = user.first_name,
            rating = data['rating'],
            comment = data['comment'],
        )
        reviews = product.review_set.all()
        product.numReviews = len(reviews)
        
        total = 0

        for i in reviews:
            total += i.rating
        product.rating = total/len(reviews)
        product.save()
        return Response('Review Added')









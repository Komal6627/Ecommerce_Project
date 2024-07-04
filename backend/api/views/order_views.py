from django.core.exceptions import RequestDataTooBig
from django.shortcuts import render
from datetime import datetime
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response # type: ignore
from rest_framework.serializers import Serializer # type: ignore
from api.models import *
from api.serializers import ProductSerializer, OrderSerializer
from django.utils import timezone

#views start from here

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItem(request):  # sourcery skip: remove-unnecessary-else
    user  = request.user
    data = request.data
    print(data)
    orderItems = data.get('orderItems', [])

    if not orderItems:
        return Response({'detail': 'No Order Items', "status": status.HTTP_400_BAD_REQUEST})
    else:
        #1. Create Order
        order = Order.objects.create(
            user = user,
            paymentMethod = data['paymentMethod'],
            taxPrice = data['taxPrice'],
            shippingPrice = data.get('shippingPrice', 0),  # Provide a default value
            totalPrice = data['totalPrice']
        )

        #2. Create Shipping Address
        shipping_address = data.get('shippingAddress', {})
        shipping = ShippingAddress.objects.create(
            order = order,
            address = shipping_address.get('address', ''),
            city = shipping_address.get('city', ''),
            postalCode = shipping_address.get('postalCode', ''),
            country = shipping_address.get('country', ''),
            shippingPrice = shipping_address.get('shippingPrice',10)  # Provide a default value
        )

        #3. Create orderItems items
        for i in orderItems:
            product = Product.objects.get(_id = i['_id'])

            item = OrderItem.objects.create(
                product= product,
                order = order,
                name = product.name,
                qty = i['qty'],
                price = i['price'],
                image = product.image.url,
            )

            #4. Update stock 
            product.countInStock -= int(item.qty)
            product.save()

        serializer = OrderSerializer(order, many = False)
        return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user

    try:
        order = Order.objects.get(_id = pk)
        if order.user == user:
            serializer = OrderSerializer(order, many = False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this order'}, 
                        status = status.HTTP_400_BAD_REQUEST
                     )
    except Exception:
        return Response({'detail': 'Order does not exist'}, status = status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    try:
        order = Order.objects.get(_id=pk)
        order.isPaid = True
        order.paidAt = datetime.datetime.now()
        order.save()
        return Response('Order was paid', status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToDelivered(request, pk):
    try:
        order = Order.objects.get(_id=pk)
        order.isDelivered = True
        order.deliveredAt = timezone.now()  # Ensure timezone-aware datetime
        order.save()
        return Response('Order was delivered', status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



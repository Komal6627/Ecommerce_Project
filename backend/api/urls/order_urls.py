from django.urls import path
from api.views.order_views import *

urlpatterns = [
    path('add/', addOrderItem, name="orders-add"),
    path('myorders/', getMyOrders, name="myorders"),
    path('<str:pk>/', getOrderById, name="user-order"),
    path('<str:pk>/pay/', updateOrderToPaid, name="pay"),  
    path('<str:pk>/deliver/', updateOrderToDelivered, name="order-deliver")
]





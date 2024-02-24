from django.urls import path
from api.views import order_view as views

urlpattern = [
    path('add/', views.addOrderItems, name="orders-add"),
    path('myorders/',views.getMyOrders, name="myorders"),
    path('<str:pk>/', views.getOrderById, name="user-order"),
    path('<str:pk>/pay/', views.updateOrderToPaid, name="pay"),  
]
 
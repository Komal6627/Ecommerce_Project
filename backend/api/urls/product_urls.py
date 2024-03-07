from django.urls import path
from api.views.product_views import *

urlpatterns = [
    path('', getProducts, name = "products"),
    path('<str:pk>/reviews/', createProductReview, name="create-review"),
    path('top/', getTopProduct, name="top-product"),
    path('<str:pk>', getProduct, name="product")
]






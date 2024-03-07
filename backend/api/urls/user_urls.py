from django.urls import path
from api.views.user_views import *

urlpatterns = [
    path('register/', registerUser, name='register'),
    path('profile/', getUserProfile, name='user_profile'),
    path('profile/update/', updateUserProfile, name='user_profile_update'),
    path('login/', MyTokenObtainPairView.as_view(), name='token'),
    path('delete/<str:pk>/', deleteUser, name='deleteUser')
]


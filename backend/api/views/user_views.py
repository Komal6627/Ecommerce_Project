from typing import Any, Dict
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import Token
from rest_framework_simplejwt.views import TokenObtainPairView
from api.models import *
from api.serializers import UserSerializer, UserSerializerWithToken

#JWT Views
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs) #for validating token

        #serializing the user {} and adding token to it.
        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k] = v

        return data
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)   #for generating token

        #Add custom claims
        token['username'] = user.username
        token['message'] = "Hello Proshop"

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


#SHOP API
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/products/',
        '/api/products/<id>',
        '/api/user/',
        '/api/user/register',
        '/api/user/login',
        '/api/user/profiles',
    ]

    return Response(routes)

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name = data['name'],
            username = data['email'],
            password = make_password(data['password']),
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)

    except:
        message = {
            "detail = User with this email is already register "
        }     
        return Response(message, status=status.HTTP_400_BAD_REQUEST)   

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many = False) 
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many = False) 
    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    if data['password'] != "":
        user.password = make_password(data['password'])
    user.save()
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id = pk)
    userForDeletion.delete()
    return Response("User was deleted")











from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny , IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer , UserProfileSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import UserProfile
from django.shortcuts import get_object_or_404

@api_view(['POST'])
@permission_classes([AllowAny])
def create_user_view(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user

        if not user.is_staff:
            raise serializers.ValidationError('Only admins can log in here.')

        data.update({'is_admin': user.is_staff})
        return data

class AdminTokenObtainPairView(TokenObtainPairView):
    serializer_class = AdminTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_details(request):
    if request.method == 'GET':
        users = UserProfile.objects.all()
        serializer = UserProfileSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','PATCH','DELETE'])
@permission_classes([IsAuthenticated])
def update_user(request, pk):
    user_obj = get_object_or_404(UserProfile, pk=pk)
    if request.method == 'GET':
        serializer = UserProfileSerializer(user_obj)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        user_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method in ['PUT','PATCH']:
        serializer = UserProfileSerializer(user_obj, data=request.data, partial=request.method == 'PATCH')
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile

class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(write_only=True)
    phone = serializers.CharField(write_only=True)
    address = serializers.CharField(write_only=True)
    profile_image = serializers.ImageField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'name', 'phone', 'address', 'profile_image']
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        profile_data = {
            'name': validated_data.pop('name'),
            'phone': validated_data.pop('phone'),
            'address': validated_data.pop('address'),
            'profile_image': validated_data.pop('profile_image', None),
        }
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user, **profile_data)
        return user
class UserProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.username', read_only=True)
    
    class Meta:
        model = UserProfile
        fields = ['id', 'name', 'phone', 'address', 'email']


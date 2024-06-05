from django.urls import path
from .views import user_details, update_user

urlpatterns = [
    path("user_details/", user_details, name="user_details"),
    path("update_user/<int:pk>/", update_user, name="update_user"),
    
]
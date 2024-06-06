from django.urls import path
from .views import user_details, update_user , get_user , search_user

urlpatterns = [
    path("user_details/", user_details, name="user_details"),
    path("update_user/<int:pk>/", update_user, name="update_user"),
    path("get_user/", get_user , name="get_user"),
    path("search_user/", search_user , name="search_user"),

    
]
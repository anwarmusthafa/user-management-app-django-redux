from django.contrib import admin
from django.urls import path, include
from api.views import create_user_view  # Import the function-based view
from api.views import AdminTokenObtainPairView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/register/", create_user_view, name="register"),  # Use the function-based view
     path("api/admin/login/", AdminTokenObtainPairView.as_view(), name="admin_login"),  # Admin login view
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path('api/', include('api.urls'))
]
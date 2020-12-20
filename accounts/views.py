from django.contrib.auth import get_user_model, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework import (
    generics,
    permissions,
    status
)
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import (
    LoginSerializer,
    SignupSerializer,
    UserSerializer,
)


User = get_user_model()


@method_decorator(ensure_csrf_cookie, name='dispatch')
class SignupView(generics.GenericAPIView):
    """Signup View
    """
    serializer_class = SignupSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(UserSerializer(user, context=self.get_serializer_context()).data)


@method_decorator(ensure_csrf_cookie, name='dispatch')
class LoginView(generics.GenericAPIView):
    """Login View
    """
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response(UserSerializer(user, context=self.get_serializer_context()).data)


@method_decorator(ensure_csrf_cookie, name='dispatch')
class LogoutView(APIView):
    """Logout View
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class IsAuthenticatedView(APIView):
    """IsAuthenticated View
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return Response(
                UserSerializer(request.user).data,
                status=status.HTTP_200_OK
            )
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

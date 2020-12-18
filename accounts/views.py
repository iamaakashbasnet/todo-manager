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
        return Response(
            {
                'status': 'success',
                'result': UserSerializer(user, context=self.get_serializer_context()).data,
                'message': 'Signup successful'
            }
        )


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
        return Response(
            {
                'status': 'success',
                'result': UserSerializer(user, context=self.get_serializer_context()).data,
                'message': 'Login successful'
            }
        )


@method_decorator(ensure_csrf_cookie, name='dispatch')
class LogoutView(APIView):
    """Logout View
    """

    def post(self, request, *args, **kwargs):
        logout(request)
        return Response(
            {
                'status': 'success',
                'result': None,
                'message': 'Logout successful'
            }
        )


class IsAuthenticatedView(APIView):
    """IsAuthenticated View
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return Response(
                {
                    'status': 'success',
                    'result': UserSerializer(request.user).data,
                    'message': 'User authenticated'
                },
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {
                    'status': 'error',
                    'result': None,
                    'message': 'Authentication failed'
                },
                status=status.HTTP_401_UNAUTHORIZED
            )

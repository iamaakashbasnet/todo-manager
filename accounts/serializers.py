from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """User Serializer
    """

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name',
                  'last_name', 'avatar',)


class SignupSerializer(serializers.ModelSerializer):
    """Signup Serializer
    """

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name',
                  'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    """Login Serializer
    """

    email = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        write_only=True
    )

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            try:
                user = authenticate(request=self.context.get('request'),
                                    email=email, password=password)
            except:
                user = authenticate(request=self.context.get('request'),
                                    username=email, password=password)
            if not user:
                raise serializers.ValidationError(
                    'Unable to log in with provided credentials.')
        else:
            raise serializers.ValidationError(
                'Must include "email" and "password".')

        data['user'] = user
        return data

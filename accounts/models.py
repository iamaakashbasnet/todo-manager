
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)
from django.utils import timezone


class CustomUserManager(BaseUserManager):
    """Custom User Model Manager
    """

    def create_user(self, email, username, password=None):
        if not email and not username:
            raise ValueError('User must have an email address and username.')

        email = self.normalize_email(email)
        user = self.model(email=email, username=username)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, username, password=None):
        if not email and not username:
            raise ValueError('User must have an email address and username.')

        email = self.normalize_email(email)
        user = self.model(email=email, username=username)
        user.is_active = True
        user.is_staff = True
        user.is_superuser = True
        user.set_password(password)
        user.save()
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    """Custom User Model
    """
    email = models.EmailField(verbose_name='Email',
                              max_length=120, unique=True)
    username = models.CharField(
        verbose_name='Username', max_length=30, unique=True)
    first_name = models.CharField(verbose_name='First Name', max_length=30)
    last_name = models.CharField(verbose_name='Last Name', max_length=30)
    avatar = models.ImageField(
        verbose_name='Avatar/Profile Picture', default='default.png', upload_to='avatar')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = CustomUserManager()

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        return self.username

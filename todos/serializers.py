from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Todo


User = get_user_model()


# class AuthorSerializer(serializers.ModelSerializer):
#     """Author serializer
#     """

#     class Meta:
#         model = User
#         fields = ('username',)


class TodoSerializer(serializers.ModelSerializer):
    """Todo Serializers
    """

    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)
    #     representation["author"] = AuthorSerializer(instance.author).data
    #     return representation

    class Meta:
        model = Todo
        fields = ('id', 'title', 'date_created', 'completed', 'author',)
        read_only_fields = ('author',)

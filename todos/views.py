from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import (
    generics,
    permissions,
)
from todos.models import Todo
from .serializers import TodoSerializer


@method_decorator(ensure_csrf_cookie, name='dispatch')
class TodoListView(generics.ListAPIView):
    """Todo List View
    """
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(author=user).order_by('-date_created')


@method_decorator(ensure_csrf_cookie, name='dispatch')
class TodoCreateView(generics.CreateAPIView):
    """Todo Create View
    """
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


@method_decorator(ensure_csrf_cookie, name='dispatch')
class TodoDetailView(generics.RetrieveAPIView):
    """Todo Detail View
    """
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Todo.objects.filter(author=self.request.user, pk=self.kwargs['pk'])


@method_decorator(ensure_csrf_cookie, name='dispatch')
class TodoDeleteView(generics.DestroyAPIView):
    """Todo Delete View
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()


@method_decorator(ensure_csrf_cookie, name='dispatch')
class TodoUpdateView(generics.UpdateAPIView):
    """Todo Update View
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TodoSerializer

    def get_queryset(self):
        return Todo.objects.filter(pk=self.kwargs['pk'])

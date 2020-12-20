from django.urls import path
from . import views

urlpatterns = [
    path('list/', views.TodoListView.as_view()),
    path('create/', views.TodoCreateView.as_view()),
    path('detail/<int:pk>/', views.TodoDetailView.as_view()),
    path('delete/<int:pk>/', views.TodoDeleteView.as_view()),
    path('update/<int:pk>/', views.TodoUpdateView.as_view()),
]

from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Todo(models.Model):
    """Todo model
    """
    title = models.CharField(
        verbose_name='Todo title', max_length=120)
    completed = models.BooleanField(
        verbose_name='Todo Completed', default=False)
    date_created = models.DateTimeField(
        verbose_name='Time of creation', auto_now_add=True)
    author = models.ForeignKey(
        User, verbose_name='User', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.author}: {self.title}'

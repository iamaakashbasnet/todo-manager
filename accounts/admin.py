from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model


CustomUser = get_user_model()


class AccountAdmin(UserAdmin):
    """Custom User Admin
    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fieldsets = (
            ('Account Information', {
                'fields': (
                    ('email', 'username', 'password',),
                )
            }),
            (('Personal Information'), {
                'fields': (
                    ('first_name', 'last_name', 'avatar',),
                )
            }),
            (('Permissions'), {
                'fields': (
                    ('is_active', 'is_staff', 'is_superuser',),
                    'groups',
                    'user_permissions',
                ),
                'classes': ('collapse',)
            }),
            (('Important Dates'), {
                'fields': (
                    ('date_joined', 'last_login',),
                ),
                'classes': ('collapse',)
            }),
        )

        self.add_fieldsets = (
            (None, {
                'classes': ('wide',),
                'fields': ('email', 'username', 'first_name', 'last_name', 'password1', 'password2',),
            }),
        )


admin.site.register(CustomUser, AccountAdmin)

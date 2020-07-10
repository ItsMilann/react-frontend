# from django.contrib import admin
# from .models import User
# from .forms import UserAdminCreationForm, UserAdminChangeForm

# class UserAdmin(admin.ModelAdmin):
#   list_display = ['first_name', 'last_name', 'email', 'is_staff']
#   search_fields = ['email', 'first_name']
#   form = UserAdminChangeForm
#   add_form = UserAdminCreationForm

#   # class Meta:
#   #   model = User

# admin.site.register(User, UserAdmin)

# # accounts.admin.py

from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


from .forms import UserAdminCreationForm, UserAdminChangeForm
from .models import User

class UserAdmin(BaseUserAdmin):
    form = UserAdminChangeForm
    add_form = UserAdminCreationForm
    list_display = ('email', 'first_name', 'last_name', 'is_admin')
    list_filter = ('admin',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('admin',)}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password', 'password2')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()


admin.site.register(User, UserAdmin)
admin.site.unregister(Group)
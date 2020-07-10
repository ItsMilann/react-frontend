from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin


class UserManager(BaseUserManager):
  def create_user(self, email, first_name, last_name, password=None, is_active=False, is_staff=False, is_admin=False):
    if not email or not first_name or not last_name:
      raise ValueError("User must have a email address, first name and a last name.")
    if not password:
      raise ValueError("User must have a password.")
    first_name    = first_name.capitalize()
    last_name     = last_name.capitalize()
    user = self.model(email=self.normalize_email(email), first_name=first_name, last_name=last_name)
    user.set_password(password)
    user.active = is_active
    user.staff = is_staff
    user.admin = is_admin
    user.save(using=self._db)
    return user
  
  def create_staffuser(self, email, first_name, last_name, password=None):
    user = self.create_user(email, first_name, last_name, password=password, is_active=True, is_staff=True)
    return user

  def create_superuser(self, email, first_name, last_name, password=None):
    user = self.create_user(email, first_name, last_name, password=password, is_active=True, is_staff=True, is_admin=True)
    return user


class User(AbstractBaseUser, PermissionsMixin):
  email = models.EmailField(max_length=255, unique=True)
  first_name = models.CharField(max_length=255)
  last_name = models.CharField(max_length=255)
  active = models.BooleanField(default = False)
  staff = models.BooleanField(default = False)
  admin = models.BooleanField(default=False)
  created = models.DateTimeField(auto_now=True)
  objects = UserManager()

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['first_name', 'last_name']

  def __str__(self):
    return self.email
  
  def get_full_name(self):
    return '{} {}'.format(self.first_name, self.last_name)
  
  @property
  def is_active(self):
    return self.active
  
  @property
  def is_staff(self):
    return self.staff

  @property
  def is_admin(self):
    return self.admin
  
  def has_perm(self, perm, obj=None):
    return True

  def has_module_perms(self, app_label):
    return True

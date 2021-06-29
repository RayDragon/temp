from django.db import models
from django.core.exceptions import ValidationError
from jsonfield import JSONField
from datetime import datetime

#create a model for holiday table with fields id, city_name, data and holidayName
class Holiday(models.Model):
  city_name = models.CharField(max_length=50)
  date = models.DateTimeField(max_length=50)
  holidayName = models.CharField(max_length=50)

  # def save(self, *args, **argv):
  #   if type(self.date) == str:
  #     self.date = datetime.strptime(self.date, '%Y-%m-%d')
  #   if self.date < datetime.now().today():
  #       raise ValidationError("Date cannot be in the past")
  #   super(Event, self).save(*args, **argv)
    
#create a class for Admin table with id, admin_name, admin_email and password columns	
class Admin(models.Model):
  admin_name = models.CharField(max_length=50)
  admin_email = models.CharField(max_length=50)
  password = models.CharField(max_length=50)

#create a class for Cities table with fields id, cityName
class Cities(models.Model):
  cityName = models.CharField(max_length=50)

try:
  Cities.objects.create(id=1, cityName='Hyderabad')
except Exception as e:
  print("Error creating initial data")
  print(e)
 
try:
  Cities.objects.create(id=2, cityName='Chennai')
except Exception as e:
  print("Error creating initial data")
  print(e)
 

try:
  Cities.objects.create(id=3, cityName='Pune')
except Exception as e:
  print("Error creating initial data")
  print(e)
 

try:
  Admin.objects.create(id=1, admin_name="test", admin_email="test@admin.com", password="password")
except Exception as e:
  print("Error creating initial data")
  print(e)
  
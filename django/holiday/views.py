from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from django.core import serializers
from rest_framework import status

from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import csv
import os
import json
from datetime import datetime
from django.utils import timezone
import pytz
import datetime as dt
from django.core.exceptions import ValidationError
from .checkdate import check_date

# Create your views here.
from .serializers import HolidayListSerializer, Holiday
#Method to retrieve a list of all holidays in database
#className ---> HolidayListView
class HolidayListView(generics.ListAPIView):
  queryset = Holiday.objects.all()
  serializer_class = HolidayListSerializer
  # def get(self, request):
  #   holidays = list(lambda x: {'city_name', x.city_name, "date": x.date.strftime("%d/%m/%Y"), "holidayName": x.holidayName}, map(list(Holiday.objects.all())))

  #   return Response(HolidayListSerializer(holidays, many=True).data)


#Get only city values in the list
#className ---> CityListView
from .serializers import Cities, CityListSerializer
class CityListView(generics.ListAPIView):
  queryset = Cities.objects.all()
  serializer_class = CityListSerializer
	
#Method to delete the Holiday using the primary key as the url parameter
#className ---> HolidayDeleteView
class HolidayDeleteView(generics.DestroyAPIView):
  def delete(self, request, pk):
    Holiday.objects.get(pk=pk).delete()
    return Response({'hello':'there'}, status=204)

#Method to edit the holiday that is already been created
#className ---> HolidayEditView
class HolidayEditView(generics.UpdateAPIView):
  def put(self, request, pk):
    data = dict(request.data)
    h = Holiday.objects.get(pk=pk)
    h.city_name = data['city_name']
    h.date = datetime.strptime(data['date'], '%d/%m/%Y')
    h.holidayName = data['holidayName']
    h.save()
    return Response({'status': 1})



#Method to upload a file in csv format conatining all the records that are to be entered in the database
	#use the function from check_date.py to get the flag for uploading. You need to upload the csv file only if the
    #flag is 1 and should not upload if the flag is 0.. 
#className ---> UploadCreateView
class UploadCreateView(generics.CreateAPIView):
  def post(self, request):
    tempFile = open("temp.csv", "wb")
    data = request.FILES['file'].read()
    tempFile.write(data)
    tempFile.close()
    if check_date('temp.csv') == 1:
      fileData = data.decode('utf-8').split('\n')[1:] 
      for row in fileData:
        h = Holiday()
        r = row.split(',')
        if len(r) != 3:
          continue
        print(r)
        h.city_name = r[0]
        h.date = datetime.strptime(r[1], '%d/%m/%Y')
        h.holidayName = r[2]
        h.save()
      return Response({"status": 1})
    else:
      return Response({"status": 0})
    
#Method for retrieval of holidays based on city, year and month.
#className ---> MonthlyHolidayView

class MonthlyHolidayView(generics.CreateAPIView):
  def post(self, request):
    data = request.data.dict()
    city = Holiday.objects.filter(city_name=data['city_name'])
    cities = []
    for x in city:
      month = int(x.date.strftime('%m'))
      year = int(x.date.strftime("%Y"))
      # print("Month / year", month, year, data['month'], data['year'], x.holidayName)
      if month == int(data['month']) and year == int(data['year']):
        cities.append({'holidayName': x.holidayName, 'id':x.id, 'date': x.date.strftime('%d/%m/%Y')})
    # print("Holidays found:", cities)
    if len(cities) == 0:
      return Response({})
    # else if len(cities) == 1:
    #   return Response(cities[0])
    return Response(cities)
	

#Method to retrieve Whether the admin is authorized or not
   #find the details of the admin user using the email and return a status with 0 or 1 based on invalid user and valid user respectively. If the details are not provided please return a response with message email not provided.
#className --->AdminLoginView
from .models import Admin
class AdminLoginView(generics.CreateAPIView):
  def post(self, request):
    a = Admin.objects.filter(**request.data.dict())
    # print(a, request.data.dict())
    if len(a)==0:
      return Response({"message":"No admin with provided email"})
    return Response({"status": 1})
#Method to retrieve holidays for a particular date
#className --->DailyHolidayView
from .serializers import DailySerializer
class DailyHolidayView(generics.CreateAPIView):
  def post(self, request):
    data = request.data.dict()
    city = Holiday.objects.filter(city_name=data['city_name'])
    cities = []
    for x in city:
      d = x.date
      if x.date.strftime('%d/%m/%Y') == data['date']:
        return Response(DailySerializer(x).data)
        #cities.append(x)
    return Response({})
#Method to add a holiday to the list
#className ---> HolidayCreateView 
class HolidayCreateView(generics.CreateAPIView):
  def post(self, request):
    try:
      data = dict(request.data.dict())
      if datetime.strptime(data['date'], '%Y-%m-%d') < datetime.now().today():
        return Response({"date":["Date cannot be in the past"]}, status=400)
      data['date'] = datetime.strptime(data['date'], '%Y-%m-%d').replace(tzinfo=pytz.UTC)
      holiday = Holiday(**data)
      holiday.save()
      # print("Holiday Create View Success")
      return Response({'status': 1})
    except ValidationError as e:
      
      # print(e)
      return Response({'status': 0})
      # return Response({'error': ''}, status=500)
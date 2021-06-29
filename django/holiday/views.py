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
import datetime as dt

from .checkdate import check_date

# Create your views here.

#Method to retrieve a list of all holidays in database
#className ---> HolidayListView
    

#Get only city values in the list
#className ---> CityListView
	
	
#Method to delete the Holiday using the primary key as the url parameter
#className ---> HolidayDeleteView
	

#Method to edit the holiday that is already been created
#className ---> HolidayEditView


#Method to upload a file in csv format conatining all the records that are to be entered in the database
	#use the function from check_date.py to get the flag for uploading. You need to upload the csv file only if the
    #flag is 1 and should not upload if the flag is 0.. 
#className ---> UploadCreateView
    
    
#Method for retrieval of holidays based on city, year and month.
#className ---> MonthlyHolidayView

#Method to retrieve Whether the admin is authorized or not
   #find the details of the admin user using the email and return a status with 0 or 1 based on invalid user and valid user respectively. If the details are not provided please return a response with message email not provided.
#className --->AdminLoginView

#Method to retrieve holidays for a particular date
#className --->DailyHolidayView
	
#Method to add a holiday to the list
#className ---> HolidayCreateView 
	
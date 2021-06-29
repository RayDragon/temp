from django.contrib import admin
from django.urls import path, include
#import your views here

from .views import HolidayCreateView
from .views import HolidayListView
from .views import CityListView
from .views import HolidayDeleteView
from .views import AdminLoginView
from .views import DailyHolidayView, UploadCreateView
from .views import MonthlyHolidayView, HolidayEditView
#Add your views to the url patterns

urlpatterns = [
	path('create/', HolidayCreateView.as_view()),
	path('holidays/all/', HolidayListView.as_view()),
	path('cities/', CityListView.as_view()),
	path('monthly/', MonthlyHolidayView.as_view()),
  path('daily/', DailyHolidayView.as_view()),
	path('upload/', UploadCreateView.as_view()),
  path('deleteholidayinfo/<int:pk>/', HolidayDeleteView.as_view()),
  path('updateholidayinfo/<int:pk>/', HolidayEditView.as_view()),
  path('admin/login/', AdminLoginView.as_view())
]

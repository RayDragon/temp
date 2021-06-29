from rest_framework import serializers
from .models import Holiday, Cities

#Holiday serializer with id, cityname , date and holidayname
#Name ----> HolidaySerializer
class HolidaySerializer(serializers.HyperlinkedModelSerializer):
  date = serializers.SerializerMethodField()
  class Meta:
    fields = ('id', 'city_name','date', 'holidayName')
    model = Holiday
  def get_date(self, obj):
    print("i was inside")
    return obj.date.strftime("%d/%m/%Y")

#holidaylistserializer with cityname, date and holidayname
#Name ----->HolidayListSerializer
class HolidayListSerializer(serializers.HyperlinkedModelSerializer):
  date = serializers.SerializerMethodField()
  class Meta:
    fields = ('city_name', 'date', 'holidayName')
    model = Holiday

  def get_date(self, obj):
    print("i was inside")
    return obj.date.strftime("%d/%m/%Y")


#uploadserializer with a field --> file which is not present in the holiday model
#Name---->UploadSerializer
	
#citylistserializer with cityname 
#Name ----->CityListSerializer
class CityListSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    fields = ('cityName', )
    model = Cities
	
#monthserializer with fields cityname and year, month which are not present in the model
#Name -----> MonthSerializer

	
#dailyserializer with date field
#Name -----> DailySerializer
class DailySerializer(serializers.HyperlinkedModelSerializer):
  date = serializers.SerializerMethodField()
  class Meta:
    fields = ('id', 'holidayName', 'date')
    model = Holiday

  def get_date(self, obj):
    print("i was inside")
    return obj.date.strftime("%d/%m/%Y")


#adminloginserializer with adminemail and password
#Name -----> AdminLoginSerializer
	
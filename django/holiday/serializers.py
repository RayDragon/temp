from rest_framework import serializers


#Holiday serializer with id, cityname , date and holidayname
#Name ----> HolidaySerializer
	
#holidaylistserializer with cityname, date and holidayname
#Name ----->HolidayListSerializer

#uploadserializer with a field --> file which is not present in the holiday model
#Name---->UploadSerializer
	
#citylistserializer with cityname 
#Name ----->CityListSerializer
	
#monthserializer with fields cityname and year, month which are not present in the model
#Name -----> MonthSerializer
	
#dailyserializer with date field
#Name -----> DailySerializer
	
#adminloginserializer with adminemail and password
#Name -----> AdminLoginSerializer
	
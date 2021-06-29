cd angular;
./node_modules/.bin/ng test;
cd ..
cd django;
rm -rf unit.xml; 
python3 manage.py makemigrations;
python3 manage.py migrate --run-syncdb;
python3 manage.py test --keepdb;
cd ..
python3 parser.py

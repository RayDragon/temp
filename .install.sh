
sudo apt-get remove node -y;
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -;
sudo apt-get install -y nodejs;
cd angular;
npm install
cd ..;
cd django;
sudo apt-get install libpq-dev python3-dev; pip3 install --user -r requirements.txt;

pip install virtualenv
python3 -m venv env
env/Scripts/Activate.ps1 
pip install -r requirements.txt

gunicorn -b 0.0.0.0:4000 wsgi:app
gunicorn --bind 0.0.0.0:4000 --reload wsgi:app
curl localhost:4000

sudo systemctl daemon-reload
sudo systemctl start picstone
sudo systemctl enable picstone
systemctl status picstone

sudo systemctl start nginx
sudo systemctl enable nginx

ssh -i "picstone.pem" ubuntu@ec2-13-39-155-16.eu-west-3.compute.amazonaws.com
~/env/picstone/Scripts/Activate.ps1
source env/bin/activate
curl localhost:4000
# vehicleRentals

## Set up to run the server on Docker container
Clone this repository as it is and run the following command
```
docker-compose up
```
After you will get the following success messages, it takes some time for Connected to SQL Server successfully wait for some time
```
server is listening on port 3000
Connected to SQL Server successfully
```
Now import the postman connection into your postman tool and try to hit the followin url to setup database
```
http://localhost:3000/api/run/scripts
```
### After loading this is how the

![databasedata](https://github.com/maheshkuntumalla/vehicleRentals/assets/87142618/983e659d-a42d-481a-94e4-70b89f3d1725)

That's it, now you can make the requests that are provided in the postman collection.

## Set up to run the server on Locally
For this you need to install MSSQL server in your local system and you have to create sa user in the sql server. After that change the .env file with all your details.and run following command
```
npm start
```
After you will get the following success messages.
```
server is listening on port 3000
Connected to SQL Server successfully
```
Now import the postman connection into your postman tool and try to hit the followin url to setup database
```
http://localhost:3000/api/run/scripts
```
That's it, now you can make the requests that are provided in the postman collection.

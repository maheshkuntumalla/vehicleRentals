CREATE TABLE Users (
  u_id INT PRIMARY KEY IDENTITY(1,1),
  u_first_name NVARCHAR(100) NOT NULL,
  u_last_name NVARCHAR(100) NOT NULL
);

CREATE TABLE VehicleTypes (
  type_id INT PRIMARY KEY IDENTITY(1,1),
  type_name NVARCHAR(100) NOT NULL,
  type_wheelcount INT NOT NULL
);

CREATE TABLE Vehicles (
  vehicle_id INT PRIMARY KEY IDENTITY(1,1),
  vehicle_type_id INT NOT NULL,
  vehicle_model NVARCHAR(100) NOT NULL,
  vehicle_availability BIT NOT NULL DEFAULT 1,
  FOREIGN KEY (vehicle_type_id) REFERENCES VehicleTypes (type_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Rentals (
  rental_id INT PRIMARY KEY IDENTITY(1,1),
  r_vehicle_id INT NOT NULL,
  r_user_id INT NOT NULL,
  r_start_date DATETIME NOT NULL,
  r_end_date DATETIME NOT NULL,
  FOREIGN KEY (r_vehicle_id) REFERENCES Vehicles (vehicle_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (r_user_id) REFERENCES Users (u_id) ON DELETE CASCADE ON UPDATE CASCADE,
);

--adding values into the VehicleTypes table

insert into VehicleTypes(type_name, type_wheelcount)
values
	('Hatchback',4),
	('Suv',4),
	('Sedan',4),
	('Cruiser',2),
	('Sports',2)


insert into Vehicles(vehicle_type_id, vehicle_model)
values
	(1,'Maruti Baleno'),
	(2,'Tata Nexon'),
	(3,'Honda City'),
	(4,'Jawa. 831'),
	(5,'KTM. RC 125')

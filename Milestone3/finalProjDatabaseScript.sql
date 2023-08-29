-- SQL SCRIPT TO CREATE SCHEMA AND TABLES + ADD DATA TO TABLES --

-- Drop schema and tables if it already exists (so script can be re-run) --
DROP DATABASE IF EXISTS cali_housing_prices;

-- Create and use schema --
CREATE DATABASE cali_housing_prices;
USE cali_housing_prices;

-- Create tables --
CREATE TABLE all_housing_data 
(
	block_id INT AUTO_INCREMENT PRIMARY KEY,
    longitude DECIMAL(5,2) NOT NULL,
    latitude DECIMAL(5,2) NOT NULL,
    housing_median_age INT NOT NULL,
    total_rooms INT NOT NULL,
    total_bedrooms INT NOT NULL,
    population INT NOT NULL DEFAULT 0,
    households INT NOT NULL DEFAULT 0,
    median_income DECIMAL(5,2) NOT NULL,
    ocean_prox VARCHAR(100) NOT NULL,
    median_house_value INT NOT NULL
);

CREATE TABLE block_location
(
	block_id INT AUTO_INCREMENT PRIMARY KEY,
	longitude DECIMAL(5,2) NOT NULL,
    latitude DECIMAL(5,2) NOT NULL
);

CREATE TABLE financial_info
(
	block_id INT NOT NULL,
    median_income DECIMAL(5,2) NOT NULL, 
    median_house_value INT NOT NULL,
    PRIMARY KEY(block_id),
    FOREIGN KEY (block_id) REFERENCES block_location(block_id)
);

CREATE TABLE block_size
(
	block_id INT NOT NULL,
    population INT NOT NULL DEFAULT 0,
    households INT NOT NULL DEFAULT 0,
    PRIMARY KEY(block_id),
    FOREIGN KEY (block_id) REFERENCES block_location(block_id)
);

CREATE TABLE house_size
(
	block_id INT NOT NULL,
    total_rooms INT NOT NULL,
    total_bedrooms INT NOT NULL,
    PRIMARY KEY(block_id),
    FOREIGN KEY (block_id) REFERENCES block_location(block_id)
);

CREATE TABLE house_age
(
	block_id INT NOT NULL,
    housing_median_age INT NOT NULL,
    PRIMARY KEY(block_id),
    FOREIGN KEY (block_id) REFERENCES block_location(block_id)
);

CREATE TABLE ocean_proximity
(
	block_id INT NOT NULL,
    ocean_prox VARCHAR(100) NOT NULL, 
    PRIMARY KEY(block_id),
    FOREIGN KEY (block_id) REFERENCES block_location(block_id)
);

-- set configurations --
SET GLOBAL local_infile = 1;

-- Populate main table with all of the data (that has already been cleaned up) --
LOAD DATA LOCAL INFILE '/Users/sofiajayaswal/dev/Cs61_final_proj/all_data.csv'
INTO TABLE all_housing_data
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(longitude, latitude, housing_median_age, total_rooms, total_bedrooms, population, households, median_income, ocean_prox, median_house_value);

-- Populate subtables with needed columns from the main table --
INSERT INTO block_location(block_id, longitude, latitude)
SELECT block_id, longitude, latitude
FROM all_housing_data;

INSERT INTO financial_info(block_id, median_income, median_house_value)
SELECT block_id, median_income, median_house_value
FROM all_housing_data;

INSERT INTO block_size(block_id, population, households)
SELECT block_id, population, households
FROM all_housing_data;

INSERT INTO house_size(block_id, total_rooms, total_bedrooms)
SELECT block_id, total_rooms, total_bedrooms
FROM all_housing_data;

INSERT INTO house_age(block_id, housing_median_age)
SELECT block_id, housing_median_age
FROM all_housing_data;

INSERT INTO ocean_proximity(block_id, ocean_prox)
SELECT block_id, ocean_prox
FROM all_housing_data;

-- Drop main table as it is not needed anymore --
DROP TABLE all_housing_data;
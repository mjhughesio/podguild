# Capstone Proposal

The below is the proposal for my capstone project, which was submitted for approval on Monday, December 16th, 2019. The presentation will take place at a date to be determined in mid-February 2020.

## Name

**Pod Guild** - a bit of a reference to the PDX Code Guild, with the definition of guild being "an association of people for mutual aid or the pursuit of a common goal". The goal in this scenario is to link podcast hosts with guests to produce mutually beneficial content.

## Project Overview

**What are the major features of your web application?**
* Allows users to register as either a podcast host or guest and create their respective profiles
* Each profile will feature optional and required fields, such as name, photo, education, experience, skills, etc.
* Ability for either party to search the information of the other and initiate contact

**What problem is it attempting to solve?**
* The app is intended to serve as a platform for podcast hosts to find guests and vice-versa
* Through research, I have not been able to identify a similar platform that exists

**What libraries or frameworks will you use?**
* The core of the app will be built using the MERN stack: MongoDB, Express, React & Node
* The app will likely be styled with a combination of Bootstrap and vanilla CSS
* Various Node Dependencies to be used: express, express-validator, bcryptjs, config, gravatar, jsonwebtoken, mongoose, request, nodemon, concurrently, etc.

## Features

### User Story #1:
* As a host of a podcast in need of guests to interview, I want a platform to be able to advertise my podcast and search for guests

### Tasks:
* Add ability to register an account
* Add ability to create a host profile
* Add ability to search guest profiles based on skills / tags

### User Story #2:
* As a person interested in appearing on a podcast, I want a platform to be able to create a profile and search for podcasts

### Tasks:
* Add ability to create a guest profile
* Add ability to search host profiles based on topics

### User Story #3:
* As a podcast host or potential guest who has located a mutual party, I want to be able to contact them

### Tasks:
* Add ability to send message in-app

## Functionality Questions:

**What will the user see on each page?**
* The home page will be the landing page with options to log in or register
* The registration page will feature form fields such as name, email address, password and confirm password
* Once registered, the user will be taken to their dashboard to create a profile for either a host or guest

**What can they input and click and see?**
* Once logged in, users can view the profiles for all of the listed hosts or guests, respectively
* There will also be an option where they can search skills or topics to help filter the returns

**How will their actions correspond to events on the back-end?**
* Users will be able to create accounts
* Users will be able to create, edit and delete both host and guest profiles
* Users will be able to search the fields of other users, thus returning filtered results

## Data Model

* **User:** Name, Email, Password, Avatar, Date Registered
* **Guest Profile:** User ID, Company, Website, Email, Location, Status / Experience Level, Skills / Tags, Bio, Github Username, Experience, Education, Social Media Links, Date Last Updated
* **Host Profile:** User ID, Name of Podcast, Bio, Topics, Website, Email, Location, Social Media Links, Date Last Updated

## Schedule
* Set Up Express & MongoDB
* Create and define API routes
* Create the User & Profile models
* Set up and implement authentication
* Implement CRUD options
* Set up React and link frontend with backend
* Implement State
* Create necessary components
* Deploy

## Ranking The Product Backlog

* **Essential Features:**
  * Landing page with options to log in or register
  * Registration page with ability to create an account
  * Dashboard with ability to create, edit and delete profiles
  * Login page with ability to sign into account
  * Host or Guest page, which lists all of the available podcasts or guests
  * Ability to search through all of the hosts or guests

* **Really-Great-To-Haves:**
  * Built-in messaging service to contact hosts or guests without having to send an email or reach out via a social media site
 
* **Nice-To-Haves:**
  * Calendar option to advertise availability based on date and time

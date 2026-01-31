# Student Management System

A simple Student Management System built with Spring Boot, Java, and H2 Database. This application allows for managing student records including adding, viewing, updating, and deleting students.

## Features

- **Admin Login**: Secure access for administrators.
- **Student Management**:
  - View all students
  - Add new students
  - Update existing student details
  - Delete student records
- **H2 Database**: Uses an in-memory database for easy setup and testing.

## Technologies Used

- **Java**: JDK 17
- **Spring Boot**: 3.2.2
  - Spring Web
  - Spring Data JPA
- **Database**: H2 (In-memory)
- **Tooling**: Maven, Lombok

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd student-management-system
```

### 2. Build the Project

```bash
mvn clean install
```

### 3. Run the Application

```bash
mvn spring-boot:run
```

The application will start on **port 8080**.

## API Endpoints

Base URL: `http://localhost:8080/api`

### Authentication
- **POST** `/login`
  - Body: `{ "username": "admin", "password": "admin123" }`

### Students
- **GET** `/students` - Get all students
- **GET** `/students/{id}` - Get student by ID
- **POST** `/students` - Create a new student
- **PUT** `/students/{id}` - Update a student
- **DELETE** `/students/{id}` - Delete a student

## H2 Database Console

You can access the H2 database console to view data directly.

- **URL**: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
- **JDBC URL**: `jdbc:h2:mem:smsdb`
- **Username**: `sa`
- **Password**: `password`

## Project Structure

```
src
├── main
│   ├── java
│   │   └── com.sms
│   │       ├── controller  # API Controllers
│   │       ├── model       # JPA Entities
│   │       ├── repository  # Data Access Layer
│   │       └── service     # Business Logic
│   └── resources
│       ├── application.properties # Configuration
│       └── static      # Static assets (HTML/CSS)
```

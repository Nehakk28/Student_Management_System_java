
# Student Management System (EduManage)

Student Management System built with Java, Spring Boot, and H2 Database. This application provides a clean, responsive web interface for administrators to manage student records efficiently.

## Features:

- Complete CRUD Operations:
  1. Add: Create new student profiles with details like name, email, course, and age.
  2. View: Dynamically rendered table of all students.
  3. Search: Real-time search by Student ID or Name.
  4. Edit: Modify existing student information
  5. Delete: Remove student records from the database.
- In-Memory Database: Uses H2 database for rapid development and easy testing without external setup.

## Technologies:

1. Backend:
- Java 17
- Spring Boot 3.2.2
- Spring Data JPA
- Lombok
2. Frontend:
- HTML5 & CSS3 
- Vanilla JavaScript 
3. Database: H2 (In-memory)
4. Build Tool: Maven

## Prerequisites

- Java: JDK 17 or higher
- Maven
- IDE: IntelliJ IDEA 

## Installation & Setup

1. Clone the Repository
2. Build and Run
   -Using Maven

         mvn clean install
         mvn spring-boot:run
3. In IntelliJ IDEA : Right-click `StudentManagementApplication.java` and select Run
4. Access the Application : http://localhost:8080 in your browser.

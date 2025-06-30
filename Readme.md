# DriveConnect - Backend API Documentation

## Overview

This is the backend API for the **Car Learning System**, built using the **MERN stack**. It supports three types of users:

1. **Instructor** - Registers to teach driving.
2. **Learner** - Registers to find and book instructors.
3. **Admin** - Manages the platform (approves instructors, monitors users & bookings).

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose ODM)
- **JWT Authentication**
- **Nodemailer** (Email/OTP)
- **Multer** (File uploads)
- **dotenv** (Environment variables)
- **CORS**

## Database Details

- **Database:** MongoDB (cloud/local)
- **Connection:** See `config/db.js` (uses `MONGO_URI` from `.env`)
- **Main Models:**
  - `User.js`: User schema (learners, instructors, admin)
  - `InstructorProfile.js`: Instructor profile details
  - `InstructorTempRequests.js`: Pending instructor requests
  - `Booking.js`: Booking details

### Prerequisites

- Install **Node.js** and **MongoDB**.
- Set up a `.env` file with the following:
  ```env
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key
  ```

### Steps to Run the Project

```sh
git clone https://github.com/your-repo/car-learning-system.git
cd car-learning-system-backend
npm install
npm start
```

## API Endpoints

### Auth

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — User login

### Instructors

- `GET /api/instructors/` — List all instructors
- `POST /api/instructors/create-profile` — Create instructor profile
- `GET /api/instructors/get-profile/:userId` — Get instructor profile
- `PUT /api/instructors/update-profile/:userId` — Update instructor profile
- `POST /api/instructors/create-request` — Submit instructor request (with file uploads)

### Bookings

- `POST /api/bookings/` — Create a booking
- `GET /api/bookings/my` — List learner's bookings

### Admin

- `GET /api/admin/pending-instructors` — List pending instructor requests
- `POST /api/admin/approve-instructor/:id` — Approve instructor
- `POST /api/admin/reject-instructor/:id` — Reject instructor

### OTP

- `POST /api/otp/send-otp` — Send OTP to email
- `POST /api/otp/verify-otp` — Verify OTP
- `POST /api/otp/reset-password` — Reset password via OTP

### 1️⃣ Authentication (User & Instructor)

#### Register

```http
POST /api/auth/register
```

**Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "instructor"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here"
}
```

#### Login

```http
POST /api/auth/login
```

**Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "jwt_token_here"
}
```

### 2️⃣ Instructor Management

#### Get All Approved Instructors

```http
GET /api/instructors
```

**Response:**

```json
[
  {
    "_id": "instructorId123",
    "name": "John Doe",
    "email": "john@example.com"
  }
]
```

### 3️⃣ Booking Management

#### Create a Booking

```http
POST /api/bookings
```

**Headers:** `{ Authorization: 'Bearer token' }`
**Body:**

```json
{
  "instructorId": "12345",
  "date": "2025-03-22",
  "time": "10:00 AM"
}
```

**Response:**

```json
{
  "message": "Booking created successfully"
}
```

#### Get Learner's Bookings

```http
GET /api/bookings/my
```

**Headers:** `{ Authorization: 'Bearer token' }`
**Response:**

```json
[
  {
    "_id": "bookingId123",
    "instructor": { "name": "John Doe", "email": "john@example.com" },
    "date": "2025-03-22",
    "time": "10:00 AM"
  }
]
```

### 4️⃣ Admin Management

#### Get Pending Instructors

```http
GET /api/admin/pending-instructors
```

**Response:**

```json
[
  {
    "_id": "12345",
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
]
```

#### Approve Instructor

```http
PUT /api/admin/approve/:id
```

**Headers:** `{ Authorization: 'Bearer token' }`
**Response:**

```json
{
  "message": "Instructor approved"
}
```

## Models

- **User**: Handles user authentication, roles, and instructor/learner info
- **InstructorProfile**: Stores instructor details, vehicle, slots, ratings
- **InstructorTempRequests**: Temporary storage for instructor approval
- **Booking**: Booking information (learner, instructor, date, time, status)

## Routes & Controllers

- **authRoutes.js** / **authController.js**: User registration & login
- **instructorRoutes.js** / **instructorController.js**: Instructor management
- **bookingRoutes.js** / **bookingController.js**: Booking management
- **adminRoutes.js** / **adminController.js**: Admin actions (approve/reject)
- **otpVerificationRoutes.js** / **otpController.js**: OTP and password reset

## Getting Started

1. Install dependencies:
   ```powershell
   npm install
   ```
2. Set up your `.env` file with MongoDB URI and email credentials.
3. Start the server:
   ```powershell
   npm start
   ```

---

This backend provides a robust system for managing instructors, learners, bookings, and admin functionalities.

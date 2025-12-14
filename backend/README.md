# 1947 Truly Indian - Backend API

Backend API for the 1947 Truly Indian Restaurant website.

## 🚀 Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Sequelize** - ORM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **express-rate-limit** - Rate limiting
- **nodemailer** - Email sending

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   └── authController.js    # Authentication controllers
├── middleware/
│   ├── auth.js              # JWT authentication middleware
│   ├── errorHandler.js      # Global error handler
│   └── rateLimiter.js       # Rate limiting middleware
├── models/
│   └── User.js              # User model
├── routes/
│   └── authRoutes.js        # Authentication routes
├── utils/
│   ├── generateToken.js     # JWT token generation
│   └── sendEmail.js         # Email utility functions
├── .env.example             # Environment variables template
├── package.json             # Dependencies
├── server.js                # Application entry point
└── README.md                # This file
```

## 🛠️ Setup Instructions

### 1. Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE 1947_indian_restaurant;
```

2. Create a user (optional):
```sql
CREATE USER your_db_user WITH PASSWORD 'your_db_password';
GRANT ALL PRIVILEGES ON DATABASE 1947_indian_restaurant TO your_db_user;
```

### 4. Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update `.env` with your configuration:
```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=1947_indian_restaurant
DB_USER=your_db_user
DB_PASSWORD=your_db_password

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

FRONTEND_URL=https://narahari2364.github.io

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@1947indianrestaurant.com

APP_URL=http://localhost:5000
```

**Important Notes:**
- Change `JWT_SECRET` to a strong random string in production
- For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password
- Update `FRONTEND_URL` to match your deployed frontend URL

### 5. Run the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "1234567890",
  "address": "123 Main St, City, State"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully. Please check your email to verify your account.",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "phone": "1234567890",
      "address": "123 Main St, City, State",
      "isEmailVerified": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

#### 2. Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "isEmailVerified": true
    },
    "token": "jwt_token_here"
  }
}
```

#### 3. Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "If an account with that email exists, a password reset link has been sent."
}
```

#### 4. Reset Password
```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset_token_from_email",
  "password": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successful. You can now login with your new password."
}
```

#### 5. Verify Email
```http
GET /api/auth/verify-email?token=verification_token_from_email
```

**Response:**
```json
{
  "success": true,
  "message": "Email verified successfully. You can now login."
}
```

#### 6. Get Profile (Protected)
```http
GET /api/auth/profile
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "phone": "1234567890",
      "address": "123 Main St, City, State",
      "isEmailVerified": true
    }
  }
}
```

#### 7. Update Profile (Protected)
```http
PUT /api/auth/profile
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "phone": "9876543210",
  "address": "456 Oak Ave, City, State"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "Jane",
      "lastName": "Smith",
      "phone": "9876543210",
      "address": "456 Oak Ave, City, State"
    }
  }
}
```

### Health Check

```http
GET /health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🔒 Security Features

1. **Password Hashing**: All passwords are hashed using bcryptjs
2. **JWT Authentication**: Secure token-based authentication
3. **Input Validation**: All inputs are validated using express-validator
4. **Rate Limiting**: Prevents brute force attacks
   - Auth routes: 5 requests per 15 minutes
   - General API: 100 requests per 15 minutes
5. **CORS**: Configured to allow requests only from your frontend
6. **Error Handling**: Comprehensive error handling without exposing sensitive information

## 🧪 Testing the API

You can use tools like:
- **Postman**
- **Thunder Client** (VS Code extension)
- **curl** commands
- **Frontend application**

### Example curl commands:

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Get Profile (with token):**
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🚀 Deployment

### Environment Variables for Production

Make sure to update these in your production environment:
- `NODE_ENV=production`
- `JWT_SECRET` - Use a strong, random secret
- `DB_HOST`, `DB_USER`, `DB_PASSWORD` - Production database credentials
- `FRONTEND_URL` - Your production frontend URL
- `APP_URL` - Your production backend URL
- Email configuration for production

### Recommended Hosting Platforms

- **Heroku**
- **Railway**
- **Render**
- **AWS**
- **DigitalOcean**
- **Vercel** (for serverless)

## 📝 Notes

- Email verification is required before users can login
- Password reset tokens expire after 1 hour
- JWT tokens expire after 7 days (configurable)
- All passwords must be at least 6 characters long
- Email addresses are automatically converted to lowercase

## 🐛 Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure database exists

### Email Not Sending
- Verify email credentials in `.env`
- For Gmail, use App Password instead of regular password
- Check spam folder

### CORS Errors
- Verify `FRONTEND_URL` in `.env` matches your frontend URL
- Check browser console for specific CORS errors

## 📄 License

ISC


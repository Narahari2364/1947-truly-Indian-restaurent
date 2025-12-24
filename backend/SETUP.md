# Quick Setup Guide

## Step 1: Install Dependencies

```bash
cd backend
npm install
```

## Step 2: Create PostgreSQL Database

```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE 1947_indian_restaurant;

-- (Optional) Create user
CREATE USER restaurant_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE 1947_indian_restaurant TO restaurant_user;
```

## Step 3: Create .env File

Create a `.env` file in the `backend` directory with the following content:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=1947_indian_restaurant
DB_USER=restaurant_user
DB_PASSWORD=your_secure_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=https://narahari2364.github.io

# Email Configuration (for password reset and verification)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_FROM=noreply@1947indianrestaurant.com

# Application URL
APP_URL=http://localhost:5000
```

### Important Notes:

1. **JWT_SECRET**: Generate a strong random string:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Gmail App Password**: 
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate an app password for "Mail"
   - Use this password in `EMAIL_PASSWORD`

3. **Database Credentials**: Use the credentials you created in Step 2

## Step 4: Run the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## Step 5: Test the API

### Health Check
```bash
curl http://localhost:5000/health
```

### Register a User
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

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Troubleshooting

### Database Connection Error
- Make sure PostgreSQL is running: `pg_isready`
- Check database credentials in `.env`
- Verify database exists: `psql -l`

### Port Already in Use
- Change `PORT` in `.env` to a different port (e.g., 5001)
- Or kill the process using port 5000

### Email Not Sending
- Verify Gmail app password is correct
- Check spam folder
- For testing, you can skip email verification temporarily

## Next Steps

1. Integrate the API with your frontend
2. Update frontend to use the API endpoints
3. Deploy backend to a hosting platform
4. Update CORS settings for production


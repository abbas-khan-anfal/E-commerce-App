# MERN Stack E-commerce App

This is an e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js), designed to practice production-grade application development. Though not intended for deployment, this project follows best practices for structuring, scaling, and maintaining a full-stack application, offering a comprehensive look into how production-ready e-commerce applications are built.

## Key Features
- **Authentication**: Secure user login and registration system.
- **Stunning Dashboard**: An intuitive admin dashboard for managing products, orders, users, and settings seamlessly.
- **Stripe Payment Integration**: Secure and seamless payment processing with Stripe.
- **CRUD Operations**: Full Create, Read, Update, and Delete functionality for managing products and orders.
- **Product Management**: Comprehensive tools for managing inventory and product details.
- **Delivery Management**: Tracking and managing order deliveries.
- **Cloudinary Integration**: Efficiently stores and manages media files in the cloud, providing scalable online file storage.

## Getting Started
To test this application on your machine, follow these steps:

### Prerequisites
**Tools Required**:
- VS Code for code editing.
- Node.js and npm for package management.
- MongoDB GUI (optional) for visual database management.

### 1. Set Up Environment Variables
In the root directory, create a `.env` file with the following details:
```
PORT=4000
JWT_SECRET=your_secret_key
MONGODB_URI=mongodb://localhost:27017/ecommerce
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:4000

# Cloudinary keys
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_cloud_api_key
CLOUD_API_SECRET=your_cloud_api_secret
```
**Note**: Replace `your_secret_key`, `your_stripe_secret_key`, `your_cloud_name`, `your_cloud_api_key`, and `your_cloud_api_secret` with your actual credentials.

### 2. Install Dependencies
Navigate to the backend folder and run:
```bash
npm install
```

### 3. Running the Application
Start the backend server:
```bash
npm run dev
```
Start the frontend server:
```bash
npm start
```

### 4. Access the Application
- **Frontend URL (for users)**: `http://localhost:3000`
- **Backend Admin URL**: `http://localhost:4000/admin`

### 5. Testing the Application and Admin Dashboard
To fully access and use the application, including the admin dashboard, ensure the following steps are completed:

#### Database Setup:
- Create the required databases in MongoDB using either the MongoDB Desktop GUI or an online service like MongoDB Atlas. This setup is essential for the application to function properly.
- Set up a collection for the following data type:
  - **Admin Database**: For storing admin user information.

#### Admin User Creation:
- Add admin entries to the database for accessing the dashboard. Since passwords are stored in encrypted form, adding a plain text password directly in the database will not allow access.
- To resolve this, you need to either:
  - **Manually encrypt the password** before saving it in the database.
  - **Use the application's registration route** for admin creation, which will handle password encryption automatically.

By completing these steps, the application will be fully functional, with all components, including the admin dashboard, ready for use.

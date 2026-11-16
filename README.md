# E-commerce App

## Note:
This project might not work as expected, because of limited vercel memory and other vercel related issues, but will work fine on premium plan. And you can also clone the repository in your computer and test it.

## About This Project:

A comprehensive web application for managing an online store, featuring CRUD operations, user authentication, a powerful admin dashboard, cloud file uploading with Cloudinary, and integrated payment processing using Stripe. This app includes cart and order management, making it a complete solution for online retail.

## Features

- **User Authentication**: Secure user registration and login.
- **Product Management**: 
  - **Create**: Add new products.
  - **Read**: View product listings.
  - **Update**: Edit product details.
  - **Delete**: Remove products.
- **Order Management**: Manage customer orders effectively.
- **Cart Management**: Add to and manage the shopping cart.
- **File Uploading**: Upload product images to Cloudinary.
- **Payment Integration**: Process payments securely using Stripe.
- **Admin Dashboard**: Access a dedicated dashboard for managing the store, accessible at `https://e-commerce-frontend-five-mauve.vercel.app/admin`.
- **Also to access admin dashboard use these credentials :
- **Email : admin@gmail.com
- **Password : admin123

## Project Structure

- **Frontend**: Located in the `frontend` folder, built with React.
- **Backend**: Located in the `backend` folder, built with Node.js and Express.

## Requirements

- Node.js
- Visual Studio Code

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory**:
   ```bash
   cd your-ecommerce-app
   ```

3. **Install dependencies**:

   - **Frontend**:
     ```bash
     cd frontend
     npm install
     ```

   - **Backend**:
     ```bash
     cd backend
     npm install
     ```

## Running the Application

1. **Start the frontend**:
   ```bash
   cd frontend
   npm start
   ```

2. **Start the backend**:
   ```bash
   cd backend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to explore the app.

## Accessing the Admin Dashboard

- The admin dashboard is accessible at `http://localhost:3000/admin`.
- Use the following credentials to log in:
  - **Email**: `admin@gmail.com`
  - **Password**: `admin123`

## Environment Variables

Ensure the following environment variables are set in the `backend/.env` file:

```
PORT = 4000
JWT_SECRET = LF2394895KKELFJELFL3UIO0
STRIPE_SECRET_KEY = sk_.........
FRONTEND_URL = http://localhost:3000
BACKEND_URL = http://localhost:4000

# Cloudinary keys
CLOUD_NAME = cloudinary_cloud_name
CLOUD_API_KEY = cloudinary_api_key
CLOUD_API_SECRET = cloudinary_api_secret
```

## Notes

- **Cloud File Uploading**: Product images are uploaded and managed via Cloudinary.
- **Secure Payment**: Stripe handles payment processing, ensuring secure transactions.
- **Practice Application**: This project is suitable for learning and experimentation but can be scaled for production use with enhancements.

## Contribution

Contributions are welcome! Feel free to fork the repository and submit pull requests for improvements.

## License

This project is licensed under the MIT License.

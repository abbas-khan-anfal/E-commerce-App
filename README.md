# E-commerce App

## Note:
This project might not work as expected, because of limited vercel memory and other vercel related issue, but will work fine on premium plan.And you can also close the repository in your computer and test it.

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
- **Admin Dashboard**: Access a dedicated dashboard for managing the store, accessible at `http://localhost:3000/admin`.

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
JWT_SECRET = LF2394895KKELFJELFLEJF99
STRIPE_SECRET_KEY = sk_test_51P8jfEHEvJKDoBQRByiiftmiD5xaMVRl5Iu9ncKqJsU9TtsZDSpiG5a1sGbdJWtUofq11V2ZPwISwqIm6KYtd3nj00PPrvntfP
FRONTEND_URL = http://localhost:3000
BACKEND_URL = http://localhost:4000

# Cloudinary keys
CLOUD_NAME = dll3nwi5k
CLOUD_API_KEY = 439685841895313
CLOUD_API_SECRET = -zpNTYKD75IK9WXPbg72tC83D30
```

## Notes

- **Cloud File Uploading**: Product images are uploaded and managed via Cloudinary.
- **Secure Payment**: Stripe handles payment processing, ensuring secure transactions.
- **Practice Application**: This project is suitable for learning and experimentation but can be scaled for production use with enhancements.

## Contribution

Contributions are welcome! Feel free to fork the repository and submit pull requests for improvements.

## License

This project is licensed under the MIT License.

# Password Reset Application - Documentation

## Overview

This documentation outlines the backend and frontend endpoints for the **Password Reset Application**, designed to manage user registration, authentication, password recovery, and password reset functionalities.

---

## Backend Endpoints

Base URL: `https://password-reset-node-imnq.onrender.com/api/v1/auth`

1. **Register**  
   Endpoint: `/register`  
   - **Method**: POST  
   - **Description**: Endpoint for user registration.

2. **Login**  
   Endpoint: `/login`  
   - **Method**: POST  
   - **Description**: Endpoint for user authentication.

3. **Forgot Password**  
   Endpoint: `/forgot-password`  
   - **Method**: POST  
   - **Description**: Endpoint for generating a password reset token.

4. **Reset Password**  
   Endpoint: `/reset-password`  
   - **Method**: POST  
   - **Description**: Endpoint for resetting the user password using a token.

---

## Frontend Endpoints

Base URL: `https://passwordresetfelink.netlify.app`

1. **Register**  
   Endpoint: `/register`  
   - **Description**: Page for user registration.

2. **Login**  
   Endpoint: `/login`  
   - **Description**: Page for user authentication.

3. **Forgot Password**  
   Endpoint: `/forgot_password`  
   - **Description**: Page for requesting a password reset token.

4. **Reset Password**  
   Endpoint: `/reset_password`  
   - **Description**: Page for resetting the password using a token.

---

## Notes

- Ensure the backend and frontend URLs are correctly configured in your application.
- For any CORS issues, verify that the backend's `Access-Control-Allow-Origin` header is correctly set to the frontend URL:  
  `https://passwordresetfelink.netlify.app`.

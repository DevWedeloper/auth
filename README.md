# Auth

An identity provider I made that uses refresh/access token system.  

## Overview

The identity provider utilizes JSON Web Tokens (JWT) for authentication and implements a refresh/access token system for secure user authentication. To enhance security, the system employs refresh token rotation, which periodically rotates refresh tokens to mitigate the risk of token misuse or compromise. Additionally, breach detection mechanisms are in place to monitor and identify suspicious activities, such as refresh token reuse. These features collectively ensure robust authentication and protection against unauthorized access.

## Endpoints

### Users

#### Create User

- **URL**: `/user`
- **Method**: POST
- **Description**: This endpoint allows users to create a new account. This action requires email verification.

#### Get All Users

- **URL**: `/user`
- **Method**: GET
- **Description**: This endpoint retrieves a list of all users.

#### Check Email Uniqueness

- **URL**: `/user/unique/email/:email`
- **Method**: GET
- **Description**: This endpoint checks if the provided email is unique.

#### Check Username Uniqueness

- **URL**: `/user/unique/username/:username`
- **Method**: GET
- **Description**: This endpoint checks if the provided username is unique.

#### Update Email

- **URL**: `/user/updateEmail`
- **Method**: PUT
- **Description**: This endpoint allows users to update their email address. This action requires email verification.

#### Update Password

- **URL**: `/user/updatePassword`
- **Method**: PUT
- **Description**: This endpoint allows users to update their password.

#### Update Username

- **URL**: `/user/updateUsername`
- **Method**: PUT
- **Description**: This endpoint allows users to update their username. This action does require email verification.

#### Delete User

- **URL**: `/user/deleteUser`
- **Method**: DELETE
- **Description**: This endpoint allows users to delete their account.

#### Forgot Password

- **URL**: `/user/forgotPassword`
- **Method**: POST
- **Description**: This endpoint is used for initiating the password reset process.

#### Reset Password

- **URL**: `/user/resetPassword`
- **Method**: POST
- **Description**: This endpoint is used for resetting the user's password.

#### Check Reset Password Token

- **URL**: `/user/checkResetPasswordToken/:token`
- **Method**: GET
- **Description**: This endpoint checks the validity of the reset password token.

#### Get User by ID

- **URL**: `/user/:id`
- **Method**: GET
- **Description**: This endpoint retrieves user information by ID.

### Authentication

#### Login

- **URL**: `/login`
- **Method**: POST
- **Description**: This endpoint is used for user login.

#### Logout

- **URL**: `/logout`
- **Method**: POST
- **Description**: This endpoint is used for user logout.

#### Refresh Access Token

- **URL**: `/refresh`
- **Method**: POST
- **Description**: This endpoint is used to refresh the access token.

#### Check If User Is Logged In

- **URL**: `/isLoggedIn`
- **Method**: GET
- **Description**: This endpoint checks if the user is logged in.

#### Get User Role

- **URL**: `/getRole`
- **Method**: GET
- **Description**: This endpoint retrieves the role of the user.

#### Google OAuth Handler

- **URL**: `/sessions/oauth/google`
- **Method**: POST
- **Description**: This endpoint handles OAuth authentication with Google.

#### Get Auto-Logout Time

- **URL**: `/autoLogoutAt`
- **Method**: GET
- **Description**: This endpoint retrieves the time of auto-logout for the user.

#### Request Email Verification Code for Logged-In User

- **URL**: `/requestCode/loggedInUser`
- **Method**: POST
- **Description**: This endpoint is used to request an email verification code for the logged-in user.

#### Request Email Verification Code for New Email

- **URL**: `/requestCode/newEmail`
- **Method**: POST
- **Description**: This endpoint is used to request an email verification code for a new email address.
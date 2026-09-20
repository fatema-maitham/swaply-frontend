![Swaply Banner](./image/SwaplyBanner.png)

# Swaply

Swaply is a full-stack MERN skill-sharing platform where users can exchange skills with each other instead of paying for lessons or services.

Users can discover skills they want to learn, offer skills they can teach, connect with other users, send and manage skill swap requests, and review other users after completing a swap.

The platform also includes an admin side for managing users, skills, swap requests, and reviews.

## Background

Swaply was created to make learning more accessible by allowing people to exchange knowledge and skills with each other.

Instead of using money, users can teach something they know in exchange for learning something they want to improve.

For example, a user who can teach Photography can exchange their skill with another user who can teach JavaScript.

## Features

- User registration and login
- JWT authentication
- User profiles
- Create and manage skills
- Browse available skills
- Search for skills
- Filter skills by category
- View skill details
- Send skill swap requests
- Manage incoming and outgoing swap requests
- Accept, reject, cancel, and complete swaps
- Leave reviews after completing swaps
- View, edit, and delete reviews
- Admin dashboard
- Admin management of users, skills, swaps, and reviews
- Responsive and user-friendly interface

## User Stories

### Guest User Stories

- As a guest, I can view the home page explaining how skill swap works.
- As a guest, I can browse available skills.
- As a guest, I can search for skills.
- As a guest, I can filter skills by category.
- As a guest, I can view the details of a specific skill.
- As a guest, I can view other users' profiles.
- As a guest, I can sign up for an account.
- As a guest, I can log in to my account.

### General User Stories

- As a user, I can log in to my account.
- As a user, I can log out of my account.
- As a user, I can view and edit my profile.
- As a user, I can add a skill that I can teach.
- As a user, I can view available skills.
- As a user, I can search for skills I want to learn.
- As a user, I can filter skills by category.
- As a user, I can view the details of a skill.
- As a user, I can edit my own skills.
- As a user, I can delete my own skills.
- As a user, I can send a skill swap request to another user.
- As a user, I can view my swap requests.
- As a user, I can view the details of a swap.
- As a user, I can accept a swap request.
- As a user, I can reject a swap request.
- As a user, I can cancel a swap request.
- As a user, I can mark a swap as completed.
- As a user, I can leave a review after completing a swap.
- As a user, I can view reviews.
- As a user, I can edit my own review.
- As a user, I can delete my own review.

### Admin User Stories

- As an admin, I can access an admin dashboard.
- As an admin, I can view platform statistics.
- As an admin, I can view all users.
- As an admin, I can delete a user account.
- As an admin, I can view all skills.
- As an admin, I can delete an inappropriate skill.
- As an admin, I can view all swap requests.
- As an admin, I can view all reviews.
- As an admin, I can delete an inappropriate review.

## Planning Materials

### Trello Board

[Swaply Trello Board](https://trello.com/invite/b/6aa2a461a9e94d4fab436ab8/ATTI633568baa47f25f4ff4b77b4650889c62984E480/swaply)

### Wireframes

![Swaply Wireframes](./image/wireframes.png)

### Component Hierarchy Diagram

![Swaply Component Hierarchy Diagram](./image/component-hierarchy.png)

## Frontend

The frontend is built with React and provides the user interface for interacting with the Swaply platform.

The application uses reusable React components, React Context for managing authentication state, and React Router for navigation between pages.

The frontend communicates with the backend API to create, retrieve, update, and delete application data.

## Authentication

Swaply uses JWT-based authentication to protect user accounts and application features.

- Users can sign up and sign in.
- Authentication state is managed on the frontend.
- Protected features require the user to be signed in.
- Admin features are restricted to users with an admin role.
- Users can log out from the application.

## API Integration

The frontend communicates with the Swaply backend through RESTful API endpoints.

The API is used to manage:

- Authentication
- User profiles
- Skills
- Skill swap requests
- Reviews
- Admin data

The backend handles authentication, authorization, database operations, and data validation.

## Technologies Used

### Frontend

- React
- JavaScript
- CSS
- React Router
- React Context API
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Cloudinary

## Getting Started

### Prerequisites

- Node.js and npm installed
- Git installed
- Swaply backend API running locally or deployed online

### Installation

Clone the repository:

```bash
git clone https://github.com/fatema-maitham/swaply-frontend.git
```

Navigate into the project folder:

```bash
cd swaply-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at the local URL provided by Vite.

### Build for Production

To create a production build:

```bash
npm run build
```

## Backend Repository

[Swaply Backend Repository](https://github.com/fatema-maitham/swaply-backend.git)

## Deployed Website

[Swaply](https://swaply-frontend-ten.vercel.app/)

## Attributions

- General Assembly course materials and starter code
- React documentation
- React Router documentation
- Vite documentation

## Future Enhancements

- Skill matching and recommendations
- Skill availability scheduling
- User skill badges
- Advanced skill discovery
- Saved skills
- User reputation system
- Notifications for swap requests
- In-app messaging
- Calendar integration

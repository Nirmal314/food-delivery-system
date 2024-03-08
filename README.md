This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, Install the dependencies:

```bash
npm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# EatEase Food Delivery System

The EatEase Food Delivery System is a cutting-edge web application designed for enhancing online food ordering experience. Built on Next.js 14, with Tailwind CSS and Shadcn powering the frontend, and Next.js's server actions driving the backend, this project provides a sophisticated yet intuitive solution for both customers and restaurant owners. By leveraging PostgreSQL with Prisma ORM for the database, it ensures a seamless and efficient operation.

## Features

- **Intuitive User Interface:** Crafted using Next.js and Tailwind CSS, the UI offers a smooth and seamless browsing experience for customers.
- **Efficient Backend Management:** Restaurant owners have access to a robust backend system, enabling them to manage menus, track orders, and monitor delivery performance with ease.
- **Seamless Payment Integration:** Secure payment processing ensures hassle-free transactions for both customers and businesses.
- **Flexibility and Scalability:** With adaptable architecture, the system can scale to meet the evolving needs of businesses and customers alike.

## Technologies Used

> **Frontend**

- Next.js 14
- Tailwind CSS
- Shadcn

> **Backend**

- Next.js's server actions

> **Database**

- PostgreSQL with Prisma ORM

## Authentication

> **It supports two authentication methods**

1. **Google Authentication:**
2. **Credentials Authentication:**

The `auth.config.ts` file contains the configuration for these authentication providers.

## Data Access and Persistence

The application utilizes PostgreSQL as the database management system and Prisma ORM for interacting with the database. The db.ts file in the lib directory sets up the Prisma instance, and the data/user.ts file contains functions for fetching and manipulating user data.

## Middleware

The middleware.ts file handles authentication middleware for the application. It checks if a user is logged in, redirects unauthenticated users to the login page for protected routes, and allows access to public routes without authentication. The **apiAuthPrefix**, **authRoutes**, **publicRoutes**, and **DEFAULT_LOGIN_REDIRECT** constants are imported from the `routes.ts`

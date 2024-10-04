# Dev Connect

Dev Connect is a platform designed to connect developers from around the world, allowing them to share ideas, collaborate on projects, and push the boundaries of innovation. Built using the T3 Stack, this application leverages modern technologies to provide a seamless user experience.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
- [Deployment](#deployment)

## Technologies Used

This project is built using the following technologies:

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Features

- User authentication with GitHub
- Create, edit, and manage projects
- Filter projects by name or tech stack
- View project details including README and tech stack
- Responsive design for mobile and desktop

## Getting Started

To get started with Dev Connect, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/dev-connect.git
   cd dev-connect
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:

   - Create a `.env` file in the root directory and add your environment variables. You can refer to the `.env.example` file for the required variables.

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Deployment

For deployment, you can follow the guides for:

- [Railway](https://railway.app/)

## To-do

- [ ] Add project image
- [ ] Filter projects by name and/or TechStack
- [x] Edit Project

## Bugs

- [ ] Fix the issue where users can modify projects that aren't theirs

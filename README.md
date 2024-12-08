# Tailorizor: Tailored Resumes, Effortlessly

## Project Overview

**Tailorizor** is an innovative web application designed to help users craft resumes tailored to specific job descriptions. Built with modern web technologies like **Next.js**, **Tailwind CSS**, **MongoDB**, and **Google APIs**, Tailorizor offers a seamless experience for generating professional, targeted resumes. Secure Google-based authentication ensures user data safety while providing a smooth login experience.

---

## Features

- **Google Authentication**: Secure and easy login using Google Auth.
- **Job Description Analyzer**: Extracts key skills and requirements from job descriptions.
- **Custom Resume Generator**: Creates personalized resumes tailored to job-specific insights.
- **Template Management**: Save and reuse resume template.
- **Responsive Design**: Modern and intuitive UI built with Tailwind CSS.
- **MongoDB Storage**: Efficient storage for user resumes and templates.

---

## Technologies Used

- **Next.js**: Framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for responsive designs.
- **MongoDB**: NoSQL database for secure and scalable data management.
- **Google APIs**: For secure authentication and integrations.
- **Together AI**: For getting the resume based on job description

---

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Google API credentials for OAuth
- env variables for google auth, together ai BACKEND_URL="https://tailorizor-backend.up.railway.app"

### Steps

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/yourusername/tailorizor.git
   cd tailorizor
2. **Install Dependencies**
        ``` npm install  or yarn ```
3. **Set Environmental Variables**
        ``` GOOGLE_CLIENT_ID=your-google-client-id
            GOOGLE_CLIENT_SECRET=your-google-client-secret
            MONGODB_URI=your-mongodb-connection-string
            NEXTAUTH_SECRET=your-next-auth-secret
            AI_KEY=your-google-ai-api-key
4. **Run the Development Server**
        ```npm run dev || yarn dev



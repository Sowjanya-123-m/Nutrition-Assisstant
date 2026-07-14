# 🥦🍎 Nutrition Assistant

Nutrition Assistant is a production-ready, AI-powered full-stack web application developed using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. The application helps users generate personalized nutrition and diet plans based on their age, height, weight, BMI, activity level, and health goals.

The system follows the **MVC (Model-View-Controller)** architecture and integrates **Google Gemini AI** to generate intelligent nutrition recommendations. It provides secure authentication, role-based access, responsive design, and real-time personalized diet suggestions.

---

# 📌 Project Overview

The Nutrition Assistant enables users to:

- Register and Login securely
- Calculate BMI automatically
- Generate personalized diet plans
- Receive AI-powered nutrition suggestions
- Track nutrition history
- View previous diet recommendations
- Manage user profile
- Access Admin Dashboard
- Store all data securely in MongoDB

---

# 🚀 Technologies Used

## Frontend

- React.js (Vite)
- React Router DOM
- Axios
- Bootstrap 5
- Tailwind CSS
- CSS3

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- dotenv
- cors



## Development Tools

- VS Code
- Git
- GitHub
- Postman
- MongoDB Atlas

---

# ✨ Key Features

## User Features

- User Registration
- User Login
- JWT Authentication
- Update Profile
- Create Personalized Diet Plan
- BMI Calculation
- Calorie Recommendation
- Protein Recommendation
- Carbohydrate Recommendation
- Meal Timing Recommendation
- Walking Recommendation
- Healthy Food Suggestions
- Nutrition History
- AI Nutrition Chatbot (NutriBot)

---

## Admin Features

- Admin Login
- View All Users
- View All Suggestions
- Delete Suggestions
- Manage Users
- Monitor User Activities

---

## AI Features

- Google Gemini AI Integration
- Personalized Nutrition Suggestions
- AI Chatbot
- Deterministic Fallback Logic
- Intelligent Meal Planning

---

# 🏗 Project Architecture

The project follows the **MVC (Model-View-Controller)** Architecture.

```
Presentation Layer
│
├── React Frontend
│
Business Layer
│
├── Controllers
├── Authentication
├── Nutrition Logic
│
Data Layer
│
├── MongoDB
└── Mongoose Models
```

---

# 📂 Backend Folder Structure

```
server/

controllers/
│
├── userController.js
└── suggestionController.js

db/
│
└── config.js

middlewares/
│
└── authMiddleware.js

models/
│
├── User.js
└── Suggestion.js

routes/
│
├── userRoute.js
└── suggestionRoute.js

utils/
│
└── suggestNutrition.js

server.js

.env
```

---

# 📂 Frontend Folder Structure

```
client/

src/

assets/

components/
│
├── Home.jsx
└── LNavbar.jsx

pages/
│
├── LandingPage.jsx
├── Login.jsx
├── Register.jsx

Plans/
│
├── NewPlan.jsx
├── NewSuggestion.jsx
└── SuggestedNutrition.jsx

User/
│
├── UserData.jsx
└── UnavBar.jsx

App.jsx
App.css
main.jsx
index.css
```

---

# 👥 User Roles

## User

- Register
- Login
- Update Profile
- Create Diet Plan
- View Suggestions
- Track Nutrition History

---

## Admin

- Login
- View Users
- View Suggestions
- Delete Suggestions
- Manage Users

---

# 🗄 Database Collections

## User Collection

- name
- email
- password
- age
- gender
- height
- weight
- activityLevel
- role
- createdAt

---

## Suggestion Collection

- userId
- userName
- age
- height
- weight
- bmi
- suggestion
- foods[]
- timing
- walk
- calorieIntake
- carbohydrateNeeds
- proteinNeeds
- weightGain
- date

---

# 🔄 User Flow

```
Landing Page

↓

Register / Login

↓

Dashboard

↓

Create Nutrition Plan

↓

Generate AI Suggestion

↓

Store in MongoDB

↓

Display Nutrition Suggestion

↓

Admin Dashboard
```

---

# 🔗 Entity Relationship

```
One User

↓

Many Suggestions

Suggestion references User using ObjectId.
```

---

# 📡 REST API Endpoints

## Authentication

POST

```
/api/users/register
```

POST

```
/api/users/login
```

GET

```
/api/users/profile
```

PUT

```
/api/users/profile
```

---

## Nutrition APIs

POST

```
/api/suggestions/create
```

GET

```
/api/suggestions/user/:id
```

GET

```
/api/suggestions/all
```

DELETE

```
/api/suggestions/:id
```

---

# 🧠 Nutrition Recommendation Logic

The application automatically calculates:

- BMI
- Basal Metabolic Rate (BMR)
- Daily Calories
- Protein Requirement
- Carbohydrate Requirement
- Healthy Foods
- Meal Timing
- Walking Recommendation
- Weight Goal Recommendation

---

# 🔐 Security Features

- JWT Authentication
- Password Hashing using bcryptjs
- Protected Routes
- Environment Variables
- Input Validation
- Error Handling
- Role-Based Authorization

---

# 🎨 User Interface

The application includes:

- Landing Page
- Register Page
- Login Page
- Home Dashboard
- Create Diet Plan
- Suggested Nutrition
- User Profile
- Admin Dashboard

---

# 📱 UI Design

- Responsive Design
- Bootstrap Components
- Tailwind CSS
- Cards
- Navbar
- Forms
- Tables
- Alerts
- Toast Notifications
- Loading Spinner

---

# ⚙️ Environment Configuration

Create a **.env** file.

```env
PORT=3000

JWT_SECRET=YourSecretKey

MONGODB_URI=YourMongoDBAtlasConnectionString

GEMINI_API_KEY=YourGoogleGeminiApiKey
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/yourusername/NutritionAssistant.git
```

Install dependencies

```bash
npm install
```

Frontend

```bash
cd client

npm install

npm run dev
```

Backend

```bash
cd server

npm install

npm start
```

---

# 📮 Postman APIs

The project includes a complete Postman Collection for testing:

- User Registration
- User Login
- Profile APIs
- Nutrition Suggestion APIs
- Admin APIs
- AI Chat APIs

---

# 🤖 AI Integration

The application integrates **Google Gemini AI** for:

- Personalized Diet Planning
- Meal Suggestions
- Nutrition Counseling
- Smart Chatbot (NutriBot)
- AI-powered Health Recommendations

If Gemini API is unavailable, the application automatically switches to a deterministic recommendation engine.

---

# 🌐 Deployment

The application is designed to be deployed on cloud platforms.

Supported deployment options:

- Vercel (Frontend)
- Render (Backend)
- Railway
- MongoDB Atlas
- Netlify
- AWS
- Azure
- Google Cloud Platform

The application is fully dynamic and accessible from any laptop, desktop, tablet, or mobile device through the deployed public URL.

---

# 📷 Project Screens

- Landing Page
- Register Page
- Login Page
- Home Dashboard
- Create Diet Plan
- Suggested Nutrition
- Admin Dashboard

---

# 👨‍💻 Team Members

- *Vikas Aakula*
- *Deva Raju P*
- *Mulamuri Sowjanya*
- *Moravaneni Ramya*
- *Rajigari Tejasree*

---

# 📄 License

This project was developed for academic and educational purposes as a Full Stack MERN application demonstrating modern web development, AI integration, secure authentication, and cloud-based deployment.

---

#Thank You

**Nutrition Assistant**

AI-Powered Personalized Nutrition & Diet Recommendation System built with the MERN Stack and Google Gemini AI.

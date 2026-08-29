# LifeLink 🩸

**LifeLink** is a full-stack blood donation and emergency blood-request platform designed to connect people who need blood with compatible donors.

The application provides separate experiences for **donors** and **recipients**, allowing users to register, manage profiles, search for donors, create blood requests, respond to requests, and manage donation/request status through dedicated dashboards.

## ✨ Features

### For Recipients
- Create an account as a blood recipient.
- Create blood requests with:
  - Blood group
  - Required units
  - Hospital
  - Location
  - Urgency
  - Additional message
- View personal blood requests and their current status.
- Find donors matching a blood request.
- View donor profiles.
- Track donation responses.

### For Donors
- Register and maintain a donor profile.
- Provide donor information such as blood group, age, gender, weight, city, and address.
- Set donor availability.
- Search for available donors.
- View blood requests relevant to donors.
- Respond to blood requests.
- Accept or reject requests through the donor dashboard.

### Platform
- JWT-based authentication.
- Password hashing with `bcryptjs`.
- Role-based donor/recipient workflows.
- MongoDB persistence through Mongoose.
- Protected API routes using authentication middleware.
- CORS configuration for frontend/backend communication.
- Responsive React user interface.
- Contact form endpoint for user enquiries.

---

## 🛠️ Tech Stack

### Frontend
- **React 18**
- **React Router**
- **Axios**
- **Lucide React**
- **React Icons**
- **CSS3**
- **Create React App**

### Backend
- **Node.js**
- **Express 5**
- **MongoDB**
- **Mongoose**
- **JSON Web Token (JWT)**
- **bcryptjs**
- **cookie-parser**
- **CORS**
- **dotenv**

---

## 📁 Project Structure

```text
LifeLink/
├── client/
│   ├── public/
│   │   ├── AI Eraser_image.png
│   │   ├── CallToAction image.jpg
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── BloodGroups.jsx
│   │   │   ├── DonorDashboard.jsx
│   │   │   ├── Emergencybanner.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Stats.jsx
│   │   │   └── Testimonials.jsx
│   │   │
│   │   ├── About.jsx
│   │   ├── ContactPage.jsx
│   │   ├── DonorDashboard.jsx
│   │   ├── DonorProfile.jsx
│   │   ├── DonorProfileCard.jsx
│   │   ├── FindDonor.jsx
│   │   ├── Home.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── RecipientDashboard.jsx
│   │   ├── RequestBlood.jsx
│   │   ├── RequestCard.jsx
│   │   ├── App.jsx
│   │   └── index.js
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bloodRequestController.js
│   │   ├── contactController.js
│   │   ├── donationController.js
│   │   ├── donorController.js
│   │   ├── donorDashboardController.js
│   │   └── requestController.js
│   │
│   ├── middleware/
│   │   └── authmiddleware.js
│   │
│   ├── models/
│   │   ├── BloodRequest.js
│   │   ├── Contact.js
│   │   ├── DonationResponse.js
│   │   ├── User.js
│   │   └── donorDashboardBloodRequest.js
│   │
│   ├── routes/
│   │   ├── authRoute.js
│   │   ├── bloodRequestRoutes.js
│   │   ├── contactRoute.js
│   │   ├── donationRoute.js
│   │   ├── donorDashboardRoutes.js
│   │   ├── donorRoutes.js
│   │   └── requestRoute.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

> `node_modules` is intentionally not included in the documented project structure. Install dependencies locally with `npm install`.

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

- **Node.js** (LTS recommended)
- **npm**
- **MongoDB** running locally or a MongoDB connection string

You can verify Node.js and npm with:

```bash
node --version
npm --version
```

---

## 1. Clone or Extract the Project

Open a terminal in the project directory:

```bash
cd LifeLink
```

The project contains two independent applications:

- `client` — React frontend
- `server` — Express/MongoDB backend

---

## 2. Install Backend Dependencies

```bash
cd server
npm install
```

---

## 3. Configure Environment Variables

Create or update `server/.env`:

```env
Port=5000
Mongo_Url=mongodb://localhost:27017/LifeLink
CLIENT_URL=http://localhost:3000
Secret_key=replace-with-a-strong-secret
```

### Environment Variables

| Variable | Description | Example |
|---|---|---|
| `Port` | Port used by the Express server | `5000` |
| `Mongo_Url` | MongoDB connection string | `mongodb://localhost:27017/LifeLink` |
| `CLIENT_URL` | Frontend URL allowed by CORS | `http://localhost:3000` |
| `Secret_key` | Secret used for JWT authentication | `replace-with-a-strong-secret` |

**Security note:** Never commit real secrets, passwords, or production database credentials to source control. The existing `.env` file should be replaced with environment-specific values before deployment.

---

## 4. Install Frontend Dependencies

Open another terminal:

```bash
cd LifeLink/client
npm install
```

---

## 5. Start the Backend

From the `server` directory:

```bash
npm start
```

For development with automatic restart:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

---

## 6. Start the Frontend

From the `client` directory:

```bash
npm start
```

The React application will be available at:

```text
http://localhost:3000
```

Make sure both the frontend and backend are running while using the application.

---

## 🔐 Authentication

LifeLink uses token-based authentication on protected API routes.

The authentication flow includes:

1. User registers as either a `DONOR` or `RECIPIENT`.
2. The password is securely hashed using `bcryptjs`.
3. The user logs in.
4. The backend issues an authentication token.
5. Protected routes use authentication middleware to identify the logged-in user.
6. Donor and recipient dashboards provide role-specific functionality.

Supported roles:

```text
DONOR
RECIPIENT
```

---

## 🩸 Blood Request Workflow

A typical blood-request flow is:

```text
Recipient
   │
   ├── Creates blood request
   │
   ▼
Blood Request
   │
   ├── Matching donors can be identified
   │
   ▼
Donor
   │
   ├── Responds to request
   │
   ▼
Donation Response
   │
   ├── Recipient/donor workflow updates status
   │
   ▼
Request / Donation Completed
```

Blood requests support statuses such as:

- `pending`
- `accepted`
- `rejected`
- `fulfilled`
- `cancelled`

Donation responses support:

- `responded`
- `accepted`
- `completed`
- `cancelled`

---

## 🔌 API Overview

The backend exposes REST-style endpoints under `/api`.

### Authentication

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Authenticate a user |
| `GET` | `/api/auth/profile` | Get authenticated user's profile |
| `PUT` | `/api/auth/donor-profile` | Update donor profile |

### Donors

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/donors/search` | Search for donors |
| `GET` | `/api/donors/me` | Get current donor profile |
| `GET` | `/api/donors/:id` | Get a donor by ID |
| `PUT` | `/api/donors/profile` | Update donor profile |

### Blood Requests

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/requests` | Create a blood request |
| `GET` | `/api/requests` | Get available requests |
| `GET` | `/api/requests/my` | Get the authenticated recipient's requests |
| `PATCH` | `/api/requests/:id/status` | Update request status |
| `GET` | `/api/requests/:requestId/matching-donors` | Find matching donors |

### Donations

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/donations` | Respond to a blood request |
| `GET` | `/api/donations/requests/:requestId` | Get responses for a request |
| `PATCH` | `/api/donations/:responseId/accept` | Accept a donation response |

### Donor Dashboard

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/donors/me` | Get donor dashboard profile |
| `PATCH` | `/api/donors/availability` | Update donor availability |
| `GET` | `/api/blood-requests/donor` | Get donor-related blood requests |
| `PATCH` | `/api/blood-requests/:id/status` | Update a blood request status |

### Contact

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/contact` | Submit a contact enquiry |

> Protected endpoints require authentication.

---

## 🗃️ Database Models

LifeLink uses MongoDB with Mongoose.

### User

Stores donor and recipient information, including:

- Name
- Email
- Phone
- Password
- Role
- City
- Address
- Blood group
- Gender
- Age
- Weight
- Availability

### BloodRequest

Stores blood requirements such as:

- Recipient
- Donor
- Blood group
- Number of units
- Hospital
- Location
- Urgency
- Message
- Request status
- Creation/update timestamps

Supported blood groups:

```text
A+   A-
B+   B-
AB+  AB-
O+   O-
```

### Donation

Connects a donor with a blood request and tracks the donation response status.

A unique database index prevents the same donor from responding to the same request more than once.

---

## 🧭 Frontend Routes

The React application currently includes:

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About |
| `/find-donor` | Find Donor |
| `/donor/:id` | Donor Profile |
| `/contact` | Contact |
| `/login` | Login |
| `/register` | Registration |
| `/request-blood/:donorId` | Blood Request |
| `/donor-dashboard` | Donor Dashboard |
| `/recipient-dashboard` | Recipient Dashboard |

---

## 📜 Available Scripts

### Client

From `client/`:

```bash
npm start
```

Starts the React development server.

```bash
npm run build
```

Creates a production build.

```bash
npm test
```

Runs the test suite.

```bash
npm run eject
```

Ejects the Create React App configuration. This is generally not necessary.

### Server

From `server/`:

```bash
npm start
```

Starts the Express server.

```bash
npm run dev
```

Starts the server with Nodemon for development.

---

## 🧪 Development

For local development, run the frontend and backend in separate terminals.

**Terminal 1:**

```bash
cd server
npm run dev
```

**Terminal 2:**

```bash
cd client
npm start
```

Then visit:

```text
http://localhost:3000
```

---

## 📱 Responsive Design

The frontend is built with component-specific CSS and responsive layouts for desktop, tablet, and mobile screen sizes.

Major UI sections include:

- Navigation
- Hero section
- Blood-group selection
- Statistics
- How-it-works section
- Testimonials
- Emergency banner
- Donor search
- Donor/recipient dashboards
- Blood-request forms
- Contact page
- Footer

---

## 🔒 Security Considerations

Before using LifeLink in production, consider:

- Use a strong, randomly generated JWT secret.
- Keep `.env` files out of version control.
- Use HTTPS in production.
- Validate and sanitize all user-provided data.
- Add rate limiting to authentication and sensitive endpoints.
- Review authorization rules for every protected resource.
- Use secure cookie/token configuration appropriate to the deployment architecture.
- Configure CORS to allow only trusted production origins.
- Avoid exposing sensitive donor information unnecessarily.

---

## 🔮 Potential Improvements

Future development could include:

- Real-time notifications for urgent blood requests.
- Email/SMS notifications for matched donors.
- Hospital/organization accounts.
- Location-based donor matching using maps or geolocation.
- Advanced blood compatibility rules.
- Request expiration and automatic cleanup.
- Admin dashboard and moderation tools.
- Donation history and donor eligibility tracking.
- Automated testing for API and frontend workflows.
- Production deployment configuration and CI/CD.

---

## 🤝 Contributing

Contributions are welcome.

A typical workflow is:

```bash
# Create a feature branch
git checkout -b feature/your-feature

# Make your changes, then commit
git add .
git commit -m "Add your feature"

# Push the branch
git push origin feature/your-feature
```

Then open a pull request with a clear description of the changes.

---

## 📄 License

The backend package currently declares the **ISC** license. If this project is intended for public distribution, update this section and the repository metadata to reflect the project's final licensing terms.

---

## ❤️ Purpose

LifeLink is built around a simple goal:

> **Connect the right donor with the right person when blood is needed most.**

Every successful connection can make a real difference.

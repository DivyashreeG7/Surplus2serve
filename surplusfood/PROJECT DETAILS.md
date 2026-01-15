# 🌱 Surplus to Serve - Food Donation Platform
## Complete Project Guide for External Exam

---

## 📋 PROJECT OVERVIEW

**Surplus to Serve** is a web-based food donation platform that connects food donors (restaurants, events, individuals) with NGOs to reduce food waste and fight hunger in communities.

### 🎯 Problem Statement
- **Food Waste:** Millions of tons of surplus food are wasted daily
- **Hunger:** Many people in communities lack access to nutritious meals
- **Gap:** No efficient system to connect food donors with organizations that serve the needy

### 💡 Solution
A digital platform that bridges the gap between food donors and NGOs, enabling real-time food donation coordination.

---

## 🏗️ SYSTEM ARCHITECTURE

### Technology Stack
- **Frontend:** React.js + Vite
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **Deployment:** Render (Backend) + Vercel (Frontend)
- **Styling:** Custom CSS with responsive design

### Architecture Pattern
```
Frontend (React) ↔ REST API (Express) ↔ Database (MongoDB)
```

---

## 👥 USER TYPES & FEATURES

### 1. **DONORS** (Restaurants, Event Organizers, Individuals)
**Registration & Login:**
- Create account with name, email, password, phone
- Secure authentication with JWT tokens

**Dashboard Features:**
- Post surplus food details (name, quantity, location, notes)
- Capture GPS location for pickup coordination
- View posted food status (available/claimed)
- Track donation history
- Create community events for food distribution

**Food Posting Process:**
1. Fill food details form
2. Add quantity and location
3. Capture GPS coordinates (optional)
4. Add contact information and notes
5. Submit for NGOs to view

### 2. **NGOs** (Non-Governmental Organizations)
**Registration & Login:**
- Register with organization details
- Set secret key for additional security
- Two-step verification process

**Dashboard Features:**
- Browse available food donations in real-time
- View detailed food information and donor contacts
- Claim food for pickup
- View community events
- Access donation history

**Food Claiming Process:**
1. Browse available food list
2. View detailed food information
3. Check location and contact details
4. Claim food for pickup
5. Coordinate with donor for collection

---

## 🔧 TECHNICAL IMPLEMENTATION

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   └── Navbar.jsx          # Navigation component
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── DonorLogin.jsx      # Donor authentication
│   │   ├── DonorRegister.jsx   # Donor registration
│   │   ├── DonorDashboard.jsx  # Donor main interface
│   │   ├── NGOLogin.jsx        # NGO authentication
│   │   ├── NGORegister.jsx     # NGO registration
│   │   ├── NGOVerifySecret.jsx # NGO secret verification
│   │   ├── FoodList.jsx        # Available food for NGOs
│   │   ├── FoodDetails.jsx     # Detailed food view
│   │   ├── Events.jsx          # Community events
│   │   ├── AddEvent.jsx        # Create new events
│   │   └── History.jsx         # Donation history
│   ├── api.js                  # Centralized API configuration
│   ├── App.jsx                 # Main app component
│   └── index.css               # Responsive styling
```

### Backend Structure
```
backend/
├── config/
│   └── db.js                   # MongoDB connection
├── middleware/
│   └── auth.js                 # JWT authentication
├── models/
│   ├── Donor.js                # Donor data schema
│   ├── NGO.js                  # NGO data schema
│   ├── Food.js                 # Food donation schema
│   ├── Event.js                # Event schema
│   └── FoodHistory.js          # Donation history schema
├── routes/
│   ├── donors.js               # Donor API endpoints
│   ├── ngos.js                 # NGO API endpoints
│   ├── foods.js                # Food management APIs
│   ├── events.js               # Event management APIs
│   ├── history.js              # History tracking APIs
│   └── stats.js                # Platform statistics
└── server.js                   # Main server file
```

### Database Schema

**Donors Collection:**
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  createdAt: Date
}
```

**NGOs Collection:**
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: String,
  secret_key: String (hashed),
  createdAt: Date
}
```

**Foods Collection:**
```javascript
{
  food_name: String,
  quantity: String,
  donor_id: ObjectId,
  status: String (available/claimed),
  latitude: Number,
  longitude: Number,
  distance_text: String,
  notes: String,
  claimed_by: ObjectId,
  claimed_at: Date,
  createdAt: Date
}
```

---

## 🚀 KEY FEATURES EXPLAINED

### 1. **Real-time Food Tracking**
- Auto-refresh every 5 seconds on food lists
- Instant status updates when food is claimed
- Live statistics on homepage

### 2. **Location-based Coordination**
- GPS coordinate capture for precise locations
- Google Maps integration for navigation
- Distance calculation for efficient pickup

### 3. **Secure Authentication**
- JWT token-based authentication
- Password hashing with bcrypt
- NGO secret key verification for additional security

### 4. **Responsive Design**
- Mobile-first approach
- Touch-friendly interface
- Optimized for all screen sizes

### 5. **Event Management**
- Donors can create community food distribution events
- NGOs can view and participate in events
- Event scheduling with date, time, and venue

---

## 📊 API ENDPOINTS

### Donor APIs
```
POST /api/donors/register     # Register new donor
POST /api/donors/login        # Donor login
GET  /api/foods/my           # Get donor's posted foods
POST /api/foods              # Post new food donation
```

### NGO APIs
```
POST /api/ngos/register       # Register new NGO
POST /api/ngos/login          # NGO login
POST /api/ngos/validate-secret # Verify NGO secret key
GET  /api/foods/available     # Get available foods
POST /api/foods/:id/claim     # Claim food donation
```

### General APIs
```
GET /api/events              # Get all events
POST /api/events             # Create new event
GET /api/history             # Get donation history
GET /api/stats               # Get platform statistics
```

---

## 🔒 SECURITY FEATURES

1. **Password Security:** Bcrypt hashing for all passwords
2. **JWT Authentication:** Secure token-based sessions
3. **Input Validation:** Server-side validation for all inputs
4. **CORS Configuration:** Proper cross-origin resource sharing
5. **Secret Key Verification:** Additional security layer for NGOs

---

## 📱 USER EXPERIENCE HIGHLIGHTS

### For Donors:
- Simple food posting process
- Real-time status tracking
- Location capture for easy pickup
- Event creation for community engagement

### For NGOs:
- Easy food discovery and claiming
- Detailed donor contact information
- Event participation opportunities
- Comprehensive donation history

---

## 🚀 HOW TO RUN THE PROJECT

### Prerequisites:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (Local or Atlas) - [Setup guide](https://www.mongodb.com/docs/manual/installation/)
- **Git** - [Download here](https://git-scm.com/)
- **Code Editor** (VS Code recommended)

### Step-by-Step Setup:

#### 1. **Clone the Repository**
```bash
git clone <your-repository-url>
cd surplustoserve
```

#### 2. **Backend Setup**
```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
# Copy .env.example to .env and fill in your values:
# MONGODB_URI=mongodb://localhost:27017/fooddonation
# JWT_SECRET=your_jwt_secret_key
# PORT=5000

# Start the backend server
npm run dev
```
**Backend will run on:** http://localhost:5000

#### 3. **Frontend Setup** (Open new terminal)
```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the frontend server
npm run dev
```
**Frontend will run on:** http://localhost:3000

#### 4. **Database Setup**
- **Option 1 - Local MongoDB:**
  ```bash
  # Start MongoDB service
  mongod
  ```
- **Option 2 - MongoDB Atlas (Cloud):**
  - Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
  - Create cluster and get connection string
  - Update MONGODB_URI in backend/.env

#### 5. **Access the Application**
- Open browser and go to: http://localhost:3000
- Backend API available at: http://localhost:5000

### Quick Start Commands:
```bash
# Terminal 1 - Backend
cd backend && npm install && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm install && npm run dev
```

### Environment Variables Setup:

**Backend (.env file):**
```env
MONGODB_URI=mongodb://localhost:27017/fooddonation
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
NODE_ENV=development
```

**Frontend (.env file):**
```env
VITE_API_URL=http://localhost:5000/api
```

### Troubleshooting:

#### Common Issues:
1. **Port already in use:**
   ```bash
   # Kill process on port 5000
   npx kill-port 5000
   
   # Kill process on port 3000
   npx kill-port 3000
   ```

2. **MongoDB connection error:**
   - Ensure MongoDB is running
   - Check connection string in .env
   - Verify database permissions

3. **CORS errors:**
   - Ensure backend is running
   - Check API URL in frontend/.env
   - Verify CORS configuration in server.js

4. **Dependencies issues:**
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

### Testing the Setup:
1. **Backend Test:** Visit http://localhost:5000 - Should show "Server is running"
2. **Frontend Test:** Visit http://localhost:3000 - Should show the homepage
3. **API Test:** Visit http://localhost:5000/api/stats - Should return JSON data

## 🌐 DEPLOYMENT & ACCESS

### Live URLs:
- **Frontend:** https://foodserve-vercel.vercel.app
- **Backend API:** https://foodserve.onrender.com

### Production Deployment:

#### Backend (Render):
1. Push code to GitHub
2. Connect Render to your repository
3. Set environment variables in Render dashboard
4. Deploy automatically on code changes

#### Frontend (Vercel):
1. Push code to GitHub
2. Connect Vercel to your repository
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy automatically on code changes

---

## 📈 IMPACT & BENEFITS

### Social Impact:
- **Reduces Food Waste:** Connects surplus food with those in need
- **Fights Hunger:** Provides access to nutritious meals
- **Community Building:** Brings donors and NGOs together
- **Environmental Benefit:** Reduces food waste in landfills

### Technical Benefits:
- **Scalable Architecture:** Can handle growing user base
- **Real-time Updates:** Instant coordination between users
- **Mobile Responsive:** Accessible on all devices
- **Secure Platform:** Protected user data and transactions

---

## 🎓 EXAM KEY POINTS

### Technical Concepts Demonstrated:
1. **Full-Stack Development:** Complete MERN stack implementation
2. **RESTful API Design:** Proper HTTP methods and status codes
3. **Database Design:** Normalized schema with relationships
4. **Authentication & Authorization:** JWT-based security
5. **Responsive Web Design:** Mobile-first CSS approach
6. **Real-time Features:** Auto-refresh and live updates
7. **Geolocation Integration:** GPS coordinate handling
8. **Deployment:** Cloud hosting and CI/CD

### Problem-Solving Approach:
1. **Identified Real Problem:** Food waste and hunger
2. **Designed User-Centric Solution:** Easy-to-use platform
3. **Implemented Scalable Architecture:** Modular and maintainable
4. **Ensured Security:** Multiple layers of protection
5. **Optimized Performance:** Efficient database queries and caching

---

## 🔍 DEMO SCENARIOS

### Scenario 1: Restaurant Donation
1. Restaurant registers as donor
2. Posts surplus food after event
3. Captures location and adds contact details
4. NGO discovers and claims the food
5. Coordination happens for pickup

### Scenario 2: Community Event
1. Donor creates food distribution event
2. Sets date, time, and venue
3. NGOs view and plan participation
4. Community benefits from organized distribution

---

## 📚 LEARNING OUTCOMES

Students working on this project will learn:
- Full-stack web development
- Database design and management
- API development and integration
- User authentication and security
- Responsive web design
- Real-world problem solving
- Project deployment and hosting

---

## 🏆 PROJECT ACHIEVEMENTS

✅ **Complete CRUD Operations** for all entities
✅ **Secure Authentication System** with JWT
✅ **Real-time Data Updates** with auto-refresh
✅ **Responsive Design** for all devices
✅ **Geolocation Integration** for coordination
✅ **Event Management System** for community engagement
✅ **Production Deployment** on cloud platforms
✅ **Comprehensive Documentation** for maintenance

---

*This project demonstrates a complete understanding of modern web development practices while addressing a real social problem. It showcases technical skills, problem-solving abilities, and social awareness - making it an excellent example for academic evaluation.*
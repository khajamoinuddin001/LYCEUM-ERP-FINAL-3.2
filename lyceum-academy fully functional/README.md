# Lyceum Academy - Multi-User Management System

A comprehensive academy management system with CRM, LMS, Accounting, and more.

## ✨ Features

- 👥 **Multi-User Support** - Admin, Employee, and Student roles
- 🔐 **JWT Authentication** - Secure login and registration
- 📊 **CRM System** - Lead management and quotations
- 📚 **LMS** - Learning Management System with courses
- 💰 **Accounting** - Invoices and payment tracking
- 📅 **Calendar** - Event management
- 📝 **Contacts** - Student/contact management
- 🎫 **Reception** - Visitor management
- 💬 **Discussion** - Team communication channels
- ✅ **To-Do Lists** - Task management
- 🔔 **Notifications** - Real-time notifications

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd lyceum-academy-fully-functional
```

2. **Install Frontend Dependencies**
```bash
npm install
```

3. **Install Backend Dependencies**
```bash
cd server
npm install
cd ..
```

4. **Setup Environment Variables**

Create `.env` in root:
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY=your_razorpay_key
```

Create `server/.env`:
```env
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
NODE_ENV=development
```

5. **Start Backend Server**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

6. **Start Frontend** (in a new terminal)
```bash
npm run dev
# Frontend runs on http://localhost:3000
```

## 📁 Project Structure

```
lyceum-academy-fully-functional/
├── server/                 # Backend API
│   ├── server.js         # Main server file
│   ├── database.js       # Database setup
│   ├── auth.js           # Authentication utilities
│   └── routes/           # API routes
│       ├── auth.js       # Authentication routes
│       └── api.js        # Main API routes
├── components/            # React components
├── hooks/                 # Custom React hooks
├── utils/                 # Utility functions
│   ├── api.ts           # API client (frontend)
│   ├── db.ts            # IndexedDB for videos
│   └── gemini.ts        # AI integration
├── types.ts              # TypeScript types
├── App.tsx              # Main app component
└── package.json         # Frontend dependencies
```

## 🔧 Development

### Backend Development
```bash
cd server
npm run dev  # Auto-reload on changes
```

### Frontend Development
```bash
npm run dev  # Vite dev server with HMR
```

### Build for Production
```bash
# Frontend
npm run build

# Backend
cd server
npm start
```

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy Options:**
- **Railway** - Easiest, full-stack deployment
- **Vercel** (Frontend) + **Railway** (Backend) - Recommended
- **Render** - Alternative to Railway
- **Self-Hosted VPS** - Full control

## 🔐 Default Users

After first deployment, you'll need to:
1. Register a user (will be Student by default)
2. Manually update role to 'Admin' in database OR
3. Use the Access Control panel (if you have admin access)

## 📝 API Documentation

### Authentication
- `POST /api/auth/register` - Register new student
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/change-password` - Change password

### Main Endpoints
- `/api/users` - User management
- `/api/contacts` - Contact management
- `/api/leads` - CRM leads
- `/api/transactions` - Accounting transactions
- `/api/events` - Calendar events
- `/api/lms-courses` - LMS courses
- `/api/visitors` - Visitor management
- `/api/notifications` - Notifications

All endpoints require JWT authentication (except auth endpoints).

## 🗄️ Database

Currently uses **SQLite** (file: `server/database.sqlite`).

Can be upgraded to **PostgreSQL** for production (see DEPLOYMENT.md).

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing (bcrypt)
- ✅ Role-based access control
- ✅ CORS protection
- ✅ SQL injection protection (parameterized queries)

## 📦 Tech Stack

**Frontend:**
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide Icons

**Backend:**
- Node.js
- Express
- SQLite (better-sqlite3)
- JWT (jsonwebtoken)
- bcryptjs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

Private - All rights reserved

## 🆘 Support

For issues or questions:
1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
2. Check server logs for backend errors
3. Check browser console for frontend errors

---

**Built with ❤️ for Lyceum Academy**



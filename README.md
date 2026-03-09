# 🎬 Movie Platform

A modern, full-stack movie streaming platform with user authentication, admin management, and responsive design. Built with React, Node.js, and MongoDB.

## 🚀 Features

### User Features
- **Authentication**: Secure user registration, login, and logout with JWT tokens
- **Movie Browsing**: Browse movies and TV shows with genre filtering
- **User Profiles**: Update personal information and change passwords
- **Favorites & History**: Track favorite movies and viewing history
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between light and dark modes

### Admin Features
- **Admin Dashboard**: Comprehensive overview with statistics and analytics
- **Movie Management**: Add, edit, and delete movies
- **User Management**: View and manage registered users
- **Content Control**: Full CRUD operations for movie database
- **Responsive Admin Panel**: Mobile-friendly admin interface

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern React with hooks and concurrent features
- **Vite** - Fast build tool and development server
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icon library
- **Redux Toolkit** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Cookie Parser** - Cookie handling
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
MoviePlatform/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── config/          # Database configuration
│   │   └── app.js           # Express app setup
│   ├── package.json
│   └── server.js            # Server entry point
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React contexts
│   │   └── App.jsx          # Main app component
│   ├── package.json
│   └── vite.config.js       # Vite configuration
├── .env                     # Environment variables
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MoviePlatform
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/movie-platform

   # JWT Secret
   JWT_SECRET=your-super-secret-jwt-key

   # Server
   PORT=3000

   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start the development servers**
   
   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - Admin Panel: http://localhost:5173/admin (requires admin login)

## 📦 Available Scripts

### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

- **Registration**: Users can create accounts with email, password, and full name
- **Login**: Credentials are validated and JWT tokens are issued
- **Protected Routes**: Admin and user-specific routes require valid tokens
- **Token Storage**: Tokens are stored in HTTP-only cookies for security
- **Auto-logout**: Tokens expire after 24 hours

## 👥 User Roles

### Regular Users
- Browse movies and TV shows
- Add movies to favorites
- View watch history
- Update profile information
- Change password

### Admin Users
- All user privileges
- Access admin dashboard
- Manage movies (CRUD operations)
- Manage users (view and delete)
- View platform statistics

## 🎨 Design System

### Color Palette
- **Primary**: Netflix-style red (#E50914)
- **Dark Theme**: Dark backgrounds with high contrast
- **Light Theme**: Clean whites and grays
- **Accent**: Subtle brand colors throughout

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Components
- **Movie Cards**: Responsive grid layout with hover effects
- **Navigation**: Sticky header with scroll effects
- **Admin Sidebar**: Collapsible on mobile, full on desktop
- **Forms**: Validated inputs with error handling
- **Loading States**: Skeleton screens for better UX

## 🚀 Deployment

### Production Build
1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the production server**
   ```bash
   cd backend
   npm start
   ```

The frontend build is automatically served by the backend from the `/dist` folder.

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-production-secret
PORT=3000
FRONTEND_URL=https://your-domain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `DELETE /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie details
- `POST /api/admin/movies` - Add movie (admin only)
- `PUT /api/admin/movies/:id` - Update movie (admin only)
- `DELETE /api/admin/movies/:id` - Delete movie (admin only)

### Favorites & History
- `GET /api/favorites` - Get user favorites
- `POST /api/favorites` - Add to favorites
- `DELETE /api/favorites/:id` - Remove from favorites
- `GET /api/history` - Get watch history
- `POST /api/history` - Add to history

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network connectivity

2. **CORS Issues**
   - Verify `FRONTEND_URL` in `.env`
   - Check if frontend is running on correct port

3. **JWT Token Issues**
   - Clear browser cookies
   - Check `JWT_SECRET` is set
   - Verify token expiration

4. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all dependencies are installed

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- TMDB API for movie data inspiration
- Netflix UI/UX design patterns
- Open source community for the amazing tools and libraries

---

**Built with ❤️ by the Movie Platform Team**

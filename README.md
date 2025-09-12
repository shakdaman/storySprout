# StorySprout 🌱📚

A responsive web application designed to foster a love of reading in children through AI-generated stories and interactive quizzes.

## 🎯 Project Overview

StorySprout delivers daily AI-generated stories and quizzes to children in a safe, engaging environment that parents can monitor and manage. The platform leverages Firebase for backend services and provides a child-friendly interface with comprehensive parent controls.

## ✨ Features

### For Parents
- **Secure Authentication**: Google OAuth login for parents
- **Family Management**: Create and manage multiple child profiles
- **Progress Monitoring**: Track reading activities and quiz scores
- **Child Safety**: Secure environment with parental controls

### For Children
- **Simple Login**: Username + PIN authentication system
- **Daily Stories**: AI-generated stories tailored to reading levels
- **Interactive Quizzes**: Automated grading with instant feedback
- **Progress Tracking**: Visual progress indicators and achievements
- **Child-Friendly UI**: Large fonts, simple navigation, engaging design

## 🛠 Tech Stack

- **Frontend**: React 19+ with TypeScript
- **Styling**: Tailwind CSS with custom child-friendly themes
- **Backend**: Firebase (Authentication, Firestore, Functions)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase project with Authentication and Firestore enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd storysprout
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Follow the [Firebase Setup Guide](docs/FIREBASE_SETUP.md)
   - Update `src/firebase/serviceAccount.ts` with your Firebase configuration

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
storysprout/
├── docs/                    # Project documentation
│   ├── DEVELOPMENT_CHECKLIST.md
│   ├── FIREBASE_SETUP.md
│   └── SAMPLE_DATA.md
├── scripts/                 # Build and utility scripts
├── src/
│   ├── components/          # Reusable UI components
│   ├── contexts/           # React contexts for state management
│   ├── firebase/           # Firebase configuration
│   ├── pages/              # Page components
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── README.md               # This file
└── package.json           # Dependencies and scripts
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🔐 Firebase Configuration

The application uses Firebase for all backend services:

- **Authentication**: Google OAuth for parents
- **Database**: Firestore for data storage
- **Functions**: Serverless functions for n8n integration
- **Hosting**: Firebase Hosting for deployment

**Project ID**: `storysprout-a1166`

See [Firebase Setup Guide](docs/FIREBASE_SETUP.md) for detailed configuration instructions.

## 📊 Database Schema

### Collections
- `parents` - Parent user data
- `children` - Child profile data  
- `stories` - Story content
- `quizzes` - Quiz questions and answers
- `quizResults` - Quiz completion data
- `readingActivities` - Reading session data

See [Sample Data Guide](docs/SAMPLE_DATA.md) for testing data.

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones for parent interface
- **Secondary**: Purple tones for child interface
- **Accent**: Green, yellow, and purple for achievements

### Typography
- **Parent Font**: Inter (clean, professional)
- **Child Font**: Comic Sans MS (friendly, approachable)

### Responsive Design
- Mobile-first approach
- Touch-friendly interface for children
- Accessible design with proper contrast ratios

## 🧪 Testing

1. **Add Sample Data**: Use the [Sample Data Guide](docs/SAMPLE_DATA.md)
2. **Test Authentication**: Try parent and child login flows
3. **Test Stories**: Read sample stories and take quizzes
4. **Test Progress**: Verify progress tracking works correctly

## 🚀 Deployment

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build and deploy: `npm run build && firebase deploy`

## 📈 Development Progress

See [Development Checklist](docs/DEVELOPMENT_CHECKLIST.md) for current progress and next steps.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**StorySprout** - Growing Young Readers, One Story at a Time 🌱📚

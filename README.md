# QA AI - Intelligent Test Automation Platform

<div align="center">

![QA AI Logo](https://img.shields.io/badge/QA-AI-blue?style=for-the-badge)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646cff?style=flat-square&logo=vite)](https://vite.dev/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

**AI-powered test automation platform for modern development teams**

[Live Demo](#) · [Documentation](docs/README.md) · [Report Bug](https://github.com/aliaga-alv/qa_ai/issues)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About

QA AI is a comprehensive test automation platform that leverages artificial intelligence to streamline quality assurance workflows. Built with modern web technologies, it provides an intuitive interface for managing test suites, analyzing results, and collaborating with development teams.

### Key Highlights

- 🤖 AI-powered test generation and optimization
- 📊 Real-time analytics and reporting dashboards
- 🔄 Seamless CI/CD integration
- 👥 Team collaboration features
- 🔒 Enterprise-grade security and compliance
- 🌙 Dark mode support
- 📱 Responsive design for all devices

---

## ✨ Features

### Public Features
- **Marketing Pages**: Home, Pricing, About Us, Careers, Contact
- **Content Hub**: Blog with category filtering, Changelog, and detailed article views
- **Legal Compliance**: Terms of Service, Privacy Policy, Cookie Policy, Security documentation
- **Error Handling**: Professional error pages (404, 500, 403, 401, Offline)

### Authentication
- User registration and login with validation
- Social authentication (Google, GitHub)
- Protected routes and role-based access control
- Persistent sessions with "Remember Me" functionality

### Dashboard (Coming Soon)
- Test management and execution
- Analytics and reporting
- User profile and settings
- Team collaboration tools

---

## 🛠 Tech Stack

### Frontend
- **React 19.2.0** - UI library with latest features
- **TypeScript 5.6.3** - Type-safe development
- **Vite 7.3.1** - Fast build tool and dev server
- **React Router 7.12.0** - Client-side routing
- **Tailwind CSS 3.4.17** - Utility-first styling

### State Management & Data Fetching
- **Zustand 5.0.2** - Lightweight state management
- **TanStack Query 5.64.2** - Server state management

### Form Handling & Validation
- **React Hook Form 7.71.1** - Performant form handling
- **Zod 4.3.5** - Schema validation
- **@hookform/resolvers 3.10.0** - Form resolvers

### UI Components & Icons
- **Lucide React** - Modern icon library
- **Sonner** - Toast notifications

### Development Tools
- **ESLint** - Code linting
- **PostCSS & Autoprefixer** - CSS processing
- **TypeScript ESLint** - TS-specific linting

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 or **yarn** >= 1.22.0

### Installation

1. Clone the repository
```bash
git clone https://github.com/aliaga-alv/qa_ai.git
cd qa_ai
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Start development server
```bash
npm run dev
```

Access the application at http://localhost:5173

---

## 📁 Project Structure

```
qa_ai/
├── docs/                      # Project documentation
├── public/                    # Static assets
├── src/
│   ├── components/            # React components
│   │   ├── common/            # Shared components
│   │   ├── features/          # Feature-specific components
│   │   ├── layout/            # Layout components
│   │   └── ui/                # UI primitives
│   ├── constants/             # App constants
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries
│   ├── pages/                 # Page components
│   ├── router/                # Routing configuration
│   ├── schemas/               # Validation schemas
│   ├── services/              # API services
│   ├── stores/                # State management
│   ├── styles/                # Global styles
│   ├── App.tsx                # Root component
│   └── main.tsx               # Entry point
├── .env.example               # Environment variables template
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── tailwind.config.js         # Tailwind CSS config
└── vite.config.ts             # Vite configuration
```

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler check |

---

## 📚 Documentation

Comprehensive documentation is available in the `/docs` directory, organized by category:

**📖 [Full Documentation Index](docs/README.md)** - Start here for complete documentation guide

### Quick Links by Category

**Development & Architecture**
- **[Architecture Guide](docs/development/ARCHITECTURE.md)** - System design and tech stack
- **[Component Design](docs/development/COMPONENT_DESIGN.md)** - Component structure and patterns
- **[AI Agent Guide](docs/development/AI_AGENT_GUIDE.md)** - AI integration guidelines
- **[Quick Start AI](docs/development/QUICK_START_AI.md)** - Fast reference for AI code generation

**API Integration**
- **[API Architecture](docs/api/API_ARCHITECTURE.md)** - API structure and service layer
- **[Auth Implementation](docs/api/AUTH_IMPLEMENTATION.md)** - Authentication guide
- **[Error Handling](docs/api/ERROR_HANDLING.md)** - Error handling patterns

**Project Planning**
- **[Project Overview](docs/planning/PROJECT_OVERVIEW.md)** - Product vision and goals
- **[Implementation Roadmap](docs/planning/IMPLEMENTATION_ROADMAP.md)** - Development phases
- **[Dashboard Plan](docs/planning/DASHBOARD_IMPLEMENTATION_PLAN.md)** - Dashboard features

**Testing & Deployment**
- **[Quick Test Guide](docs/testing/QUICK_TEST_GUIDE.md)** - Testing workflows
- **[Lighthouse Testing](docs/testing/LIGHTHOUSE_TESTING.md)** - Performance testing
- **[Deployment Guide](docs/deployment/DEPLOYMENT.md)** - Deployment process

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature')
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the blazing-fast build tool
- All open-source contributors

---

<div align="center">

**Built with ❤️ by the QA AI Team**

[GitHub](https://github.com/aliaga-alv/qa_ai)

</div>

# My Todo List - Next.js Application

## Overview
A Todo List application built with Next.js 15, React 19, and Tailwind CSS. The app features a clean, modern interface for managing tasks.

## Recent Changes
**October 18, 2025** - Migrated from Vercel to Replit
- Configured Next.js to run on port 5000 with host 0.0.0.0 for Replit compatibility
- Removed unused `vaul` dependency that was causing peer dependency conflicts with React 19
- Set up development workflow to run `npm run dev`
- Configured deployment for autoscale mode with Next.js build and start commands
- All dependencies now install cleanly without legacy peer deps flag

## Project Architecture
- **Framework**: Next.js 15.5.4 (App Router)
- **React Version**: 19.1.0
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI components with shadcn/ui patterns
- **Package Manager**: npm

### Directory Structure
- `src/app/` - Next.js app router pages and layouts
- `src/components/` - Reusable React components
- `src/lib/` - Utility functions
- `public/` - Static assets

## Development
- **Dev Server**: Runs on port 5000, accessible via Replit webview
- **Commands**:
  - `npm run dev` - Start development server
  - `npm run build` - Build for production
  - `npm start` - Start production server
  - `npm run lint` - Run ESLint

## Deployment
Configured for Replit's autoscale deployment:
- Build command: `npm run build`
- Start command: `npm start` (on port 5000)

## Notes
- Cross-origin warnings from Next.js are expected in Replit's iframe environment and don't affect functionality
- The application uses React 19 with compatible Radix UI components

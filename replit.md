# Car Aggregator App

## Overview
A React + TypeScript car aggregator application built with Vite and Ant Design. The app provides user authentication and a dashboard for managing car data.

## Project State
- **Status**: Running and configured for Replit
- **Created**: October 22, 2025
- **Repository**: https://github.com/Mekilan/car-agg-app
- **Tech Stack**: React 19, TypeScript, Vite, Ant Design, React Router

## Recent Changes
- October 22, 2025: Initial setup in Replit environment
  - Installed Node.js 20
  - Configured Vite for Replit proxy (port 5000, allow all hosts)
  - Installed dependencies
  - Set up dev server workflow
  - Added .gitignore for Node.js project

## Project Architecture

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **UI Library**: Ant Design 5
- **Routing**: React Router 7
- **HTTP Client**: Axios
- **Date Handling**: Day.js

### Structure
- `/src/pages/`: Authentication pages (Login, Signup) and Dashboard
- `/src/components/`: Reusable UI components (AppHeader, CarTable, FilterPanel, etc.)
- `/src/services/`: API services (auth, agent, userAccount, api)
- `/src/hooks/`: Custom React hooks (useCarData, useInterval)
- `/src/types/`: TypeScript type definitions

### Configuration
- **Dev Server**: Runs on port 5000 (0.0.0.0)
- **HMR**: Configured for Replit proxy with WSS protocol
- **Workflow**: "Server" running `npm run dev`

## User Preferences
- Not yet established

## Development
- Start server: `npm run dev` (automatic via workflow)
- Build: `npm run build`
- Lint: `npm run lint`
- Preview: `npm run preview`

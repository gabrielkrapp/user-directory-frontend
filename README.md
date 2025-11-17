# User Directory

Frontend for a user directory application built with React, TypeScript, and Vite. Displays a paginated list of users with infinite scrolling.

## Tech Stack

- React 18
- TypeScript
- Vite
- CSS3

## Getting Started

### Prerequisites

- Node.js 16+
- Backend API running on `http://localhost:3000`

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```
VITE_API_BASE_URL=http://localhost:3000
```

### Running the App

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

## API Contract

The backend should expose a `GET /users` endpoint with the following query parameters:

- `page` (number): Page number starting from 1
- `perPage` (number): Number of users per page
- `delay` (number, optional): Delay in milliseconds for testing

Response format:

```json
{
  "page": 1,
  "per_page": 6,
  "total": 12,
  "total_pages": 2,
  "data": [
    {
      "id": 1,
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "avatar": "https://example.com/avatar.jpg"
    }
  ]
}
```

## Features

- Infinite scrolling using IntersectionObserver
- Splash screen with pulsating animation during initial load
- Error handling with retry functionality
- Responsive design
- Glassmorphic card design with gradient borders

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Notes

- The app uses IntersectionObserver for scroll detection, which requires a modern browser
- Images are lazy-loaded by default
- No data persistence - all state is in-memory and resets on page reload

# ScrapVault Frontend

Next.js frontend for the ScrapVault scrap marketplace platform.

## Prerequisites

- Node.js 18+
- npm or yarn
- Docker & Docker Compose (optional)

## Quick Start with Docker

### Option 1: Use Root docker-compose.yml (Recommended)

From the project root, run both frontend and backend:

```bash
# From project root (where docker-compose.yml is located)
docker-compose up --build

# Or run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Option 2: Run Frontend Only

```bash
cd ScalpFrontend

# Build the Docker image
docker build -t scrapvault-frontend .

# Run the container
docker run -p 3000:3000 --env-file .env.local scrapvault-frontend
```

### Configure Environment

Create a `.env.local` file in the frontend directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5001/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Manual Installation (Without Docker)

### 1. Install Dependencies

```bash
cd ScalpFrontend
npm install
# or
yarn install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
# Edit .env.local with your API URL
```

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth pages (login, register)
│   ├── admin/             # Admin dashboard pages
│   ├── marketplace/       # Marketplace pages
│   ├── blog/              # Blog pages
│   └── layout.tsx         # Root layout
├── components/            # React components
├── lib/                   # Utilities and helpers
│   ├── api-client.ts      # API client
│   └── utils.ts           # Helper functions
└── styles/                # Global styles
```

## Key Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/login` | User login |
| `/register` | User registration |
| `/marketplace` | Browse listings |
| `/blog` | Blog posts |
| `/admin` | Admin dashboard |
| `/admin/users` | User management |
| `/admin/listings` | Listing management |
| `/admin/enquiries` | Enquiry management |
| `/admin/content` | Content & blog management |
| `/admin/settings` | Site settings (superadmin) |
| `/admin/admins` | Admin management (superadmin) |

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | http://localhost:5001/api |
| `NEXT_PUBLIC_APP_URL` | Frontend URL | http://localhost:3000 |

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: Tailwind CSS, Lucide Icons
- **State**: React hooks
- **API**: REST via fetch

## Running with Root docker-compose.yml

The root `docker-compose.yml` at the project root orchestrates both services:

```bash
# From project root
docker-compose up --build

# Services will be available at:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:5001
```

The frontend will automatically connect to the backend using the internal Docker network.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## License

MIT
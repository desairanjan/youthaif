# YouthAIF Website

Website for **Youth Advancement Incubator Foundation (YouthAIF)** — a Public-Private-Youth Partnership for a #WorkLifeReady Generation.

Built with **ASP.NET Core**, **React**, and **SQL Server**.

## Features

- **Home page** — Mission, programs, and community hub information from the YouthAIF flyer
- **Sevathon 9/20 tab** — Booth visitor check-in form for the September 20, 2025 Sevathon event
- **Newsletter signup** — NAM Mindfulness and Journey of Starting a Company newsletters
- **REST API** — ASP.NET Core Web API with SQL Server persistence

## Tech Stack

| Layer    | Technology              |
|----------|-------------------------|
| Backend  | ASP.NET Core 10 Web API |
| Frontend | React 19 + TypeScript   |
| Database | SQL Server (LocalDB)    |
| Build    | Vite                    |

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org/)
- SQL Server LocalDB (included with Visual Studio) or SQL Server Express

## Getting Started

### 1. Database

The API auto-creates the database on first run using EF Core `EnsureCreated()`. For manual setup, run:

```bash
sqlcmd -S "(localdb)\mssqllocaldb" -i database/init.sql
```

Update the connection string in `backend/YouthAIF.Api/appsettings.json` if using a different SQL Server instance.

### 2. Backend API

```bash
cd backend/YouthAIF.Api
dotnet run
```

API runs at `http://localhost:5065`. OpenAPI docs available at `/openapi/v1.json` in Development.

### 3. Frontend

```bash
cd frontend/youthaif-web
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` and proxies API requests to the backend.

## API Endpoints

| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| POST   | `/api/sevathon/check-in`    | Booth visitor check-in   |
| GET    | `/api/sevathon/stats`       | Event check-in stats     |
| POST   | `/api/newsletter/subscribe` | Newsletter subscription  |

## Project Structure

```
youthaif/
├── backend/YouthAIF.Api/     # ASP.NET Core Web API
├── frontend/youthaif-web/    # React frontend
├── database/init.sql         # SQL Server schema script
└── YouthAIF.slnx             # Solution file
```

## Contact

- Website: [www.YouthAIF.org](https://www.youthaif.org)
- Email: ranjan@hubhaya.com
- LinkedIn: [desairanjan](https://www.linkedin.com/in/desairanjan)

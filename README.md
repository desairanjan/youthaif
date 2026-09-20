# YouthAIF Website

Website for **Youth Advancement Incubator Foundation (YouthAIF)** — a Public-Private-Youth Partnership for a #WorkLifeReady Generation.

Built with **ASP.NET Core**, **React**, and **SQL Server**.

## Features

- **Home page** — Mission, programs, and community hub information from the YouthAIF flyer
- **Sevathon 9/20 tab** — Booth visitor check-in form for the September 20, 2026 Sevathon event
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
| POST   | `/api/auth/login`           | Admin login (report tab) |
| GET    | `/api/sevathon/visitors`    | Check-in list (admin)    |
| GET    | `/api/sevathon/stats`       | Event stats (admin)      |

## Admin report (`/reports`)

The **Report** tab is password-protected. After sign-in you can view all Sevathon check-ins, refresh the list, and export CSV.

**Development default password:** `YouthAIF-Sevathon-2026` (set in `appsettings.Development.json`).

**Production:** set environment variables or `appsettings`:

- `Admin__Password` — admin password
- `Jwt__Key` — signing key (at least 32 characters)

Local setup options
- Temporary (PowerShell session):

```powershell
$env:Admin_Password = "YouthAIF-Sevathon-2026"
$env:Jwt_Key = "YouthAIF-Dev-Signing-Key-Min-32-Chars!"
# available to the current shell/process only
```

- Persistent (current user):

```powershell
setx Admin_Password "YouthAIF-Sevathon-2026"
setx Jwt_Key "YouthAIF-Dev-Signing-Key-Min-32-Chars!"
# open a new shell for these to take effect
```

- Recommended for local development (dotnet user-secrets):

```bash
cd backend/YouthAIF.Api
dotnet user-secrets init
dotnet user-secrets set "Admin:Password" "YouthAIF-Sevathon-2026"
dotnet user-secrets set "Jwt:Key" "YouthAIF-Dev-Signing-Key-Min-32-Chars!"
```

- Visual Studio debug (launchSettings.json): add `Admin__Password` and `Jwt__Key` under the Development profile(s). The double-underscore maps to the `:` configuration key (e.g. `Admin__Password` -> `Admin:Password`).

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

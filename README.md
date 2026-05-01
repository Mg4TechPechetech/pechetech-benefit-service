# PecheTech Benefit Service

## 📝 Overview
The Benefit Service is a core backend microservice for PecheTech, responsible for managing employee benefits, calculating compensations, and handling related business logic. It implements Domain-Driven Design (DDD) principles for clean architecture.

## 🛠 Tech Stack
- **Framework:** NestJS
- **Language:** TypeScript
- **Containerization:** Docker

## 📂 Project Structure
- `/src`: Application source code
  - `/core`: Domain entities and interfaces
  - `/use-cases`: Application business logic
  - `/presentation`: API controllers and input validation
  - `/infrastructure`: Database repositories and external integrations
- `/tests`: Unit and end-to-end tests
- `/docker`: Docker configurations
- `/docs`: Documentation (including the Math Engine specification)

## ⚙️ Prerequisites
- Node.js (v18+)
- npm or yarn
- Docker & Docker Compose

## 🚀 Setup & Installation
1. Install dependencies:
   ```bash
   npm install
   ```

## 🏃‍♂️ Running the Application
**Development Mode:**
```bash
npm run start:dev
```

**Using Docker:**
```bash
docker-compose -f docker/docker-compose.yml up --build
```

## 🧪 Testing
```bash
npm run test
```

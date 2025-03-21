# Counter App

## Overview
This project is a small web application that consists of a frontend built with Angular and a backend using Django and Celery. The application includes a counter mechanism that responds to user interactions and scheduled backend tasks.

## Features
- A counter that starts from `0` and persists across page reloads.
- Two pages `/up` and `/down`:
  - Clicking a button on `/up` increases the counter by X (initially X=1).
  - Clicking a button on `/down` decreases the counter by X (initially X=1).
- When the counter reaches `10`, the background color changes to `#e74c3c`.
- When the counter reaches `-10`, the background color changes to `#27ae60`.
- Every `30` clicks, the step value `X` doubles.
- A `/reset` page that allows users to reset the counter using a date input field.
- Backend fetches "Île-de-France" communes from `https://adresse.data.gouv.fr/api` every 5 minutes and stores them.
- If the counter reaches the postal code of `Melun`, it resets to `0`.

## Technologies Used
### Frontend
- Angular (with Router, Services, Observables)

### Backend
- Django (REST API)
- PostgreSQL (Database)
- Redis (Message Broker)
- Celery (Task Scheduling)
- Docker & Docker Compose

## Installation
### Prerequisites
Ensure you have the following installed:
- Docker
- Docker Compose
- Make (optional, but simplifies running commands)

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/brehin-e/counter-app
   cd counter-app/backend
   ```

2. Create a `.env` file in the `backend` folder with your environment variables.
   You can also uncomment the values from .env.dist for easier setup

3. Start the application using:
   ```sh
   make dev
   ```
   This will:
   - Set up PostgreSQL, Redis, Django API, Celery workers, and the frontend.
   - Run database migrations.
   - Start the backend on `http://localhost:8080`.
   - Start the frontend on `http://localhost:4200`.

## Usage
- Navigate to `http://localhost:4200/up` to increment the counter.
- Navigate to `http://localhost:4200/down` to decrement the counter.
- Use `http://localhost:4200/reset` to reset the counter with a selected date.
- The counter is persistent across page reloads.
- The backend updates communes every 5 minutes.

## API Endpoints
| Endpoint         | Method | Description |
|-----------------|--------|-------------|
| `/api/cities`   | `GET`  | Get all cities |
| `/api/search/:Name` | `GET` | Seacrh a specific city by name |

## Tests
- To start the tests in backend, just start:
   ```sh
   make test
   ```

## Notes
- The app should be free of browser console errors.
- Users always land on the `/up` page by default.

## Author
- [Eloi BREHIN]
- [brehin.eloi@gmail.com]
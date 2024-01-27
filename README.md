# E-Store App

This is a fully functional E-Store where users can create accounts and login - explore, search, filter, add/remove product/s into/from the basket, place orders and checkout.

## Available Features

- Authentication & Authorization (Register, Login, Roles, Logout)
- Catalog (Check products, show product details, add product into basket, remove product from basket)
- Pagination
- Search products, Filter Products
- Place orders & show them.
- Checkout (Payment using Strip) - Taking Payments, Webhooks, PCI Compliance, Save storage of app secrets in the code (Secret Manager)
- Dark & Light mode

## Used Tools and Technologies

<b>Front-End</b>

- Vite
- React
- TypeScript
- React Router Dom
- Redux/Redux Toolkit/Redux Thunk
- Axios
- Material UI & Material Icons
- React Hook Form

<b>Back-End</b>

- .Net 7 (API)
- Entity Framework
- LINQ
- User secrets (for saving secret keys safly)
- Strip API
- SQLite (Devlopment)
- PostgreSQL (Production)

<b>Others</b>

- CLI
- Docker & Docker Compose
- Git & Github

## Some of the used CLI commands

### Docker

- **Build Docker Image:**

  ```bash
  docker build -t <your_docker_username>/e-store
  ```

  - **Run Docker Container:**

  ```bash
  docker run --rm -it -p 8080:80 <your_docker_username>/e-store
  ```

  This command runs the Docker image, mapping port 8080 on the host to port 80 in the container.

- **Note:**
  Sometimes, a port, such as 8080, might be in use by another software or process.
  In such situations, you have two options:
  either select a different port or free up the occupied port by following the steps outlined below.

- **Free up an occupied port using Powershell**

#### 1- Run Powershell as admin

#### 2- Get PID for Port 8080:

```bash
tasklist | find "8080"
```

Use this command to identify the process ID (PID) associated with port 8080.

#### 3- Kill/Stop the Process:

```bash
taskkill /F /PID 1234
```

Replace "1234" with the actual PID obtained from the previous command.
This command forcibly terminates the process using the specified PID, stopping the activity on port 8080.

- **Run Postgres Server using Docker**

```bash
docker run --name dev -e POSTGRES_USER=<your_postgres_username> -e POSTGRES_PASSWORD=<your_postgres_password> -p 5432:5432 -d postgres:latest
```

This Docker command runs a PostgreSQL container named "dev," setting the PostgreSQL username and password environment variables, mapping port 5432 from the host to the container, and running the latest version of the PostgreSQL image in detached mode.

- **Note:**
  This command launches a PostgreSQL server within a Docker container. You have the option to install and use PostgreSQL locally, but utilizing Docker provides a convenient and isolated environment for your development needs.

- **Push the image to Docker Hub**

  In order to be able to deploy our app to the cloud, we need to push it into the Docker hub as follwing:

  1- Login to Docker

```bash
docker login
```

2- Push the image

```bash
docker push <your_docker_username>/e-store:latest
```

### Fly.Io

This is where the app will be deployed

1- Install flyctl

```bash
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

2- Login

```bash
flyctl auth login
```

3- Create and configure a new app from a Docker image

```bash
fly launch --image <your_dokcer_username>/e-store:latest
```

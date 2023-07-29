# Task Manager Web Application (Fastify, Pug, Knex.js, Objection.js)

## Hexlet tests and linter status
[![hexlet-check](https://github.com/JS-NinjaNN/backend-project-6/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/JS-NinjaNN/backend-project-6/actions/workflows/hexlet-check.yml)
[![eslint-jest-check](https://github.com/JS-NinjaNN/backend-project-6/actions/workflows/eslint-jest-check.yml/badge.svg)](https://github.com/JS-NinjaNN/backend-project-6/actions/workflows/eslint-jest-check.yml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8735cfaf56da09a14b65/test_coverage)](https://codeclimate.com/github/JS-NinjaNN/backend-project-6/test_coverage)

### Description

#### [Task manager](https://backend-project-6-production-709f.up.railway.app/)

The Task Manager is a feature-rich web application written in Fastify, featuring server-side rendering with the Pug template engine. It utilizes Knex.js and Objection.js to interact with the database. During development, the application uses SQLite, while in production, it seamlessly switches to Postgresql for improved performance and scalability.

##### Key Features
- User Authentication: The app supports user registration, login, and secure authentication. Proper authorization mechanisms are in place to control access to different functionalities.

- Flash Messages: Informative flash messages are implemented to enhance user experience by providing feedback on successful actions and error scenarios.

- Task and Status Management: Users can efficiently create, edit, and delete tasks. Each task can be associated with a specific status, enabling progress tracking.

- Assigning Task Executors: Users can now assign tasks to specific individuals, designating them as executors. This functionality allows for better task delegation and workload distribution.

- Label Management: The Task Manager allows users to categorize tasks using labels. Users can create, modify, and delete labels as needed.

- Error Tracking with Rollbar: The Task Manager utilizes Rollbar, a powerful error tracking and monitoring tool, to automatically detect and track errors and exceptions in the application. This ensures prompt issue identification and allows for rapid bug resolution.

### Getting Started

To set up the Task Manager locally, follow these steps:

#### Repo clone

```bash
git clone git@github.com:JS-NinjaNN/backend-project-6.git
cd backend-project-6
```

### Setup

#### Configure the database:

- For development: Use SQLite
- For production: Set up Postgresql

#### Set environment variables:

- SESSION_KEY
- PGDATABASE
- PGHOST
- PGPASSWORD
- PGPORT
- PGUSER
- ROLLBAR_ACCESS_KEY

```bash
make setup
```

```bash
$ make start
# Open localhost:5000
```

#### Supports the following browsers

![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/main/src/opera/opera_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_48x48.png) | ![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 ✔ |

![Tasks page](https://github.com/JS-NinjaNN/backend-project-6/assets/113940218/7ee0d3f1-806d-4eed-b553-95d8802dcb8b)
![Selected task page](https://github.com/JS-NinjaNN/backend-project-6/assets/113940218/e38714c6-752d-4801-b647-05aac4f31fcc)


# uptime

<img src="./logo.png" width="150px">

An uptime monitoring web application that is easy to understand, use, and extend.

![GitHub](https://img.shields.io/github/license/khalidx/uptime.svg?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/khalidx/uptime.svg?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/khalidx/uptime.svg?style=flat-square)

- [uptime](#uptime)
  - [Screenshot](#screenshot)
  - [Features](#features)
  - [Getting started](#getting-started)
  - [Components](#components)
  - [API](#api)
  - [Support](#support)
  - [Developers](#developers)
    - [Usage](#usage)
      - [clone](#clone)
      - [install](#install)
      - [dev](#dev)
      - [build](#build)
      - [start](#start)
      - [docker](#docker)

## Screenshot

<img src="./screenshot.png" width="500px">

## Features

- [x] static page with static data (for MVP)
- [x] status page with services (for MVP)
- [x] detail page with charts (for MVP)
- [x] create (and delete) services and service messages
- [x] export JSON data
- [x] deployable to s3
- [x] serverless infrastructure (1 day)
- [ ] ping thousands of endpoints and IPs (1 day)
- [ ] call thousands of endpoints with a pre-defined request (2 days)
- [ ] log to CloudWatch and use CloudWatch alarms (2 days)
- [x] manually toggle health status, with message (3 days)
- [x] scheduled checks
- [ ] manually trigger a check, outside of schedule (3 days)
- [ ] see debug logs for a check
- [ ] auth for UI and API users
- [x] persistent history (3 days)
- [x] post status and scheduled maintenance messages (5 days)
- [ ] notifications via email, sms, slack, and webhooks (5 days)
- [ ] webpage screenshot support (7 days)
- [ ] load testing support with artillery (7 days)
- [ ] one-click AWS deployment
- [x] serverless deployment
- [ ] terraform deployment
- [ ] deployable as: EC2/AMI/Docker/Fargate/Lambda/S3/NGINX/Process

Nice to have:

- [x] logo
- [ ] literate

## Getting started

Coming soon.

## Components

- `uptime-ui` (the uptime web application frontend)
- `uptime-app` (the uptime serverless application backend)

## API

| Done | Operations | Path | Description |
|--- |--- |--- |--- |
| 👍 | GET, PUT, DELETE | `/settings` | Manage system settings, like the status page `title` |
| 👍 | GET, POST | `/services` | Get a list of monitored services or add a service |
| 👍 | GET, PUT, DELETE | `/services/{id}` | Get or manage a specific service |
| 🚧 | GET, POST | `/services/messages` | Get a list of operational status messages for a service, or add a new message |
| 🚧 | GET, PUT, DELETE | `/services/messages/{id}` | Get or manage a specific service message |
| 🚧 | GET, POST | `/services/feedback` | Get a list of feedback messages for a service, or submit a feedback message |
| 🚧 | GET, PUT, DELETE | `/services/feedback/{id}` | Get or manage a specific service feedback message |
| 🚧 | GET, POST | `/services/checks` | Get the configured checks for a service, like scheduled pings, or add a new service check |
| 🚧 | GET, PUT, DELETE | `/services/checks/{id}` | Get or manage a specific service check |
| 🚧 | GET, POST | `/services/requests` | Get the request metrics for a service |
| 🚧 | GET, PUT, DELETE | `/services/requests/{id}` | Get or manage a specific request metric |

## Support

Open a GitHub issue to ask a question, report a bug, raise a concern, or request a new feature.

## Developers

This section is for developers looking to develop, modify, or extend this project.

### Usage

#### clone

Clone the repository from GitHub.

```sh
git clone https://github.com/khalidx/uptime && cd uptime
```

#### install

Install the project dependencies.

```sh
npm install
```

#### dev

Start the project with a development server and hot-reload.

```sh
npm run dev
```

#### build

Build the project into static assets.

```sh
npm run build
```

#### start

Start a production-like HTTP server. Ensure you've run the `build` step first.

```sh
npm run start
```

#### docker

Build and run with Docker.

```sh
docker build -t uptime .
docker run --rm uptime
```

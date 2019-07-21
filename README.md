# uptime

<img src="./logo.png" width="150px">

An uptime monitoring web application that is easy to understand, use, and extend.

![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/khalidx/uptime.svg?style=flat-square)

![GitHub](https://img.shields.io/github/license/khalidx/uptime.svg?style=flat-square)
![GitHub package.json version](https://img.shields.io/github/package-json/v/khalidx/uptime.svg?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/khalidx/uptime.svg?style=flat-square)

![GitHub last commit](https://img.shields.io/github/last-commit/khalidx/uptime.svg?style=flat-square)

- [uptime](#uptime)
  - [Screenshot](#Screenshot)
  - [Features](#Features)
  - [Getting started](#Getting-started)
  - [Components](#Components)
  - [Support](#Support)
  - [Developers](#Developers)
    - [Usage](#Usage)
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
- [ ] serverless infrastructure (1 day)
- [ ] ping thousands of endpoints and IPs (1 day)
- [ ] call thousands of endpoints with a pre-defined request (2 days)
- [ ] log to CloudWatch and use CloudWatch alarms (2 days)
- [ ] manually toggle health status, with message (3 days)
- [ ] scheduled checks
- [ ] manually trigger a check, outside of schedule (3 days)
- [ ] see debug logs for a check
- [ ] auth for UI and API users
- [ ] persistent history (3 days)
- [ ] post status and scheduled maintenance messages (5 days)
- [ ] notifications via email, sms, slack, and webhooks (5 days)
- [ ] webpage screenshot support (7 days)
- [ ] load testing support with artillery (7 days)
- [ ] one-click AWS deployment
- [ ] serverless deployment
- [ ] terraform deployment

Nice to have:

- logo
- literate

## Getting started

Coming soon.

## Components

- `uptime-ui` (the uptime web application frontend)
- `uptime-app` (the uptime serverless application backend)

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

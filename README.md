# [uptime](https://khalidx.github.io/uptime/)

<img src="./logo.png" width="150px" />

An uptime monitoring web application that is easy to understand, use, and extend.

![GitHub](https://img.shields.io/github/license/khalidx/uptime.svg?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/khalidx/uptime.svg?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/khalidx/uptime.svg?style=flat-square)

- [uptime](#uptime)
  - [Screenshot](#screenshot)
  - [Getting started](#getting-started)
  - [API](#api)
  - [Support](#support)
  - [Developers](#developers)
    - [Components](#components)
    - [Usage](#usage)
      - [clone](#clone)
      - [install](#install)
      - [deploy](#deploy)
      - [dev](#dev)
      - [docker](#docker)

## Screenshot

<img src="./screenshot.png" width="500px" />

## Getting started

`uptime` is easy to deploy to your AWS account, with a one-liner for deployment.

1. Make sure that the `AWS_REGION` and `AWS_PROFILE` environment variables are set, or that you have the appropriate AWS region and credentials configured elsewhere in your environment

2. Make sure that you have `node` and `npm`

3. Clone this repository, with `git clone https://github.com/khalidx/uptime`

4. Run the following command to build and deploy:

```sh
npm install && npm run deploy
```

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

[Open a GitHub issue](https://github.com/khalidx/uptime/issues/new) to ask a question, report a bug, raise a concern, or request a new feature.

- [Completed features](https://github.com/khalidx/uptime/issues?utf8=%E2%9C%93&q=is%3Aclosed+label%3Aenhancement)
- [Open issues](https://github.com/khalidx/uptime/issues)

## Developers

This section is for developers looking to develop, modify, or extend this project.

### Components

- `src/app` (the uptime serverless application backend)
- `src/ui/` (the uptime web application frontend)

### Usage

Prerequisites:

- `node` and `npm`
- Ensure the `AWS_REGION` and `AWS_PROFILE` environment variables are set, or that you have the appropriate AWS region and credentials configured elsewhere in your environment.

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

#### deploy

Deploy the application and site to AWS.

```sh
npm run deploy
```

#### dev

Starts the project with a development server and hot-reload, for developing the backend and front-end, locally.

Make sure the application is deployed first, so that non-local assets (like DynamoDb) are available for use.

```sh
npm run dev
```

#### docker

Alternatively, build, deploy the backend, and run the UI with Docker.

Make sure to provide your AWS credentials and target region as build arguments.

```sh
docker build \
--build-arg AWS_ACCESS_KEY_ID=<your-aws-key> \
--build-arg AWS_SECRET_ACCESS_KEY=<your-aws-secret> \
--build-arg AWS_REGION=us-east-1 \
-t uptime .

docker run --rm -p 8080:8080 uptime
```

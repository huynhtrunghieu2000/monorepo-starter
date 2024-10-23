# Turborepo Docker Starter with Vite React App

This is an enhanced Docker starter Turborepo that includes a Vite React application.

## Using this example

Run the following command:

```sh
npx create-turbo@latest -e with-docker
```

## What's inside?

This Turborepo includes the following:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) app
- `web-vite`: a [Vite](https://vitejs.dev/) + [React](https://reactjs.org/) app
- `api`: an [Express](https://expressjs.com/) server
- `@repo/ui`: a React component library
- `@repo/logger`: Isomorphic logger (a small wrapper around console.log)
- `@repo/eslint-config`: ESLint presets
- `@repo/typescript-config`: tsconfig.json's used throughout the monorepo
- `@repo/jest-presets`: Jest configurations

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Vite React App Features

The `web-vite` app includes:

- [TypeScript](https://www.typescriptlang.org/) for type safety
- [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for code linting and formatting
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Storybook](https://storybook.js.org/) for component development
- [Vitest](https://vitest.dev/) and [Playwright](https://playwright.dev/) for testing
- [TanStack Router](https://tanstack.com/router/v1), [TanStack Query](https://tanstack.com/query/latest), and [TanStack Table](https://tanstack.com/table/v8) for modern React development
- [Zustand](https://zustand-demo.pmnd.rs/) for state management
- [React Hook Form](https://react-hook-form.com/) and [Zod](https://zod.dev/) for form handling and validation
- [i18next](https://www.i18next.com/) for internationalization

### Docker

This repo is configured to be built with Docker and Docker Compose. To build all apps:

```
# Install dependencies
yarn install

# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create app_network

# Build prod using new BuildKit engine
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build

# Start prod in detached mode
docker-compose -f docker-compose.yml up -d
```

Open http://localhost:3000.

To shutdown all running containers:

```
# Stop all running containers
docker kill $(docker ps -q) && docker rm $(docker ps -a -q)
```

### Remote Caching

This example includes optional remote caching. In the Dockerfiles of the apps, uncomment the build arguments for `TURBO_TEAM` and `TURBO_TOKEN`. Then, pass these build arguments to your Docker build.

You can test this behavior using a command like:

`docker build -f apps/web/Dockerfile . --build-arg TURBO_TEAM=“your-team-name” --build-arg TURBO_TOKEN=“your-token“ --no-cache`

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting

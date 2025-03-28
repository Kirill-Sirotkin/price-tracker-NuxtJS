# Bitcoin Price Tracker

[ReadMe на русском](README_ru.md)

## Description

This projects aims to provide a simple website app to display historical Bitcoin price in USD.

## Features

- Intuitive UI
- Price time-series data display on a graph
- Preset time periods as well as custom time period input

## Technical features

- Uses Coindesk API to fetch Bitcoin price
- Prices are only fetched if prices for selected dates do not exist in the database
- Docker compose available

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

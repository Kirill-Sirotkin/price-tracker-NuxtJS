# Bitcoin Price Tracker

[ReadMe in English](README.md)

## Описание

Этот проект нацелен на предоставление простого веб-приложения для отображения исторических цен на Биткоин в Долларах США.

## Особенности

- Интуитивный пользовательский интерфейс
- Временные данные цены отображаются на графике
- Есть предустановленные временные периоды, а также возможность выбрать собственный период

## Техническе особенности

- Для получения актуальных цен используется Coindesk API
- Обращение к API происходит только если цен на выбранные даты нет в базе данных
- Доступен docker compose

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

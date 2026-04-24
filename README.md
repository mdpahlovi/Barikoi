# Barikoi - Location Finder

## Live Demo

- Repository: [https://github.com/mdpahlovi/Barikoi](https://github.com/mdpahlovi/Barikoi)
- Deployment: [https://barikoi-seven.vercel.app/](https://barikoi-seven.vercel.app/)

## Tech Stack

- Next.js
- TypeScript
- Redux Toolkit
- Tailwind CSS
- `react-bkoi-gl`
- `barikoiapis`

## Getting Started

### Prerequisites

> Node.js, Barikoi API Key

### Installation & Run

```bash
git clone https://github.com/mdpahlovi/Barikoi.git
cd Barikoi
npm install
# Set environment variables
npm run dev
```

> Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_BARIKOI_API_KEY=your_barikoi_api_key
```

## Project Structure

```text
src/
  app/
    layout.tsx
    page.tsx
    StoreProvider.tsx
  components/
    barikoi-map.tsx
    header.tsx
    search-bar.tsx
    search-result.tsx
  lib/
    features/location/locationSlice.ts
    hooks.ts
    store.ts
```

## Assignment Questions

### 1. What trade-offs did you consciously make due to time constraints?

- I kept focused on the required workflow only: search, result selection, and map viewing.
- I used a single redux slice instead of splitting search, and async actions into separate files.

### 2. If this app needed to scale (more data, more features), what would you refactor first?

- I would separate my backend for server side caching, rate limiting, logging, and request control.





/weather-info-app
│
├── /public
│   ├── /images            # Store static assets like icons or images
│
├── /src
│   ├── /components
|   ├── ├── /ui
|   ├── ├── /atoms
│   │
│   ├── /lib
│   │   ├── /redux
|   |   ├── ├── /api
|   |   ├── ├── /slices
|   |   ├── store.ts
|   |   |
│   ├── /pages
│   │   ├── index.tsx               # Landing page (Google-style search interface)
│   │   ├── weather.tsx             # Weather information page
│   │   ├── _app.tsx                # Redux store setup
│   │
│   ├── /redux
│   │   ├── store.ts                # Redux store setup
│   │   └── locationSlice.ts        # Slice for managing weather state
│   │
│   │
│   ├── /styles
│   │   ├── globals.css             # Global styles (minimized custom CSS)
│
│
├── .env.local                      # Store Weather API Key securely
├── next.config.js                  # Next.js configuration
├── tailwind.config.js              # Tailwind configuration
└── package.json

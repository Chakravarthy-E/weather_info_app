# Weather Information Application

This is a weather information application built using **Next.js**, **TypeScript**, **Redux**, and **TailwindCSS**. The application allows users to search for localities and view detailed weather information based on the selected locality.

## Features

- **Search Functionality**: Autocomplete suggestions for localities when typing in the search box.
- **Weather Information**: Fetches and displays real-time weather details like temperature, humidity, wind speed, etc., using the [WeatherUnion API](https://www.weatherunion.com/).
- **Responsive Design**: Fully responsive UI that works seamlessly across all device sizes.
- **Minimal and Clean UI/UX**: Google-like minimalist design for an easy and pleasant user experience.

## Technologies Used

- **Next.js**: Framework for building server-side rendering and static web applications using React.
- **TypeScript**: Static type checker for JavaScript, improving code quality and development experience.
- **Redux**: State management for handling application state and API requests.
- **RTK Query**: Redux toolkit's query side for data fetching and caching.
- **TailwindCSS**: Utility-first CSS framework for custom styling.
- **WeatherUnion API**: Free weather API for fetching locality-based weather information.

## Setup and Installation

To get this project up and running on your local machine, follow these steps:

### Prerequisites

Make sure you have the following installed on your system:

- Node.js (v16 or above)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Chakravarthy-E/weather_info_app.git
```

2. Navigate this project
```bash
cd weather_info_app
```

3.Install the dependencies
```bash
npm install
```
4. Create a .env.local file in the root directory and add your WeatherUnion API key:
```bash
NEXT_PUBLIC_WEATHER_API_KEY=your_weatherunion_api_key
```

5. Run the development server:
```bash
npm run dev
```

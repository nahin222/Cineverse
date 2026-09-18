# 🎬 CineVerse

A responsive, feature-packed **Movie & TV Show Explorer Application** built with React, Vite, and Tailwind CSS.

Users can browse top-rated television shows and films, perform live searches by title, filter by genres, sort dynamically, and inspect detailed overviews in an interactive modal.

---

## 🌟 Key Features

### 1. 🏠 Home Page
- **Navigation Bar:**
  - Modern brand identity and logo (`🎬 CineVerse`).
  - Navigation links (`Home`, `Movies`).
  - Prominent Call-To-Action button navigating to the Movie Listing page.
  - Fully responsive mobile drawer.
- **Hero Banner:**
  - Cinematic dark aesthetic with gradient overlays and ambient lighting.
  - Main Heading: `DISCOVER MOVIES`.
  - Engaging description: `Explore and discover your favorite movies from around the world.`
  - Call-To-Action (CTA) button: `Explore Now` linking directly to `/movies`.
- **Featured / Trending Section:**
  - Highlights top-rated television shows (`⭐ 8.0+`).
- **Footer:**
  - Brand info, copyright (`© 2026 CineVerse`), and TVMaze API links.

### 2. 📋 Movie Listing Page (`/movies`)
- **Prominent Search Bar:**
  - Real-time search with debounced querying against `api.tvmaze.com/search/shows?q=:query`.
  - Clear button and active search indicator.
- **Default Catalog Feed:**
  - Fetches and displays shows from `api.tvmaze.com/shows`.
- **Filters & Sorting:**
  - Filter by genre (*Drama, Action, Comedy, Science-Fiction, Thriller, Crime, Horror, Romance, Adventure*).
  - Sort by Rating (High-to-Low, Low-to-High), Release Year (Newest, Oldest), or Title (A-Z).
  - Dynamic result counter.
- **Responsive Movie Cards:**
  - Movie poster image with fallback placeholder for missing artwork.
  - Title and primary genre badge.
  - Rating (`⭐ 8.5`) and Release Date/Year (`📅 2024`).
  - `See Details` interactive button.
  - Responsive Grid: 1 column (mobile), 2 columns (tablet), 3–4 columns (desktop).

### 3. 🎞️ Movie Details Modal
- Click **See Details** on any card to launch an in-depth modal overlay.
- Large backdrop/poster preview.
- Title, rating badge, release date, and runtime.
- Genre tags and show status.
- Full overview / summary text cleanly parsed.
- Network/Platform, language, and official site link.
- **Multiple closing options:**
  - Close button (`✕`) at the top-right corner.
  - Dedicated `[❌ Close]` button at the bottom.
  - Click outside modal (backdrop overlay).
  - Keyboard shortcut (`Escape` key).
  - Automatically disables background body scrolling while open.

---

## 🛠️ Technology Stack

- **Core Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router (`react-router`)
- **Styling:** Tailwind CSS 4.3.3 (`@tailwindcss/vite` & `tailwindcss`)
- **Icons:** Lucide React
- **API Source:** [TVMaze API](https://www.tvmaze.com/api)
  - All Shows: `GET https://api.tvmaze.com/shows`
  - Search Shows: `GET https://api.tvmaze.com/search/shows?q=:query`

---

## 📁 Project Directory Structure

```text
movie-explorer/
├── public/
│   └── favicon.svg              # Custom cinema SVG favicon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Brand logo, nav links & CTA button
│   │   ├── HeroBanner.jsx       # Hero banner matching assignment wireframe
│   │   ├── Footer.jsx           # Application name, copyright & links
│   │   ├── SearchBar.jsx        # Search bar input matching wireframe
│   │   ├── FilterBar.jsx        # Genre filters & sort controls
│   │   ├── MovieCard.jsx        # Reusable movie card with poster & details
│   │   ├── MovieModal.jsx       # Interactive modal overlay with details & close actions
│   │   └── LoadingSkeleton.jsx  # Smooth skeleton cards for loading feedback
│   ├── pages/
│   │   ├── HomePage.jsx         # Landing page (Navbar + Hero + Featured + Footer)
│   │   └── MoviesPage.jsx       # Listing page (Navbar + Search + Grid + Modal + Footer)
│   ├── services/
│   │   └── api.js               # TVMaze API integration and fallback handler
│   ├── utils/
│   │   └── formatters.js        # HTML sanitizers, rating & date formatters
│   ├── App.jsx                  # React Router configuration
│   ├── main.jsx                 # Entry point
│   └── index.css                # Tailwind directives and custom theme classes
├── index.html                   # HTML template
├── package.json                 # Project dependencies & scripts
├── tailwind.config.js           # Tailwind theme configuration
├── postcss.config.js            # PostCSS configuration
└── vite.config.js               # Vite bundler configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or later)
- npm (v9.0.0 or later)

### Installation & Local Setup

1. Navigate to the project directory:
   ```bash
   cd movie-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

### Production Build

To compile a production-ready bundle:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 🌐 Deployment Instructions

### Deploy to Vercel
1. Push the code to a public GitHub repository.
2. Go to [Vercel](https://vercel.com) and import the repository.
3. Keep the default settings (Root directory: `./` or `./movie-explorer`, Build command: `npm run build`, Output directory: `dist`).
4. Click **Deploy**.

### Deploy to Netlify
1. Connect your GitHub repository to [Netlify](https://netlify.com).
2. Set Build command to `npm run build` and Publish directory to `dist`.
3. Add a `_redirects` file with `/* /index.html 200` to handle client-side routing.

---

## 📄 License
This project is open source and available under the MIT License.

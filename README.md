# 🏟️ TurfFinder

> Find and explore sports turfs near you — football, cricket, basketball and more.

**Live Demo → [turf-finder-jade.vercel.app](https://turf-finder-jade.vercel.app)**

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=flat&logo=tailwindcss)
![Google Maps](https://img.shields.io/badge/Google%20Maps-API-4285F4?style=flat&logo=googlemaps)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat&logo=vercel)

---

## 📸 Overview

TurfFinder is a React web application that helps users discover and explore sports turfs in their city. Inspired by Airbnb and Zomato's map-based search experience, it features a two-column layout with a scrollable turf list on the left and an interactive Google Map on the right.

---

## ✨ Features

- 🔍 **Live Search** — filter turfs by name, location, or sport in real time
- 🗺️ **Google Maps Integration** — interactive map with turf markers
- 📍 **Current Location** — auto-centers map to your location with a blue dot
- 🎯 **Smart Filters** — filter by sport, price range, and availability
- 🔄 **Bi-directional Highlighting** — clicking a card highlights its map pin and vice versa
- 🔐 **Authentication** — Login and Signup with Player / Owner role selection
- 🏠 **Owner Dashboard** — dedicated dashboard for turf owners (listing feature coming soon)
- 📱 **Responsive Layout** — works across screen sizes

---

## 🖥️ Tech Stack

| Technology | Purpose |
|---|---|
| ReactJS 18 | UI framework |
| React Router v6 | Client-side routing |
| Tailwind CSS v3 | Utility-first styling |
| @react-google-maps/api | Google Maps + markers |
| React Context API | Auth state management |
| Vercel | Deployment |

---

## 📁 Project Structure

```
turf-finder/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── SearchBar.js
│   │   ├── Sidebar.js
│   │   ├── TurfCard.js
│   │   ├── TurfList.js
│   │   ├── MapContainer.js
│   │   └── ProtectedRoute.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── data/
│   │   └── turfs.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   └── OwnerDashboard.js
│   ├── services/
│   │   └── turfService.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .env.example
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v16+
- A Google Maps API key with **Maps JavaScript API** enabled

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/turf-finder.git
cd turf-finder

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Add your Google Maps API key to .env

# 4. Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

Create a `.env` file in the project root:

```
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

> The app works without an API key — the map panel shows a styled placeholder with clickable turf pins instead.

---

## 🔐 Authentication

Auth state is managed via React Context. Two user roles are supported:

| Role | Access |
|---|---|
| **Player** | Search and explore turfs |
| **Owner** | Access to Owner Dashboard (turf listing coming soon) |

**Demo tip:** Use an email containing `"owner"` to log in as an Owner role.

---

## 🗺️ Map Features

- Turf markers shown as **green circles** on the map
- Active/selected turf marker becomes **larger and darker**
- Clicking a marker opens an **info window** with turf details
- **Blue dot** shows your current location (requires location permission)
- **📍 Recenter button** (bottom right) to jump back to your location

---

## 🛣️ Roadmap

- [ ] Backend API with Node.js + Express
- [ ] MongoDB database with real turf data
- [ ] JWT-based authentication
- [ ] Owner turf listing and management
- [ ] Booking system for players
- [ ] Image uploads via Cloudinary
- [ ] Reviews and ratings

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](LICENSE)

---

<p align="center">Made with ❤️ using React + Google Maps</p>

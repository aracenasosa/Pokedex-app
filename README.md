# Pokédex App

A modern, responsive Pokédex web application built with React and TypeScript. Browse, search, and explore detailed information about Pokémon.

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.90.2-FF4154?logo=reactquery)
![Lodash](https://img.shields.io/badge/Lodash-4.17.21-3492FF?logo=javascript)

## ✨ Features

- **Infinite Scroll** - Automatically loads more Pokémon as you scroll
- **Type Filtering** - Filter by Pokémon type (Fire, Water, Grass, etc.)
- **Search** - Search by name or Pokédex number with debounced input
- **Detailed View** - Comprehensive stats, abilities, evolutions, and Pokédex entries
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Smart Caching** - Powered by @tanstack/react-query for optimal performance

## 🛠️ Tech Stack

- **React 19.1.1** - UI library
- **TypeScript 5.8.3** - Type safety
- **Vite 7.1.7** - Build tool
- **@tanstack/react-query 5.90.2** - Server state management & caching
- **React Router 7.9.5** - Routing
- **Lodash 4.17.21** - Utility functions (debounce)
- **Sass/SCSS** - Styling
- **PokeAPI** - Pokémon data source

## 📦 Installation

```bash
# Clone repository
git clone <repository-url>
cd react-app-test

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🚀 Usage

1. **Browse**: Scroll through the grid to see all Pokémon (infinite scroll)
2. **Filter**: Click type chips to filter by Pokémon type
3. **Search**: Type a name or ID in the search bar
4. **View Details**: Click any card to see comprehensive information
5. **Navigate**: Use arrow buttons to move between Pokémon

## 📁 Project Structure

```
src/
├── components/
│   ├── common/        # Shared components
│   ├── detail/        # Detail screen
│   └── list/          # List screen
├── services/          # API services
├── shared/            # Utilities, hooks, constants
├── models/            # TypeScript interfaces
└── assets/            # Images and icons
```

## 🎯 Key Technologies

- **@tanstack/react-query**: Handles all data fetching, caching, and infinite scroll pagination
- **Lodash**: Debounces search input to prevent excessive API calls
- **React Router**: Client-side routing for navigation
- **Responsive CSS**: Mobile-first design with SCSS

**Made with ❤️ using React, TypeScript, and @tanstack/react-query**

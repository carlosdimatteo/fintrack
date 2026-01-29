# FinTrack

A personal finance tracking application. Track expenses, income, investments, transfers, debts, and set financial goals.


## Tech Stack

- **React** - UI framework
- **React Router DOM** - Client-side routing
- **Styled Components** - CSS-in-JS styling
- **React Query** - Server state management
- **Axios** - HTTP client

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Backend API running on port 3001 (or configure `REACT_APP_API_URL`)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd fintrack

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable            | Default | Description          |
| ------------------- | ------- | -------------------- |
| `REACT_APP_API_URL` | `/api`  | Backend API base URL |

For production, set `REACT_APP_API_URL` to your backend URL.

### Development Proxy

In development, the app proxies API requests to `http://localhost:3001` (configured in `package.json`).

## Project Structure

```
src/
├── assets/
│   └── icons/          # SVG icons for navbar
├── components/         # Reusable UI components
│   ├── Button/
│   ├── Card/
│   ├── Form/
│   ├── Input/
│   ├── Layout/         # Shared layout components
│   ├── ListItem/
│   ├── navbar/
│   ├── ProgressBar/
│   ├── Select/
│   ├── Tabs/
│   ├── Textarea/
│   └── Toast/          # Toast notification system
├── containers/         # Page components
│   ├── Accounting/
│   ├── Budget/
│   ├── Dashboard/
│   ├── Debt/
│   ├── Expense/
│   ├── Goals/
│   ├── Income/
│   ├── Investment/
│   ├── Main/           # App shell and routing
│   ├── Showcase/       # Component showcase (dev)
│   └── Transfer/
├── hooks/
│   └── useAPI.jsx      # All API hooks (React Query)
├── theme/
│   └── index.js        # Theme configuration
├── utils/
│   ├── currency.js     # Currency conversion utilities
│   └── formatters.js   # Formatting utilities
├── App.jsx
└── index.js
```


## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm start`     | Start development server |
| `npm run build` | Build for production     |
| `npm test`      | Run tests                |

## License

Private project.

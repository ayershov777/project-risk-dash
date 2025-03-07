# Renewable Energy Risk Dashboard - Client Application

This is the frontend React application for the Renewable Energy Risk Dashboard. The application provides tools for monitoring, analyzing, and managing risk factors in renewable energy projects.

## Project Structure

```
src/
├── components/
│   ├── common/                     # Reusable UI components
│   │   ├── CardGrid.jsx            # Grid for card layouts
│   │   ├── InfoGrid.jsx            # Information grid display
│   │   ├── LoadingErrorStates.jsx  # Loading, error, empty states
│   │   ├── PageHeader.jsx          # Page header component
│   │   ├── RiskIndicator.jsx       # Risk score indicator
│   │   ├── SearchFilterBar.jsx     # Search and filtering 
│   │   ├── SentimentIndicator.jsx  # Sentiment analysis display
│   │   ├── StatCard.jsx            # Statistics card
│   │   ├── TabNavigation.jsx       # Tab navigation
│   │   └── index.js                # Export all common components
│   │
│   ├── company/                    # Company-related components
│   │   ├── NewsCard.jsx            # Company news display
│   │   └── index.js                # Export company components
│   │
│   ├── financial/                  # Financial components
│   │   ├── MetricsTable.jsx        # Financial metrics display
│   │   └── index.js                # Export financial components
│   │
│   ├── layout/                     # Layout components
│   │   ├── Navbar.jsx              # Top navigation bar
│   │   ├── Sidebar.jsx             # Application sidebar
│   │   └── index.js                # Export layout components
│   │
│   ├── project/                    # Project components
│   │   ├── Documents/              # Project document management
│   │   │   ├── DocumentItem.jsx    # Individual document display
│   │   │   ├── DocumentList.jsx    # Document listing with filters
│   │   │   ├── UploadSection.jsx   # Document upload interface
│   │   │   └── index.jsx           # Main document component
│   │   └── index.js                # Export project components
│   │
│   ├── visualizations/             # Data visualization components
│   │   ├── risk/                   # Risk visualizations
│   │   │   ├── DoughnutChart.jsx   # Risk doughnut chart
│   │   │   ├── LineChart.jsx       # Risk trend line chart
│   │   │   └── index.js            # Export risk visualizations
│   │   └── index.js                # Export all visualizations
│   │
│   ├── pages/                      # Page components
│   │   ├── AllCompanies.jsx        # Companies listing page
│   │   ├── CompanyProfile.jsx      # Company details page
│   │   ├── Dashboard.jsx           # Dashboard page
│   │   ├── ProjectDetail.jsx       # Project details page
│   │   ├── ProjectList.jsx         # Projects listing page
│   │   └── ppa-analyzer/           # PPA Analyzer module
│   │       ├── PpaAnalyzer.jsx     # Main PPA analyzer component
│   │       ├── ProjectSelection.jsx # Project selection component
│   │       ├── DocumentUpload.jsx  # Document upload component
│   │       ├── tabs/               # Tab container components
│   │       │   ├── RiskAnalysisTab.jsx    # Risk analysis tab
│   │       │   ├── FinancialImpactTab.jsx # Financial impact tab
│   │       │   ├── ComplianceMonitorTab.jsx # Compliance tab
│   │       │   └── index.js        # Export tabs components
│   │       ├── risk/               # Risk analysis components
│   │       │   ├── RiskSummary.jsx # Risk summary cards
│   │       │   ├── RiskCharts.jsx  # Risk charts container
│   │       │   ├── RiskCategoryChart.jsx  # Category breakdown chart
│   │       │   ├── RiskSeverityChart.jsx  # Severity breakdown chart
│   │       │   ├── RiskDetails.jsx # Detailed risk information
│   │       │   └── index.js        # Export risk components
│   │       ├── financial/          # Financial components
│   │       │   ├── FinancialTerms.jsx     # Financial terms display
│   │       │   ├── FinancialSimulator.jsx # Financial simulation
│   │       │   ├── PriceEvolutionChart.jsx # Price evolution chart
│   │       │   ├── RevenueChart.jsx       # Revenue comparison chart
│   │       │   ├── CumulativeChart.jsx    # Cumulative cash flow chart
│   │       │   └── index.js        # Export financial components
│   │       ├── compliance/         # Compliance components
│   │       │   ├── ComplianceCalendar.jsx # Compliance deadlines
│   │       │   ├── ComplianceRequirements.jsx # Requirements list
│   │       │   ├── RegulatoryTimeline.jsx # Regulatory timeline
│   │       │   └── index.js        # Export compliance components
│   │       └── index.js            # Export PPA analyzer components
│   │
│   └── App.jsx                     # Main App component with routing
│
├── contexts/
│   └── AuthContext.jsx             # Authentication context provider
│
├── services/
│   └── api.js                      # API service for backend communication
│
├── utils/
│   ├── documentUtils.js            # Document handling utilities
│   ├── formatters.js               # Data formatting utilities
│   └── ...                         # Other utility functions
│
├── index.jsx                       # Application entry point
└── index.css                       # Global styles
```

## Technology Stack

- **React 18**: Frontend library
- **React Router 6**: Client-side routing
- **Axios**: HTTP client for API requests
- **D3.js**: Data visualization library
- **Recharts**: React charting library based on D3
- **Leaflet**: Interactive maps
- **TailwindCSS**: Utility-first CSS framework
- **Storybook**: Component documentation and testing

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/renewable-risk-dashboard.git
   cd renewable-risk-dashboard/client
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Configure environment variables:
   Create a `.env` file in the client directory with:
   ```
   REACT_APP_API_URL=https://project-risk-dashboard-api-9685249a8964.herokuapp.com/api
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Key Features

### Authentication

The application uses context-based authentication with cookie-based sessions. The `AuthContext` provides:

- User authentication state
- Login/logout functionality
- Protected routes

### Dashboard

The dashboard provides an overview of:
- Project statistics
- High-risk projects
- Recent project updates

### Project Management

- View all projects with filtering and search
- Detailed project information
- Risk analysis and metrics
- Document management
- Location mapping

### Company Profiles

- Company directory with search and filtering
- Detailed company profiles
- Risk metrics and historical trends
- Financial analysis
- News monitoring with sentiment analysis

### PPA Analyzer

Power Purchase Agreement (PPA) analysis tool that provides:
- Document upload and management
- Risk analysis of agreement terms
- Financial impact assessment with interactive charts:
  - Price evolution over contract term
  - Revenue and present value comparison
  - Cumulative cash flow projection
- Compliance monitoring with deadlines and requirements

### Risk Visualization

- Doughnut charts for risk category breakdown
- Line charts for historical risk trends
- Bar charts for severity distribution
- Risk score indicators with consistent color coding

## Code Organization

### Modular Component Structure

The application follows a modular component structure:
- **Common components**: Reusable UI components shared across the application
- **Domain components**: Components specific to a business domain (company, project, etc.)
- **Layout components**: Application structure and navigation elements
- **Page components**: Top-level components that represent application pages
- **Visualizations**: Components for data visualization

### Component Categories

Components are organized into categories based on their function:

1. **Layout Components** (`layout/`): Define the overall application structure
2. **Common Components** (`common/`): Reusable UI elements used across the application
3. **Domain Components**: Business-specific components organized by domain area:
   - `company/`: Company-related components
   - `financial/`: Financial analysis components
   - `project/`: Project management components
4. **Visualization Components** (`visualizations/`): Data visualization components
5. **Page Components** (`pages/`): Top-level components that compose a complete page

### PPA Analyzer Module

The PPA Analyzer is a self-contained module with its own component hierarchy:

- **Main Component**: `PpaAnalyzer.jsx` - Orchestrates the entire module
- **Input Components**: 
  - `ProjectSelection.jsx` - Project selection interface
  - `DocumentUpload.jsx` - Document upload and management
- **Tab Components**: Organize content by analysis type
  - `RiskAnalysisTab.jsx` - Risk analysis interface
  - `FinancialImpactTab.jsx` - Financial impact analysis
  - `ComplianceMonitorTab.jsx` - Compliance monitoring
- **Analysis Components**: Specialized components by domain
  - Risk analysis components (risk summary, charts, details)
  - Financial components (terms display, simulator, charts)
  - Compliance components (calendar, requirements, timeline)

## Layout Structure

The application uses a consistent layout across all pages:

- **Navbar**: Top navigation bar with app title, user information, and authentication controls
- **Sidebar**: Navigation sidebar with links to main application sections
- **Main Content Area**: Central area where page content is rendered

The layout components are designed to work together with React Router to provide a cohesive user experience while maintaining separation of concerns.

### Page Components

Page components are composed of multiple smaller components to create complete views:

```jsx
// Example page structure
<div>
  <Navbar />         {/* From layout/ */}
  <Sidebar />        {/* From layout/ */}
  <main>
    <PageHeader />   {/* From common/ */}
    <StatCards />    {/* Domain-specific components */}
    <TabNavigation /> {/* From common/ */}
    <DetailSection /> {/* Domain-specific components */}
  </main>
</div>
```

## Data Flow

- **API Service**: Centralized API client for all backend communication
- **Context**: Application-wide state management via React Context
- **Component State**: Local state for UI components

## Development Tools

### Storybook

The project includes Storybook for component development and documentation:

```bash
npm run storybook
# or
yarn storybook
```

This will launch Storybook at [http://localhost:6006](http://localhost:6006).

### Testing

Run tests with:

```bash
npm test
# or
yarn test
```

## Build for Production

```bash
npm run build
# or
yarn build
```

This creates an optimized production build in the `build` directory.

## Best Practices

- **Component Naming**: PascalCase for component files and functions
- **Imports**: Group imports (React, third-party, local)
- **Props**: Document props with JSDoc comments
- **State Management**: Use hooks for component state
- **Error Handling**: Implement proper error boundaries and fallbacks
- **Responsive Design**: All components are responsive for different screen sizes

## Visualization Components

The application uses several visualization techniques:

- **Charts**:
  - Line charts for time-series data (using Recharts)
  - Bar charts for comparisons (using Recharts)
  - Pie/Doughnut charts for proportions (using Recharts)
  
- **Maps**:
  - Interactive maps for project locations (using React Leaflet)
  
- **Indicators**:
  - Color-coded risk scores
  - Progress bars and gauges
  - Sentiment analysis indicators
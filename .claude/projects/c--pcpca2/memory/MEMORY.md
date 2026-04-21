# Fitness Tracker Activities Project

## Architecture Overview
- **State Management**: React Context + useReducer pattern
- **Routing**: React Router v6 with client-side routing
- **Testing**: Requires specific data-testid attributes for automation
- **Deployment**: Vercel with routing rewrites

## Key Files & Structure
- `/src/context.jsx` - Context and Reducer for state management
- `/src/hooks.js` - Custom useActivity hook
- `/src/api.js` - API integration with password authentication
- `/src/components/` - React components (ActivityList, ActivityDetail, Filter, Stats)
- `/vercel.json` - Deployment configuration with rewrites

## Routes Implemented
- `/` - Default to Activities list
- `/activities` - Display all valid activities
- `/activities/:id` - Activity detail with efficiency calculation
- `/filter` - Filter view with search and goal achieved toggle
- `/stats` - Statistics page with window.appState exposed

## Validation Rules
Valid activities must have:
- steps > 0
- caloriesBurned > 0
- workoutMinutes > 0
- goalAchieved is boolean

## Data-TestIds
- `data-testid="activity-item"` - List items
- `data-testid="filter-input"` - Search input
- `data-testid="total-activities"` - Total count
- `data-testid="goal-achieved"` - Goals achieved count
- `data-testid="goal-not-achieved"` - Goals not achieved count

## Efficiency Calculation
Formula: `caloriesBurned / workoutMinutes` (computed dynamically on detail page)

## API Integration
- Base URL: https://t4e-testserver.onrender.com/api
- Password: 405506 (included in request headers)
- Endpoint: /activities

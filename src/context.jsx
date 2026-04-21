import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { getToken, getDataset } from './api';

export const ActivityContext = createContext();

const initialState = {
  activities: [],
  loading: true,
  error: null,
  filters: {
    search: '',
    goalAchieved: null,
    stepMinimum: 0
  }
};

export const activityReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVITIES':
      return {
        ...state,
        activities: action.payload,
        loading: false,
        error: null
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'SET_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.key]: action.payload.value
        }
      };
    case 'UPDATE_GOAL_ACHIEVED':
      return {
        ...state,
        activities: state.activities.map(activity =>
          activity.activityId === action.payload.id
            ? { ...activity, goalAchieved: true }
            : activity
        )
      };
    default:
      return state;
  }
};

export const ActivityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  // Fetch activities from server
  useEffect(() => {
    const loadActivities = async () => {
      try {
        // Step 1: Get Token
        const tokenRes = await getToken("E0323047", "405506", "B");
        console.log('Token response:', tokenRes);

        // Step 2: Fetch dataset
        const activities = await getDataset(tokenRes.token, tokenRes.dataUrl);
        console.log('Activities data:', activities);

        // Handle both array and object responses
        const activitiesArray = Array.isArray(activities) ? activities : activities.activities || [];
        dispatch({ type: 'SET_ACTIVITIES', payload: activitiesArray });
      } catch (err) {
        console.error('Error fetching activities:', err.message);
        dispatch({ type: 'SET_ERROR', payload: err.message });
      }
    };

    loadActivities();
  }, []);

  const setFilter = useCallback((key, value) => {
    dispatch({ type: 'SET_FILTER', payload: { key, value } });
  }, []);

  const getValidActivities = useCallback(() => {
    const activities = Array.isArray(state.activities) ? state.activities : [];
    return activities.filter(activity => {
      const isValid =
        typeof activity.steps === 'number' && activity.steps > 0 &&
        typeof activity.caloriesBurned === 'number' && activity.caloriesBurned > 0 &&
        typeof activity.workoutMinutes === 'number' && activity.workoutMinutes > 0 &&
        typeof activity.goalAchieved === 'boolean';
      return isValid;
    });
  }, [state.activities]);

  const getFilteredActivities = useCallback(() => {
    let activities = getValidActivities();

    if (state.filters.search) {
      activities = activities.filter(a =>
        (a.name || 'Unknown').toLowerCase().includes(state.filters.search.toLowerCase())
      );
    }

    if (state.filters.goalAchieved !== null) {
      activities = activities.filter(a => a.goalAchieved === state.filters.goalAchieved);
    }

    if (state.filters.stepMinimum > 0) {
      activities = activities.filter(a => a.steps >= state.filters.stepMinimum);
    }

    return activities;
  }, [getValidActivities, state.filters]);

  const getStats = useCallback(() => {
    const validActivities = getValidActivities();
    const stats = validActivities.reduce(
      (acc, activity) => {
        acc.totalActivities += 1;
        if (activity.goalAchieved) {
          acc.goalAchievedCount += 1;
        } else {
          acc.goalNotAchievedCount += 1;
        }
        return acc;
      },
      { totalActivities: 0, goalAchievedCount: 0, goalNotAchievedCount: 0 }
    );
    return stats;
  }, [getValidActivities]);

  const updateGoalAchieved = useCallback((id) => {
    dispatch({ type: 'UPDATE_GOAL_ACHIEVED', payload: { id } });
  }, []);

  const value = {
    state,
    dispatch,
    setFilter,
    getValidActivities,
    getFilteredActivities,
    getStats,
    updateGoalAchieved
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => useContext(ActivityContext);

import { useActivity } from '../hooks';
import { ActivityItem } from './ActivityItem';

export const ActivityList = () => {
  const { getFilteredActivities, state } = useActivity();
  const activities = getFilteredActivities();

  if (state.loading) {
    return <div className="loading">Loading activities...</div>;
  }

  if (state.error) {
    return <div className="error">Error: {state.error}</div>;
  }

  return (
    <div className="activity-list">
      <h1>Activities</h1>
      {activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        activities.map(activity => (
          <ActivityItem key={activity.activityId} activity={activity} />
        ))
      )}
    </div>
  );
};

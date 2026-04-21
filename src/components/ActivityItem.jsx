import { Link } from 'react-router-dom';
import { useActivity } from '../hooks';

export const ActivityItem = ({ activity }) => {
  const { updateGoalAchieved } = useActivity();

  return (
    <div className="activity-item" data-testid="activity-item">
      <Link to={`/activities/${activity.activityId}`}>
        <h3>{activity.name || 'Unknown'}</h3>
      </Link>
      <p>Steps: {activity.steps || 0}</p>
      <p>Date: {activity.date || 'No Data'}</p>
      <p>Goal Achieved: {activity.goalAchieved ? 'Yes' : 'No'}</p>
      {!activity.goalAchieved && activity.steps >= 8000 && (
        <button onClick={() => updateGoalAchieved(activity.activityId)}>
          Mark Goal as Achieved
        </button>
      )}
    </div>
  );
};

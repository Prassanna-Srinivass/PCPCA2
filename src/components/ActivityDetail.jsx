import { useParams, useNavigate } from 'react-router-dom';
import { useActivity } from '../hooks';

export const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getValidActivities } = useActivity();

  const activities = getValidActivities();
  const activity = activities.find(a => String(a.activityId) === String(id));

  if (!activity) {
    return (
      <div className="activity-detail">
        <button onClick={() => navigate('/activities')}>Back</button>
        <p>Activity not found.</p>
      </div>
    );
  }

  const efficiency = activity.caloriesBurned / activity.workoutMinutes;

  return (
    <div className="activity-detail">
      <button onClick={() => navigate('/activities')}>Back</button>
      <h1>{activity.name || 'Unknown'}</h1>
      <div className="details">
        <p><strong>Activity ID:</strong> {activity.activityId}</p>
        <p><strong>Steps:</strong> {activity.steps}</p>
        <p><strong>Calories Burned:</strong> {activity.caloriesBurned}</p>
        <p><strong>Workout Minutes:</strong> {activity.workoutMinutes}</p>
        <p><strong>Goal Achieved:</strong> {activity.goalAchieved ? 'Yes' : 'No'}</p>
        <p><strong>Date:</strong> {activity.date || 'No Data'}</p>
        <p><strong>Efficiency Score:</strong> {efficiency.toFixed(2)}</p>
      </div>
    </div>
  );
};

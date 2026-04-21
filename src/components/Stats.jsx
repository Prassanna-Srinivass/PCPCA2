import { useEffect } from 'react';
import { useActivity } from '../hooks';

export const Stats = () => {
  const { getStats } = useActivity();
  const stats = getStats();

  useEffect(() => {
    window.appState = stats;
  }, [stats]);

  return (
    <div className="stats">
      <h1>Activity Statistics</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h2>Total Activities</h2>
          <p className="stat-value" data-testid="total-activities">
            {stats.totalActivities}
          </p>
        </div>
        <div className="stat-card">
          <h2>Goals Achieved</h2>
          <p className="stat-value" data-testid="goal-achieved">
            {stats.goalAchievedCount}
          </p>
        </div>
        <div className="stat-card">
          <h2>Goals Not Achieved</h2>
          <p className="stat-value" data-testid="goal-not-achieved">
            {stats.goalNotAchievedCount}
          </p>
        </div>
      </div>
    </div>
  );
};

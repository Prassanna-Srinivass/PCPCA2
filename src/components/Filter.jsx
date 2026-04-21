import { useActivity } from '../hooks';

export const Filter = () => {
  const { state, setFilter } = useActivity();

  return (
    <div>
      <input
        type="text"
        placeholder="Search activities..."
        value={state.filters.search}
        onChange={(e) => setFilter('search', e.target.value)}
        data-testid="filter-input"
      />
      <input
        type="number"
        placeholder="Min steps"
        value={state.filters.stepMinimum}
        onChange={(e) => setFilter('stepMinimum', parseInt(e.target.value) || 0)}
        min="0"
      />
      <select
        value={state.filters.goalAchieved === null ? '' : state.filters.goalAchieved}
        onChange={(e) => {
          if (e.target.value === '') {
            setFilter('goalAchieved', null);
          } else {
            setFilter('goalAchieved', e.target.value === 'true');
          }
        }}
      >
        <option value="">All Goals</option>
        <option value="true">Goal Achieved</option>
        <option value="false">Goal Not Achieved</option>
      </select>
    </div>
  );
};

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ActivityProvider } from './context';
import { ActivityList } from './components/ActivityList';
import { ActivityDetail } from './components/ActivityDetail';
import { Filter } from './components/Filter';
import { Stats } from './components/Stats';

function AppContent() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <h1>Fitness Tracker</h1>
          <ul className="nav-links">
            <li><Link to="/activities">Activities</Link></li>
            <li><Link to="/filter">Filter</Link></li>
            <li><Link to="/stats">Statistics</Link></li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/activities" element={<ActivityList />} />
          <Route path="/activities/:id" element={<ActivityDetail />} />
          <Route path="/filter" element={
            <>
              <Filter />
              <ActivityList />
            </>
          } />
          <Route path="/stats" element={<Stats />} />
          <Route path="/" element={<ActivityList />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ActivityProvider>
        <AppContent />
      </ActivityProvider>
    </Router>
  );
}


export default App;

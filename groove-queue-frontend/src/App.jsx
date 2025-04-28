import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import AuthPage from './pages/AuthPage'; // Import your AuthPage component

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        <Routes>
          {/* Define route for home page (can be empty or have some content) */}
          <Route path="/" element={
            <>
              <h1>Welcome to the App</h1>
              <button onClick={() => setCount(count + 1)}>
                count is {count}
              </button>
            </>
          } />

          {/* Define the route for the AuthPage */}
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

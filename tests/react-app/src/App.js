import React, { useState, useEffect } from 'react';
import './App.css';



//ci sono 3 errori in questo file
function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    fetchUsers();
  }, [users]); 

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
     
      const data = await response.json();
      setUsers(user_data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>User List</h1>
      
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


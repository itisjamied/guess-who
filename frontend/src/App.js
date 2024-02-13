// import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import Login from './Login';
import Chat from './Chat';
import { auth } from './firebase'; 



function App() {
  const [user, setUser] = useState(null);

  const [roomCode, setRoomCode] = useState('');
const [joinChat, setJoinChat] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Sign Out Error", error);
    }
  };
  

  return (
    <div className="App">
    {user ? (
      <div>
        <div className='welcome'>
          <div>
          Welcome, {user.email}
          </div>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div> 
{user && !joinChat ? (
  <>
    <input
      value={roomCode}
      onChange={(e) => setRoomCode(e.target.value)}
      placeholder="Enter chat room code"
    />
    <button onClick={() => setJoinChat(true)}>Join Chat</button>
  </>
) : null}

{joinChat ? <Chat roomCode={roomCode} /> : null}

      </div>
    ) : (
      <Login />
    )}
  </div>
  );
}

export default App;



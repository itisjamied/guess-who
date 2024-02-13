import './Chat.css';

import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { auth, db } from './firebase';



const Chat = ({ roomCode }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const hardcodedRoomCode = "TEST123"; 

  

  useEffect(() => {
    const q = query(collection(db, "chats", hardcodedRoomCode, "messages"), orderBy("createdAt"));
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(fetchedMessages); // Ensure you're updating your state here
    });
  
    return () => unsubscribe(); // Clean up on unmount
  }, []);
  

  const sendMessage = async (e) => {

    e.preventDefault(); // Prevent the default form submission behavior
    if (!newMessage.trim()) return;
  
    // Continue with adding a new message to Firestore
    try {
      await addDoc(collection(db, "chats", hardcodedRoomCode, "messages"), {
        text: newMessage,
        createdAt: new Date(),
        userId: auth.currentUser.uid,
      });
      setNewMessage(''); // Reset input field after successful send
      console.log("message sent");
    } catch (error) {
      console.error("Error sending message: ", error);
      // Optionally handle the error (e.g., show an error message)
    }
  };
  
  

  return (
    <div className="chatform">
        <div>
            {messages.map(msg => (
                <p key={msg.id}>{msg.text}</p> // Ensure each message has a unique key and you're displaying the message text
            ))}
        </div>
        <form onSubmit={sendMessage}>
            <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            />
            <button type="submit">Send</button>
        </form>
    </div>
  );
};

export default Chat;

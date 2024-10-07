import { useEffect, useState } from 'react'
import { db, auth }  from "../utils/FirebaseManager";
import { query, collection, addDoc, onSnapshot, orderBy } from "firebase/firestore"; 

function Chat() {
  useEffect(() => {
    const q = query(collection(db, "chat"), orderBy("timestamp", "asc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const chats = [];
      const emails = [];
      snapshot.forEach((doc) => {
        chats.push(doc.data().chat);
        emails.push(doc.data().email);
      });
      setChats(chats);
      setEmails(emails)
    });
  }, []);

  const [emails, setEmails] = useState([]);
  const [chats, setChats] = useState([]);
  const [chat, setChat] = useState("");

  const onChat = async (e) => {
    e.preventDefault();
    setChat("");
    try {
      const docRef = await addDoc(collection(db, "chat"), {
        email: auth.currentUser.email,
        chat: chat,
        // Get epoch time
        timestamp: new Date().getTime(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <>
    <div>Chat</div>
    
    <div>
      {/* {
        (() => {
          const data = []
          for (let i = 0; i < 10; i++) {
            data.push(i)
          }
          return data
        })()
      } */}
      {
        chats.map((c, i) => (
          <div key={i}>
            ({emails[i]}){c}
          </div>
        ))
      }
    </div>
    
    <label>
    Chat:
    <input type="text" name="chat" value={chat} onChange={(e) => {
      setChat(e.target.value)
    }} />
  </label>
  <br />
  <input type="submit" value="send" onClick={onChat} />
  <br />
    </>
    

  )
}

export default Chat
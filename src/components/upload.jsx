import React, { useContext, useState } from 'react'
import './App.css'
import { v4 as uuid } from 'uuid'
import { AuthContext } from '../context/Authcontext';
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const Upload = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            if (text) {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text:text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                })
              })
            } else {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                })
              })
            }

            await updateDoc(doc(db, "userChats", currentUser.uid), {
              [data.chatId + ".lastMessage"]: {
                text,
              },
              [data.chatId + ".date"]: serverTimestamp(),
            })

            await updateDoc(doc(db, "userChats", data.user.uid), {
              [data.chatId + ".lastMessage"]: {
                text,
              },
              [data.chatId + ".date"]: serverTimestamp(),
            });
          });

        }

      );

    } else {
      if (text) {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text ,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          })
        })
      }

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      })

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
        [data.chatId+".username"]: data.user.uid,
      });
      setText("");
      setImg (null);
    }
    
  }

  return (
    <div className="uContainer">
      <input type="file" id='file' onChange={(e) => setImg(e.target.files[0])} />
      <label htmlFor="file">
      <i class='bx bxs-image-alt'>

      </i>
      </label>
      <div className="text">
        <input type="text" onChange={(e) => setText(e.target.value)} value={text}  />
      </div>
      <button onClick={handleSend}><i class='bx bxl-telegram'></i></button>
    </div>
  )
}

export default Upload

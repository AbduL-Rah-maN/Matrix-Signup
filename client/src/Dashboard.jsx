import React, { useEffect, useState } from 'react'
import Profile from './Dashboard/profile.jsx';
import SimpleGreenSlider from './figmaSlider'
import DashLeft from './Dashboard/Dashleft.jsx'
import { Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase/firebase.js"; 
import { onAuthStateChanged } from "firebase/auth"
import { getItems, addItem, updateItem, deleteItem } from './api';
import DashRight from './Dashboard/DashRight.jsx';



function Dashboard() {

  const [userData, setUserData] = useState({ displayName: "", email: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {

        setUserData({
          displayName: user.displayName || "",
          email: user.email || "",
          uid: user.uid
        });

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserData({
            displayName: data.displayName,
            email: user.email,
          });
        } else {
          setUserData({ displayName: "", email: user.email }); 
        }

        setLoading(false);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  


  return (
    <div className='bg-dashboard grid grid-cols-[3fr_9fr] h-full '>
      <div className='dash-left font-serif flex flex-col mt-10 items-center'>
        <div>
          <div className='flex justify-center'>
            < Profile />
          </div>

          <div className='text-white font-bold text-4xl'>{userData.email.split('@')[0]}</div>
          <div className='text-gray-400'>{userData.email}</div>
        </div>
        <div className='text-gray-400 font-bold pt-10 text-xl nav'>
          <button className='block my-2 py-1 text-white'>Dashboard</button>
          <button className='block my-2 py-1'>Expenses</button>
          <button className='block my-2 py-1'>Wallets</button>
          <button className='block my-2 py-1'>Summary</button>
          <button className='block my-2 py-1'>Accounts</button>
          <button className='block my-2 py-1'>Settings</button>
        </div>
        <div className="w-3 h-3 text-bold flex justify-center">
          <Link to="/Login"> 
            <button className='font-bold py-1 mt-8 px-2 text-gray-900 bg-white-500'> Logout </button>
          </Link>
        </div>
      </div>
      <div className='dash-right text-black bg-white w-full border-2 rounded-xl my-8'>
        <DashRight />
      </div>


    </div>


    
  )
}

export default Dashboard
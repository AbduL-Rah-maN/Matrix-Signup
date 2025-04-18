import React, { useEffect, useState } from 'react'
import Profile from './profile'
import SimpleGreenSlider from './figmaSlider'
import ExpLeft from './ExpLeft'
import { Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./Firebase.js"; 
import { onAuthStateChanged } from "firebase/auth"

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
    <div className='bg-dashboard grid grid-cols-[3fr_9fr] h-full pb-10'>
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
            <button className='font-bold py-1 mt-8 px-2 text-gray-900'> Logout </button>
          </Link>
        </div>
      </div>
      <div className='dash-right text-black bg-white w-full border-2 rounded-xl my-8'>
          <div className='expense-content grid grid-cols-[8fr_4fr] h-full'>
            <div className='left-exp '>
                <ExpLeft />
            </div>
            <div className='right-exp bg-gray-100 pt-14 px-8'>
              <div className='font-bold text-center'>
                Where your money go?
              </div>
              < SimpleGreenSlider />
            </div>
          </div>
      </div>
    </div>
  )
}

export default Dashboard
import React, { useEffect, useState } from 'react'
import Profile from './Dashboard/profile.jsx';
import SimpleGreenSlider from './figmaSlider'
import DashLeft from './Dashboard/Dashleft.jsx'
import { Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase/firebase.js"; 
import { onAuthStateChanged } from "firebase/auth"
import { getItems, addItem, updateItem, deleteItem } from './api';



function Dashboard() {


  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  // READ
  useEffect(() => {
    getItems().then(res => setItems(res.data));
  }, []);

  // CREATE or UPDATE
  const handleSubmit = () => {
    if (!text) return;
  
    if (editingItem) {
      updateItem(editingItem.id, { name: text }).then(() => {
        setItems(prev =>
          prev.map(i => (i.id === editingItem.id ? { ...i, name: text } : i))
        );
        setEditingItem(null);
        setText('');
      });
    } else {
      addItem({ name: text }).then(res => {
        setItems([...items, res.data]);
        setText('');
      });
    }
  };
  

  // DELETE
  const handleDelete = id => {
    deleteItem().then(() => {
      setItems(items.filter(i => i.id !== id));
    });
  };

  const handleEdit = item => {
    setEditingItem(item);
    setText(item.name);
  };

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
                <DashLeft />
            </div>
            <div className='right-exp bg-gray-100 pt-14 px-8'>
              <div className='font-bold text-center'>
                Where your money go?
              </div>
              < SimpleGreenSlider />
            </div>
          </div>



          <div className='bg-white mt-6 p-4 rounded shadow'>
          <h2 className='text-xl font-bold mb-4'>💸 Manage Your Items</h2>
          
          <div className='flex gap-2 mb-4'>
            <input 
              type="text"
              className='border px-3 py-1 rounded w-full'
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter item name"
            />
            <button 
              onClick={handleSubmit}
              className='bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700'
            >
              {editingItem ? 'Update' : 'Add'}
            </button>
          </div>

          {items.length === 0 ? (
            <p className="text-gray-500">No items found.</p>
          ) : (
            <ul className='space-y-2'>
              {items.map(item => (
                <li 
                  key={item.id} 
                  className='flex justify-between items-center bg-gray-200 px-3 py-2 rounded'
                >
                  <span>{item.name}</span>
                  <div className="space-x-2">
                    <button 
                      onClick={() => handleEdit(item)} 
                      className='text-blue-600 hover:underline'
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      className='text-red-600 hover:underline'
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>



    </div>


    
  )
}

export default Dashboard
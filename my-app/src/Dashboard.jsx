import React from 'react'
import Profile from './profile'
import SimpleGreenSlider from './figmaSlider'
import ExpLeft from './ExpLeft'

function Dashboard() {
  return (
    <div className='bg-dashboard grid grid-cols-[3fr_9fr] h-full pb-10'>
      <div className='dash-left font-serif flex flex-col mt-10 items-center'>
        <div>
          <div >
            < Profile />
          </div>

          <div className='text-white font-bold text-4xl'>Sam</div>
          <div className='text-gray-400'>sam10@email.com</div>
        </div>
        <div className='text-gray-400 font-bold pt-10 text-xl'>
          <span className='block py-3'>Dashboard</span>
          <span className='block py-3 text-white'>Expenses</span>
          <span className='block py-3'>Wallets</span>
          <span className='block py-3'>Summary</span>
          <span className='block py-3'>Accounts</span>
          <span className='block py-3'>Settings</span>
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
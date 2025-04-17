import React from 'react'


function ExpLeft() {
  return (
    <div className='text-black pt-10 px-14  '>
        <div className='font-bold text-4xl'>Expenses</div>
        <div className='text-gray-500 text-sm pt-5 pl-1 pb-7'> 01 - 25 March, 2025 </div>
        
        <div className='font-bold border-b pb-2 mb-5 text-gray-800'>
            Today
        </div>
        <div className='flex justify-between text-gray-800 mb-3'>
            <div className='flex gap-2'>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">🛒</div>
                <div>
                    <div className='font-bold'>Grocery</div>
                    <div className='text-xs text-gray-400'>5:12 pm  .  D-Mart</div>
                </div>
            </div>
            <div className='font-bold'>
                -326,800
            </div>
        </div>
        <div className='flex justify-between text-gray-800 mb-3'>
            <div className='flex gap-2'>
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-2xl">🚂</div>
                <div>
                    <div className='font-bold'>Transportation</div>
                    <div className='text-xs text-gray-400'>5:15 pm  .  Ameerpet</div>
                </div>
            </div>
            <div className='font-bold'>
                -15,000
            </div>
        </div>
        <div className='flex justify-between text-gray-800 mb-5'>
            <div className='flex gap-2'>
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-2xl">🏠</div>
                <div>
                    <div className='font-bold'>Housing</div>
                    <div className='text-xs text-gray-400'>5:12 pm  .  Yousufguda</div>
                </div>
            </div>
            <div className='font-bold'>
                -185,270
            </div>
        </div>
        <div className='font-bold border-b pb-2 mb-5 text-gray-800'>
            Monday, 23 March 2025
        </div>
        <div className='flex justify-between text-gray-800 mb-3'>
            <div className='flex gap-2'>
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl">⛺</div>
                <div>
                    <div className='font-bold'>Food and Drink</div>
                    <div className='text-xs text-gray-400'>5:15 pm  .  Ameerpet</div>
                </div>
            </div>
            <div className='font-bold'>
                -156,000
            </div>
        </div>
        <div className='flex justify-between text-gray-800'>
            <div className='flex gap-2'>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">▶️</div>
                <div>
                    <div className='font-bold'>Entertainment</div>
                    <div className='text-xs text-gray-400'>5:15 pm  .  INOX</div>
                </div>
            </div>
            <div className='font-bold'>
                -36,000
            </div>
        </div>
    </div>
  )
}

export default ExpLeft
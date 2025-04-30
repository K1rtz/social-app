import React from 'react'

const SuggestedPersonCard = () => {
    return (
      <div className="flex items-center justify-between bg-[#27253b] hover:bg-[#332f4a] transition-colors p-4 rounded-2xl cursor-pointer mb-2">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full border-2 border-[#37105c] overflow-hidden">
            <img
              src="https://api.dicebear.com/9.x/adventurer/svg?seed=Aiden"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col ml-3">
            <h1 className="text-white font-semibold text-sm leading-5">Ime Prezime</h1>
            <h2 className="text-gray-400 text-xs">@imeprezime2prijatelj</h2>
          </div>
        </div>
  
        <button className="text-sm px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition">
          Prati
        </button>
      </div>
    );
  }
  
// const SuggestedPersonCard = () => {
//   return (
//     <div className='flex flex-row  bg-[#1d1b2c] brightness-100 hover:brightness-100 p-4 cursor-pointer'>
//         <div >
//             <div className="h-12 w-12 rounded-full border-[1.5px] border-white bg-gray-200 overflow-hidden">
//                 <img
//                     src="https://api.dicebear.com/9.x/adventurer/svg?seed=Aiden"
//                     alt="avatar" 
//                     className="w-full h-full object-cover"
//                     />
//             </div>
//         </div>
//         <div className='flex flex-col items-baseline ml-3 '>
//             <h1 className='text-white font-bold '> Ime Prezime</h1>
//             <h1>@imeprezime2prijatelj</h1>
//         </div>

//     </div>
//   )
// }

export default SuggestedPersonCard
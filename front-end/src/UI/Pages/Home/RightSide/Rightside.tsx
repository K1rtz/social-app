import React from 'react'
import SuggestedPersonCard from './SuggestedPersonCard'
import useGetSuggested from '../../../../hooks/useGetSuggested';


const Rightside = () => {
    const {loading, suggestedUsers} = useGetSuggested();


    return (
    <div className='flex-[6]'>
        <div className="flex-[6] sticky top-24">
            <div className="bg-[#1d1b2ccd] rounded-2xl p-4">
            <h1 className="text-center font-bold text-xl mb-4 text-white">Who to follow</h1>
            <div className="space-y-2">
            {
            loading ? "loading..." : (suggestedUsers.map((su)=>(
                <SuggestedPersonCard key='user.id' suggestedUser = {su}/>
            )))
            }
            </div>
            </div>
        </div>
    </div>
    );
  }
  

// const Rightside = () => {
//   return (
//     <div className='sticky flex-[6] top-24 h-[calc(100vh-6rem)]'>
//         <div className='bg-transparent rounded-4xl sticky h-screen flex flex-col justify-between'>
//             <div className='     rounded-4xl  bg-[#1d1b2ccd]'>
//                 <div className='ml-4 m-2  text-center font-bold text-xl'>
//                     <h1>Who to follow</h1>
//                 </div>
//                 <div className='m-2 bg-[#1d1b2ccd] '>
//                 <SuggestedPersonCard/>
//                 <SuggestedPersonCard/>
//                 <SuggestedPersonCard/>
//                 <SuggestedPersonCard/>
//                 </div>

//             </div> 
//         </div>
//      </div>
// )
// }

export default Rightside
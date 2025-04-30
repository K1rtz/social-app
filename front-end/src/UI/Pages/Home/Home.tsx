import React, { useState } from 'react'
import ProfileCard from './LeftSide/ProfileCard'
import Navbar from '../Navbar/Navbar'
import FeedCard from './Middle/FeedCard'
import Rightside from './RightSide/Rightside'
import Chat from '../Chat'


function Home() {


  return (

    
    <>
        <div className='max-w-7xl mx-auto'>
          <Navbar/>
        </div>
        <div className='flex max-w-7xl min-h-screen pt-20 mx-auto gap-x-5 bg-transparent'>
          <ProfileCard/>
          <FeedCard/>
          <Rightside/>
        </div>
      <Chat/>
    </>
    

  )
}

export default Home
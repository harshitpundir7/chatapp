import React from 'react'
import Navbar from '../components/Navbar'
import FetchData from '../components/miscellaneous/FetchData'


function ChatPage() {
  return (
    <div className='text-white'>
      <Navbar/>
      <FetchData/>
    </div>
  )
}

export default ChatPage

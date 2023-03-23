import React from 'react'
import {MdFavorite} from "react-icons/md" 
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className='bg-black'>
      <div className='h-14 sm:h-11 container mx-auto  text-white flex items-center justify-center sm:justify-between'>
        <Link to="/" className='px-5 text-2xl' >FakeImdb</Link>
        <nav className='gap-x-8 hidden sm:flex font-semibold'>
        </nav>
      </div>
    </div>
  )
}

export default Header
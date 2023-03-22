import React from 'react'
import {MdFavorite} from "react-icons/md" 
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className='bg-black'>
      <div className='h-14 sm:h-11 container mx-auto  text-white flex items-center justify-center sm:justify-between'>
        <Link to="/">Fakeİmdb</Link>
        <nav className='gap-x-8 hidden sm:flex font-semibold'>
          {/* <Link to="/movies" className='flex items-center gap-x-2 text-white transition-all text-opacity-80 hover:text-opacity-100'>Movies </Link>
          <Link to="/favorites" className='flex items-center gap-x-2 text-white transition-all text-opacity-80 hover:text-opacity-100'>Favorites
          <MdFavorite size={20}/>
          </Link> */}
        </nav>
      </div>
    </div>
  )
}

export default Header
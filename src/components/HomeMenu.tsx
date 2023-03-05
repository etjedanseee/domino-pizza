import React from 'react'
import { NavLink } from 'react-router-dom'

interface HomeMenuProps {
  basketCount: number
}

const HomeMenu = ({ basketCount }: HomeMenuProps) => {
  return (
    <div className='fixed z-50 top-0 left-0 w-full bg-zinc-900 flex justify-between items-center px-5 py-3'>
      <NavLink to='/basket' className='py-1 px-2 text-white text-xl'>{basketCount}</NavLink>
    </div>
  )
}

export default HomeMenu
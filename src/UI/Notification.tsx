import React from 'react'
import SuccsessIcon from '../assets/succsess.svg'
import ErrorIcon from '../assets/error.svg'
import AttentionIcon from '../assets/attention.svg'


interface NotificationProps {
  text: string,
  color: string,
}

const Notification = ({ color, text }: NotificationProps) => {
  return (
    <div className={`mb-2 p-4 rounded-xl shadow-2xl
      ${color === 'red' ? 'bg-amber-100' : color === 'green' ? 'bg-gray-300' : 'bg-yellow-200'}
    `}>
      <div className='flex items-center gap-x-3'>
        <img src={color === 'red' ? ErrorIcon : color === 'green' ? SuccsessIcon : AttentionIcon} alt='' className='h-10 w-10' />
        <div
          className={`sm:text-lg text-xl font-bold leading-none
          ${color === 'red' ? 'text-red-500' : color === 'green' ? 'text-green-600' : 'text-yellow-600'}`
          }
        >
          {text}
        </div>
      </div>
    </div>
  )
}

export default Notification
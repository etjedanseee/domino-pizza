import React from 'react'

interface AddButtonProps {
  title: string,
  price: number,
  onClick: () => void
}

const AddButton = ({ title, price, onClick }: AddButtonProps) => {
  return (
    <div
      className='bg-[#e31836] rounded-3xl px-6 py-2 w-full flex justify-between text-white font-bold text-lg'
      onClick={onClick}
    >
      <div>{title}</div>
      <div className='tracking-tighter'>{price} ₽</div>
    </div>
  )
}

export default AddButton
import React from 'react'

interface AddButtonProps {
  title: string,
  price: number,
  onClick: () => void,
  justify?: string
}

const AddButton = ({ title, price, onClick, justify }: AddButtonProps) => {
  return (
    <div
      className={`bg-[#e31836] rounded-3xl px-6 py-2 w-full flex ${justify ? justify : 'justify-between'} text-white font-bold text-lg`}
      onClick={onClick}
    >
      <div>{title}</div>
      {price !== -1 && <div className='tracking-tighter'>{price} ₽</div>}
    </div>
  )
}

export default AddButton
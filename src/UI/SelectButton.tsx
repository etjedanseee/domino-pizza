import React from 'react'

interface SelectButtonProps {
  onClick: () => void
}

const SelectButton = ({ onClick }: SelectButtonProps) => {
  return (
    <div
      className='border-[1px] border-[#e31836] px-6 py-2 rounded-3xl text-[#e31836] font-medium'
      onClick={onClick}
    >
      Выбрать
    </div>
  )
}

export default SelectButton
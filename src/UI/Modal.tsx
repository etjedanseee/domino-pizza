import React, { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode,
  onClose: () => void,
}

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div
      className='fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-80 z-40 flex justify-center 320:items-center items-start overflow-auto'
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className='overflow-auto flex flex-col'
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
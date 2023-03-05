import React, { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
}

const Modal = ({ children }: ModalProps) => {

  return (
    <div className='fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-80 z-50 flex justify-center items-center'>
      {children}
    </div>
  )
}

export default Modal
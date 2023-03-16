import React, { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode,
  onClose: () => void,
}

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div
      className='fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-80 z-50 flex justify-center items-center overflow-y-auto'
      onClick={onClose}
    >
      <div onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
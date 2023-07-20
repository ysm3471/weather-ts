import React from 'react';
import ReactDOM from 'react-dom';

type modalProps = {   
  children:React.ReactNode
}

function ModalOverlay({children}:modalProps) {
  return (
    <div className="modal">
      <div>{children}</div>
    </div>
  )
}

const portalEl:HTMLElement | null = document.getElementById('overlays')

export default function Modal({children}:modalProps) {
  return (
    <>
    {portalEl &&<div>
      {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>,portalEl)}
    </div>}    
    </>
  )
}

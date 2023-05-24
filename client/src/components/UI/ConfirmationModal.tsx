import React from 'react'

export default function ConfirmationModal({setIsOpen}):JSX.Element {
  return (
    <div>
        <p>Письмо подверждения отправленно на почту</p>
    <button onClick={(e)=>setIsOpen(prev=>!prev)}>Ок</button>
    </div>
  )
}

import React, { ReactNode } from 'react'

function MessagePreview({ sender, content} : { sender: string, content: string }) {
  return (
    <div className="w-full rounded-2xl flex bg-card-background p-3 gap-6">
        <div className="w-16 h-16 rounded-full bg-slate-400"></div>
        <div className="flex flex-col">
            <h1 className='font-extrabold'>{sender}</h1>
            <h2>{content}</h2>
        </div>
    </div>
  )
}

export default MessagePreview
import React from 'react'

interface Message {
    content: string,
    sender: string,
    isRead: boolean,
    timestamp: string,
    incoming: boolean
}

interface MessageProps {
    message: Message;
}

const ChatMessage : React.FC<MessageProps> = ({message}) => {
  return (
    <div className={`w-full flex flex-col gap-8`}>
        <div className={`flex items-center ${message.incoming? 'justify-start flex-row' : 'justify-start flex-row-reverse'}`}>
            <div className={`w-10 h-10 rounded-full bg-slate-400  ${message.incoming? ' mr-7 text-left': 'ml-7 text-right'}`}></div>
            <div className={`rounded-2xl p-4 ${message.incoming? 'bg-light-violet': 'bg-primary text-white'}`}>{message.content}</div>
        </div>
        <h2 className="text-center">{message.timestamp}</h2>
    </div>
  )
}

export default ChatMessage
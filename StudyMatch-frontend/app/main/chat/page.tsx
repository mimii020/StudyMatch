import ChatMessage from '@/components/ChatMessage';
import MessagePreview from '@/components/MessagePreview';
import SearchField from '@/components/SearchField';
import { Expand, Send, X } from 'lucide-react';
import React from 'react'

const messagesPreview = [
    {
      id: 1,
      sender: "John Doe",
      content: "Hey, are you free to meet up later today?",
      timestamp: "2025-01-29T14:30:00",
      isRead: false,
    },
    {
      id: 2,
      sender: "Jane Smith",
      content: "I found a cool spot for lunch! Want to join?",
      timestamp: "2025-01-29T13:45:00",
      isRead: true,
    },
    {
      id: 3,
      sender: "Mark Johnson",
      content: "Don't forget to review the report before the meeting.",
      timestamp: "2025-01-28T10:15:00",
      isRead: true,
    },
    {
      id: 4,
      sender: "Emily Davis",
      content: "Can you send me the project files when you have a chance?",
      timestamp: "2025-01-27T09:00:00",
      isRead: false,
    },
    {
      id: 5,
      sender: "Chris Lee",
      content: "Reminder: Meeting at 3 PM today. Don't be late!",
      timestamp: "2025-01-26T08:30:00",
      isRead: true,
    },
  ];

  const chatMessages = [
    {
      id: 1,
      sender: "Alice",
      content: "Hey, how's it going?",
      timestamp: "2025-01-29T14:30:00",
      isRead: true,
      incoming: true, 
    },
    {
      id: 2,
      sender: "Bob",
      content: "Good, just finishing up some work. How about you?",
      timestamp: "2025-01-29T14:31:00",
      isRead: true,
      incoming: false,
    },
    {
      id: 3,
      sender: "Alice",
      content: "I just finished a big project, so I'm free for the rest of the day.",
      timestamp: "2025-01-29T14:32:00",
      isRead: false,
      incoming: true,
    },
    {
      id: 4,
      sender: "Bob",
      content: "Awesome! Let's grab lunch then.",
      timestamp: "2025-01-29T14:33:00",
      isRead: false,
      incoming: false,
    },
    {
      id: 5,
      sender: "Alice",
      content: "Sounds great! I know a good place nearby.",
      timestamp: "2025-01-29T14:34:00",
      isRead: false,
      incoming: true,
    },
    {
      id: 6,
      sender: "Bob",
      content: "Perfect, I'll be there in 15 minutes.",
      timestamp: "2025-01-29T14:35:00",
      isRead: false,
      incoming: false,
    },
  ];

function ChatPage() {
  return (
    <div className='flex w-full h-full'>
        <div className="overflow-hidden flex-1">
            <div className="w-full h-full px-4 flex flex-col gap-4">
                <div className="h-[5.76%] w-full">
                    <SearchField/>
                </div>
                {
                    messagesPreview.map((message) => (
                        <MessagePreview key={message.id} sender={message.sender} content={message.content}/>
                    ))
                }
            </div>
        </div>
        <div className="flex flex-col flex-1 relative h-full">
            <div className="overflow-auto mb-5 scrollbar-hide">
                <div className="border-2 border-gray-400 flex flex-col p-4 w-full">
                    <div className='flex items-center justify-between absolute right-0 top-0 w-full p-4 bg-white border-x-2 border-t-2 border-gray-400 z-10'>
                        <Expand/>
                        <h1>Mimii</h1>
                        <X/>
                    </div>
                    <div className="flex flex-col gap-10 mt-16">
                        {
                            chatMessages.map((message) => (
                                <ChatMessage key={message.id} message={message}/>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='w-full relative'>
                <input type="text" 
                    className="w-full rounded-2xl p-4 bg-light-violet"
                    placeholder="Send a message!" 
                />
                <Send color="purple" className='absolute right-4 top-1/3'/>
            </div>
        </div>
    </div>
  )
}

export default ChatPage
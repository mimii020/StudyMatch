import { MoreVertical } from 'lucide-react'
import React from 'react'
import SecondaryButton from './SecondaryButton'
import PrimaryButton from './PrimaryButton'

interface Props {
    senderUsername: string;
    subject: string;
    description: string;
    handlePrimary: (...args: any[]) => any;
    handleSecondary: (...args: any[]) => any;
}

function ReceivedRequestCard({
    senderUsername, 
    subject, 
    description,
    handlePrimary,
    handleSecondary,
}: Props) {
  return (
    <div className="flex w-full p-4 bg-light-gray rounded-2xl gap-5 shadow-md mb-5">
        <div className="w-16 h-16 rounded-full bg-slate-400"></div>
        <div className="flex flex-col w-full">
            <div className="flex justify-between w-full">
                <h1 className="font-extrabold">{senderUsername}</h1>
                <MoreVertical/>
            </div>
            <h2 className="font-bold text-dark-gray">{subject}</h2>
            <div className="flex justify-between w-full">
                <p>{description}</p>
                <div className="flex gap-3 pr-2">
                    <SecondaryButton text="Decline" onClick={handleSecondary}/>
                    <PrimaryButton text="Accept" onClick={handlePrimary}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReceivedRequestCard
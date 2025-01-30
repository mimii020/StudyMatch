import { MoreVertical } from 'lucide-react'
import React from 'react'
import SecondaryButton from './SecondaryButton'
import PrimaryButton from './PrimaryButton'

function ReceivedRequestCard() {
  return (
    <div className="flex w-full p-4 bg-light-gray rounded-2xl gap-5 shadow-md">
        <div className="w-16 h-16 rounded-full bg-slate-400"></div>
        <div className="flex flex-col w-full">
            <div className="flex justify-between w-full">
                <h1 className="font-extrabold">Mimii</h1>
                <MoreVertical/>
            </div>
            <h2 className="font-bold text-dark-gray">Maths</h2>
            <div className="flex justify-between w-full">
                <p>I need help with matrices and vectors</p>
                <div className="flex gap-3 pr-2">
                    <SecondaryButton text="Decline"/>
                    <PrimaryButton text="Accept"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReceivedRequestCard
import React from 'react'
import SecondaryButton from './SecondaryButton'
import PrimaryButton from './PrimaryButton'

function SentRequestCard() {
  return (
        <div className="flex w-full p-4 bg-light-gray rounded-2xl gap-5 shadow-md">
            <div className="w-16 h-16 rounded-full bg-slate-400"></div>
            <div className="flex flex-col w-full justify-between">
                <h1 className="font-extrabold">Maths</h1>
                <div className="flex justify-between w-full">
                    <p>I need help with matrices and vectors</p>
                    <div className="flex gap-3 pr-2">
                        <SecondaryButton text="Delete"/>
                        <PrimaryButton text="Edit"/>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default SentRequestCard
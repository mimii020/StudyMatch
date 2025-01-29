import React from 'react'
import SkillTag from './SkillTag'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'

export default function StudentCard() {
  return (
    <div className='w-1/4 h-[45%] border-2 border-gray-400 rounded-2xl flex flex-col items-center relative p-4 bg-card-background'>
        <div className="rounded-full h-32 w-32 bg-slate-300 mb-2"></div>
        <h2 className='font-bold mb-3'>mimii</h2>
        <div className="flex gap-3 justify-between mb-6">
          <h3>wants</h3>
          <SkillTag skill="painting"/>
        </div>
        <div className="flex gap-4 absolute bottom-7">
          <PrimaryButton text="Send Request"/>
          <SecondaryButton text="View Profile"/>
        </div>
    </div>
  )
}

import React, { useState } from 'react'
import SkillTag from './SkillTag'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'
import { StudentProfile } from '@/lib/types/user.types'
import { useRouter } from 'next/navigation'

interface Props {
  student: StudentProfile;
  handlePrimaryClick: (...args: any[]) => Promise<void>;
}

export default function StudentCard({ student, handlePrimaryClick}: Props) {
  const router = useRouter();
  
  return (
    <div className='w-full h-full border-2 border-gray-400 rounded-2xl flex flex-col items-center relative p-4 bg-card-background'>
        <div className="rounded-full h-32 w-32 bg-slate-300 mb-2"></div>
        <h2 className='font-bold mb-3'>{student.firstname + " " + student.lastname}</h2>
        <div className="flex gap-3 justify-between mb-6">
          <h3>wants</h3>
          {
            student.desiredSkills.map((skill) => (
              <SkillTag key={skill.id} skill={skill}/>
            ))
          }
        </div>
        <div className="flex gap-4 absolute bottom-7">
          <PrimaryButton text="Send Request" onClick={handlePrimaryClick}/>
          <SecondaryButton text="View Profile" onClick={async () => router.push(`profile/${student.id}`)}/>
        </div>
    </div>
  )
}

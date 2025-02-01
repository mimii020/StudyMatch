import React from 'react'

interface SkillTagProps {
    skill: string;
}

const SkillTag: React.FC<SkillTagProps> = ({ skill }) => {
  return (
    <div className='rounded-2xl border-2 border-purple-500 bg-purple-300 px-4 mb-3 text-primary'>{skill}</div>
  )
}

export default SkillTag
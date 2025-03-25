import { Skill } from '@/lib/services/skill/interface';
import React, { useState } from 'react'

interface SkillTagProps {
    skill: Skill;
    onToggle?: (skill: Skill) => void
}

const SkillTag: React.FC<SkillTagProps> = ({ skill, onToggle }: SkillTagProps) => {
  const [isSelected, setSelected] = useState(false);
  const handleClick = () => {
    if (onToggle !== undefined) {
      onToggle?.(skill);
      setSelected(prev => !prev);
    }
  };
  return (
    <button className={`rounded-2xl border-2 px-4 mb-3 ${isSelected? 'bg-primary text-white'  : 'border-purple-500 bg-purple-300 text-primary'}`}
      onClick={handleClick}
      disabled={onToggle === undefined}
    >
      {skill.name}
    </button>
  )
}

export default SkillTag
import React, { useCallback, useState } from 'react'
import SkillTag from './SkillTag'
import { Skill } from '@/lib/services/skill/interface'

interface Props {
  skillList: Skill[]
  onToggle?: (skill: Skill) => void;
}

function SkillList({ skillList, onToggle } : Props) {
 
  return (
    <div className="flex gap-2">
        {
            skillList.map((skill) => (
                <SkillTag 
                  key={skill.id} 
                  skill={skill}
                  onToggle={onToggle}
                />
            ))
        }
    </div>
  )
}

export default SkillList
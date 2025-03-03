import React from 'react'
import SkillTag from './SkillTag'
import { Skill } from '@/lib/types/user.types'

function SkillList({ skillList } : { skillList: Skill[] }) {
  return (
    <div className="flex gap-2">
        {
            skillList.map((skill, key) => (
                <SkillTag key={key} skill={skill}/>
            ))
        }
    </div>
  )
}

export default SkillList
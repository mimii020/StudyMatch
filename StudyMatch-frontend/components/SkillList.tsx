import React from 'react'
import SkillTag from './SkillTag'

function SkillList({ skillList } : { skillList: string[] }) {
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
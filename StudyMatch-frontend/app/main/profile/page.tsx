import ProfileSection from '@/components/ProfileSection'
import SkillList from '@/components/SkillList'
import React from 'react'

function page() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-1/3 bg-purple-300"></div>
      <div className="w-48 h-48 bg-slate-400 rounded-full"></div>
      <h1 className="font-extrabold text-center mt-48 text-black">Mimi</h1>
      <ProfileSection title="About Me" topMargin="100px">
        <p>heyy this is me your favorite girliee</p>
      </ProfileSection>

      <ProfileSection title="Top Skills" topMargin="50px">
        <SkillList skillList={["english", "painting", "maths"]}/>
      </ProfileSection>
    </div>
  )
}

export default page
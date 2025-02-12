import ProfileSection from '@/components/ProfileSection'
import SkillList from '@/components/SkillList'
import React from 'react'

function page() {
  return (
    <div className="w-full h-full relative">
      <div className="w-full h-1/3 bg-purple-300"></div>
      <div className="w-48 h-48 bg-slate-400 rounded-full absolute top-[20%] left-1/2 -translate-x-1/2"></div>
      <h1 className="font-extrabold text-center mt-32 text-black">Mimi</h1>
      <ProfileSection title="About Me" topMargin="80px">
        <p>heyy this is me your favorite girliee</p>
      </ProfileSection>

      <ProfileSection title="Top Skills" topMargin="50px">
        <SkillList skillList={["english", "painting", "maths"]}/>
      </ProfileSection>
    </div>
  )
}

export default page
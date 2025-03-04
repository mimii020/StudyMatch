"use client"

import ProfileSection from '@/components/ProfileSection'
import SkillList from '@/components/SkillList'
import { useGetStudentByIdQuery } from '@/lib/services/profile/user.profile.service'
import { useParams } from 'next/navigation'
import React from 'react'



function  Page() {
  const params = useParams();
  const id = params.id;
  const studentId = Number(id);
  console.log("id", studentId)
  const { data } = useGetStudentByIdQuery(studentId);

  return (
    <div className="w-full h-full relative">
            <div className="w-full h-1/3 bg-purple-300"></div>
            <div className="w-48 h-48 bg-slate-400 rounded-full absolute top-[20%] left-1/2 -translate-x-1/2"></div>
            <h1 className="font-extrabold text-center mt-32 text-black">{data?.firstname + " " +data?.lastname}</h1>
            <ProfileSection title="About Me" topMargin="80px">
              <p>{data?.bio} </p>
            </ProfileSection><ProfileSection title="Top Skills" topMargin="50px">
              {
                (data != undefined) && <SkillList skillList={data?.desiredSkills} />
              }
            </ProfileSection>
    </div>
  )
}

export default Page
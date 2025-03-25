"use client";

import PrimaryButton from "@/components/PrimaryButton";
import ProfileSection from "@/components/ProfileSection";
import SecondaryButton from "@/components/SecondaryButton";
import SkillList from "@/components/SkillList";
import EditBioPopup from "@/components/EditBioPopup";
import { useAddSkillMutation, useGetMyProfileQuery, useUpdateMyProfileMutation } from "@/lib/services/profile/user.profile.service";
import { Edit, Plus } from "lucide-react";
import React, { useState } from "react";
import AddSkillPopup from "@/components/AddSkillPopup";
import { AddSkillRequest, StudentUpdateProfile } from "@/lib/services/profile/interface";
import { SkillTypeEnum } from "@/lib/enums/skill.type.enum";

function Page() {
  const { data, refetch } = useGetMyProfileQuery();
  const [updateMyProfile] = useUpdateMyProfileMutation();  
  const [isBioPopupOpen, setBioPopupOpen] = useState(false);
  const [isOfferedPopupOpen, setOfferedPopupOpen] = useState(false);
  const [isDesiredPopupOpen, setDesiredPopupOpen] = useState(false);
  const [addSkill] = useAddSkillMutation();
  

  const handleOnClick = () => {
    setBioPopupOpen(true);
  };

  const handlePrimaryClick = async (bio: string) => {
    try {
      const updateData: Partial<StudentUpdateProfile> = { bio };
      const response = await updateMyProfile(updateData);
      console.log("bio update", response);
      await refetch();
      setBioPopupOpen(false);
    } catch (err) {
      console.error('Update failed:', err);
    }
  }

  const offereedPrimaryClick = async (skillId: number) => {
      const addSkillRequest: AddSkillRequest = {
        skillId: skillId!,
        skillType: SkillTypeEnum.OFFERED,
      }
      try {
        await addSkill(addSkillRequest);
        refetch();
        setOfferedPopupOpen(false);
      } catch (e) {
        console.log(e);
      }
    }

  const desiredPrimaryClick = async (skillId: number) => {
    const addSkillRequest: AddSkillRequest = {
      skillId: skillId!,
      skillType: SkillTypeEnum.DESIRED,
    }
    try {
      await addSkill(addSkillRequest);
      refetch();
      setDesiredPopupOpen(false);
    } catch (e) {
      console.log(e);
    }
  }

  

  return (
    <div className="w-ull h-full relative">
      <div className="w-full h-1/3 bg-purple-300"></div>
      <div className="w-48 h-48 bg-slate-400 rounded-full absolute top-[20%] left-1/2 -translate-x-1/2"></div>
      <h1 className="font-extrabold text-center mt-32 text-black">
        {data?.firstname + " " + data?.lastname}
      </h1>
      <ProfileSection title="About Me" topMargin="80px">
        <div className="flex justify-between">
          <p>{data?.bio}</p>
          <button className="rounded-full hover:bg-primary/30" onClick={handleOnClick}>
            <Edit size={25} color="purple"/>
          </button>
        </div>
      </ProfileSection>
      <ProfileSection title="Top Skills" topMargin="50px">
        <div className="flex justify-between">
          {data != undefined && <SkillList skillList={data?.offeredSkills} />}
          <button className="hover:bg-primary/30 rounded-full" onClick={() => setOfferedPopupOpen(true)}>
            <Plus size={32} color="purple"/>
          </button>
        </div>
      </ProfileSection>
      <ProfileSection title="Desired Skills" topMargin="50px">
        <div className="flex justify-between">
          {data != undefined && <SkillList skillList={data?.desiredSkills} />}
          <button className="hover:bg-primary/30 rounded-full" onClick={() => setDesiredPopupOpen(true)}>
            <Plus size={32} color="purple"/>
          </button>
        </div>
      </ProfileSection>
      {isBioPopupOpen && <EditBioPopup 
              currentBio={data?.bio}
              onSecondaryClick={async () => setBioPopupOpen(false)}
              onPrimaryClick={async (bio: string) => handlePrimaryClick(bio)} 
              />
      }

      {
        isOfferedPopupOpen && <AddSkillPopup 
          title="Add A New Offered Skill"
          onSecondaryClick={async () => setOfferedPopupOpen(false)}
          onPrimaryClick={offereedPrimaryClick}
        />
      }

      {
        isDesiredPopupOpen && <AddSkillPopup 
          title="Add A New Desired Skill"
          onSecondaryClick={async () => setDesiredPopupOpen(false)}
          onPrimaryClick={desiredPrimaryClick}
        />
      }

    </div>
  );
}

export default Page;

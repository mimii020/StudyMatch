"use client"

import FiltersPopup from '@/components/FiltersPopup';
import SearchField from '@/components/SearchField'
import StudentCard from '@/components/StudentCard'
import { SkillTypeEnum } from '@/lib/enums/skill.type.enum';
import { SearchStudentSkill, StudentSearchRequest } from '@/lib/services/profile/interface';
import { useLazySearchStudentsQuery } from '@/lib/services/profile/user.profile.service';
import { Skill } from '@/lib/services/skill/interface';
import React, { useCallback, useEffect, useState } from 'react'


function HomePage() {
  const [selectedOfferedSkills, setSelectedOfferedSkills] = useState<Skill[]>([]);
  const [selectedDesiredSkills, setSelectedDesiredSkills] = useState<Skill[]>([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");


  const handlePrimaryClick = async () => {
    setPopupOpen(false);
  }

  const onOfferedToggle = useCallback((skill: Skill) => {
    setSelectedOfferedSkills((prev) => 
      prev.some((s) => s.id === skill.id) ? prev.filter((s) => s.id != skill.id)
      : [...prev, skill]
    );
  }, []);

  const onDesiredToggle = useCallback((skill: Skill) => {
    setSelectedDesiredSkills((prev) => 
      prev.some((s) => s.id === skill.id) ? prev.filter((s) => s.id != skill.id)
      : [...prev, skill]
    );
  }, []);
    
  useEffect(() => {
    console.log("Updated offered skills:", selectedOfferedSkills);
    console.log("Updated desired skills:", selectedDesiredSkills);
  }, [selectedOfferedSkills, selectedDesiredSkills]);

  const onFirstnameChagne = (value: string) => {
    setFirstname(value);
  }

  const onLastnameChagne = (value: string) => {
    setLastname(value);
  }

  const [triggerSearch, {
    data: students,
    isLoading,
    isError
  }] = useLazySearchStudentsQuery();

  const handleApply = async () => {
    const finalOfferedSkills: SearchStudentSkill[] = selectedOfferedSkills.map((skill) => {
      const studentSkill: SearchStudentSkill = {
        skillId: skill.id,
        skillType: SkillTypeEnum.OFFERED
      };
      return studentSkill
    });

    const finalDesiredSkills: SearchStudentSkill[] = selectedDesiredSkills.map((skill) => {
      const studentSkill: SearchStudentSkill = {
        skillId: skill.id,
        skillType: SkillTypeEnum.OFFERED
      };
      return studentSkill
    });

    const finalSkills: SearchStudentSkill[] = finalDesiredSkills.concat(finalOfferedSkills);
    const studentSearchRequest: StudentSearchRequest = {
      firstname: firstname,
      lastname: lastname,
      skills: finalSkills,
    };

    await triggerSearch(studentSearchRequest);

    setSelectedDesiredSkills([]);
    setSelectedOfferedSkills([]);
    setFirstname("");
    setLastname("");
    console.log("students",students);
  };


  return (
    <div className="w-full h-full p-1">
      <div className="w-full flex gap-10 justify-between">
        <div className="h-[5.76%] w-[54%]">
          <SearchField 
            placeholder="Enter a student's firstname"
            onChange={onFirstnameChagne}
          />
        </div>
        <div className="h-[5.76%] w-[54%]">
          <SearchField 
            placeholder="Enter a student's lastname"
            onChange={onLastnameChagne}
          />
        </div>
        <button className='border-2 border-gray-400 rounded-2xl px-9' onClick={() => setPopupOpen(true)}>Filters</button>
        <button className='bg-primary rounded-2xl text-white px-9' onClick={handleApply}>Apply</button>
      </div>
      <h1 className="font-extrabold font text-xl mt-4 mb-4">Discover Potential Matches</h1>
      { (students !== undefined) && <div className="grid grid-cols-3 gap-4 py-6 h-full">
        {
          students.map((student) => (
              <StudentCard key={student.id} student={student}/>
          ))
        }
      </div>
      }
      {
        isPopupOpen && <FiltersPopup
          onOfferedToggle={onOfferedToggle}
          onDesiredToggle={onDesiredToggle}
          onPrimaryClick={handlePrimaryClick}
        />
      }
    </div>
  )
}

export default HomePage
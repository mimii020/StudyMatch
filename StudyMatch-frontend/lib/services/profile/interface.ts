import { SkillTypeEnum } from "@/lib/enums/skill.type.enum";

export interface StudentUpdateProfile {
    firstname?: string;
    lastname?: string;
    bio?: string;
}

export interface AddSkillRequest {
    skillId: number;
    skillType: SkillTypeEnum;
}

export interface SearchStudentSkill {
    skillId: number;
    skillType: SkillTypeEnum;
}

export interface StudentSearchRequest {
    firstname: string;
    lastname: string;
    skills: SearchStudentSkill[];
}
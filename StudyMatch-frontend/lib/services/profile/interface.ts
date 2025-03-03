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
import { RequestStatusEnum } from "@/lib/enums/request.status.enum";

export interface CreateHelpRequest {
    receiverId: number;
    subject: Subject;
    description: string;
}

export interface HelpRequest {
    helpRequestId: number;
    senderId: number;
    receiverId: number;
    senderUsername: string;
    receiverUsername: string;
    status: RequestStatusEnum;
}
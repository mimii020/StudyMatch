"use client"

import ReceivedRequestCard from "@/components/ReceivedequestCard";
import { RequestStatusEnum } from "@/lib/enums/request.status.enum";
import { useGetReceivedRequestsQuery, useGetSentRequestsQuery, useUpdateHelpRequestMutation } from "@/lib/services/help-request/help.request.service";
import { HelpRequest, UpdateHelpRequest } from "@/lib/services/help-request/interface";
import React from "react";

function Page() {
  const {data: receivedRequests, refetch} = useGetReceivedRequestsQuery();
  const [updateHelpRequest] = useUpdateHelpRequestMutation();

  const handlePrimary = async (requestId: number) => {
    const updateRequest: UpdateHelpRequest = {
        status: RequestStatusEnum.ACCEPTED
    };

    try {
      const response = await updateHelpRequest({requestId, updateRequest});
      console.log(response);
      await refetch();
      receivedRequests?.splice(requestId);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSecondary = async (requestId: number) => {
    const updateRequest: UpdateHelpRequest = {
        status: RequestStatusEnum.DENIED
    };

    try {
      const response = await updateHelpRequest({requestId, updateRequest});
      console.log(response);
      await refetch();
      receivedRequests?.splice(requestId);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full h-full">
      {
        receivedRequests !=undefined && receivedRequests.length>0 ? receivedRequests.map((request) => (
          <ReceivedRequestCard 
            key={request.helpRequestId} 
            senderUsername={request.senderUsername}
            subject={request.subject.name}
            description={request.description}
            handlePrimary={async () => handlePrimary(request.helpRequestId)}
            handleSecondary={async () => handleSecondary(request.helpRequestId)}
          />

        )) : <p>No sent help requests are found</p>
      }
    </div>
  );
}

export default Page;

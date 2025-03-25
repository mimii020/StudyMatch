"use client"

import SentRequestCard from '@/components/SentRequestCard'
import { useGetSentRequestsQuery, useSendHelpRequestMutation } from '@/lib/services/help-request/help.request.service'
import React from 'react'

function Page() {
  const {data: sentRequests} = useGetSentRequestsQuery();

  return (
    <div className="w-full h-full">
      {
        sentRequests? sentRequests.map((request) => (
          <SentRequestCard 
            key={request.helpRequestId}
            receiverUsername={request.receiverUsername}
            subject={request.subject.name}
            description={request.description}
          />

        )) : <p>No sent help requests were found</p>
      }
    </div>
  )
}

export default Page
"use client"

import DashboardNavbar from '@/components/DashboardNavbar'
import React from 'react'

function layout({ children }: {  children: React.ReactNode}) {
  return (
    <div className="h-full w-full flex flex-col gap-5">
        <DashboardNavbar/>
        {children}
    </div>
  )
}

export default layout
import BreadCrumbHeader from '@/components/BreadCrumbHeader';
import DesktopSidebar from '@/components/Sidebar';
import { Separator } from '@/components/ui/separator';
import { Bell } from 'lucide-react';
import React from 'react';

function layout({ children }: {  children: React.ReactNode}) {
  return (
    <div className='flex h-screen w-screen'>
        <DesktopSidebar/>
        <div className='flex flex-col flex-1 min-h-screen'>
            <header className="flex items-center px-6 py-4 h-[50px] container justify-between">
                <BreadCrumbHeader/>
                <div className="flex gap-5">
                    <Bell/>
                    <div className='rounded-full w-7 h-7 bg-slate-400'></div>
                </div>
            </header>
            <Separator/>
            <div className='overflow-auto h-full w-full'>
                <div className="flex-1 container py-4 text-accent-foreground h-full w-full">
                    { children }
                </div>
            </div>
        </div>
    </div>
  )
}

export default layout
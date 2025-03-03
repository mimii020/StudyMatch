import React from 'react'

interface Props {
    title: string,
    children: React.ReactNode,
    topMargin: string,
}

const ProfileSection: React.FC<Props> = ({title, children, topMargin}) => {
  return (
    <div className="w-full rounded-2xl border-[0.5px] border-slate-400 p-3 flex flex-col gap-4 shadow-md" style={{marginTop: topMargin}}>
        <h1 className="font-bold mb-3">{title}</h1>
        { children }
    </div>
  )
}

export default ProfileSection
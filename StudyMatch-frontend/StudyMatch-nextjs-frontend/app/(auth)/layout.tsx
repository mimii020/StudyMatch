import Logo from '@/components/Logo'
import { ReactNode }  from 'react'

function layout({children}: {children: 
ReactNode}) {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="max-h-full w-1/2 bg-card-background p-6
      rounded-2xl shadow-md flex flex-col items-center gap-8
      ">
        <Logo/>
        {children}
      </div>
    </div>
  )
}

export default layout
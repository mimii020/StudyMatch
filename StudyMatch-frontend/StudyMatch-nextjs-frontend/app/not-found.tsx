import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function NotFoundPage() {
  return (
    <div className='flex flex-col w-screen h-screen items-center justify-center gap-2 text-center'>
        <h1 className="font-bold text-primary text-6xl">404</h1>
        <h2 className="font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md">Don&apos;t worry, even the best
            data gets lost in the internet, sometimes.
        </p>
        <Link href="/" className="flex items-center justify-center bg-primary 
        text-white px-5 py-3 rounded-md hover:bg-primary/80 transition-colors
        gap-1 mt-5">
          <ArrowLeftIcon/>
          Back to Dashboard
        </Link>
        <footer className="text-center mt-7 text-muted-foreground text-sm"
          >If you believe this is an error, please contact our support team
        </footer>
    </div>
  )
}

export default NotFoundPage
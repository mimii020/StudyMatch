'use client';

import AuthField from '../components/AuthField';
import PrimaryButton from '@/components/PrimaryButton';
import Link from 'next/link';



function Page() {
    const loginFields = [
        {
            name: "Email",
            label: "Enter a valid email"
        },

        {
            name: "Password",
            label: "Enter your password"
        }
    ];
  return (
    <div className="max-h-full w-2/3 flex flex-col items-center gap-12">
        <h1 className="text-primary font-extrabold text-5xl">Login</h1>
        <form action="" className="w-full flex flex-col justify-center gap-20 text-2xl">
            {
                loginFields.map((loginField, key) => (
                    <AuthField key={key} name={loginField.name} label={loginField.label} />
                ))
            }

            <PrimaryButton padding="25px" text="Log In"/>
        </form>

        <div>
            <span className="mr-10">You don&apos;t have an account? </span>
            <Link href="/signup" className="text-primary underline font-extrabold">Sign Up</Link>
        </div>
    </div>
  )
}

export default Page
"use client"

import React from 'react'
import AuthField from '../components/AuthField'
import PrimaryButton from '@/components/PrimaryButton'
import Link from 'next/link'

function page() {
    const signupFields = [
        {
            name: "Firstname",
            label: "Enter your firstname",
        },
        {
            name: "Lastname",
            label: "Enter your lastname",
        },
        {
            name: "Email",
            label: "Enter your email",
        },
        {
            name: "Password",
            label: "Enter your password",
        }
    ]
  return (
    <div className="max-h-full w-2/3 flex flex-col items-center gap-12">
        <h1 className="text-primary font-extrabold text-5xl">Signup</h1>
        <form action="" className="w-full flex flex-col justify-center gap-20 text-2xl">
            {
                signupFields.map((signupField, key) => (
                    <AuthField key={key} name={signupField.name} label={signupField.label} />
                ))
            }

            <PrimaryButton padding="25px" text="Sign In"/>
        </form>

        <div>
            <span className="mr-10">You already have an account? </span>
            <Link href="/login" className="text-primary underline font-extrabold">Log In</Link>
        </div>
    </div>
  )
}

export default page
"use client"

import React, { useState } from 'react'
import AuthField from '../components/AuthField'
import PrimaryButton from '@/components/PrimaryButton'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SignupRequest } from '@/lib/services/auth/interface'
import { signup } from '@/lib/services/auth/auth.service'
import { RolesEnum } from '@/lib/enums/roles.enum'

function Page() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<SignupRequest>({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
        }
    );

    const handleSumbit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const signupRequest: SignupRequest = {
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                password: formData.password           
            };
            const response = await signup(signupRequest);
            console.log("student signup", response);
            if (response.status == 202) {
                router.push('/login');
            }

            else {
                throw new Error("signup failed");
            }
        } catch (err) {
            setError(String(err));
        } finally {
            setIsLoading(false);
        }
    };

    const onChange = (value: string, fieldName: string) => {
        setFormData({
            ...formData,
            [fieldName]: value
        });
    }
    const signupFields = [
        {
            name: "firstname",
            label: "Enter your firstname",
        },
        {
            name: "lastname",
            label: "Enter your lastname",
        },
        {
            name: "email",
            label: "Enter your email",
        },
        {
            name: "password",
            label: "Enter your password",
        }
    ]
  return (
    <div className="max-h-full w-2/3 flex flex-col items-center gap-12">
        <h1 className="text-primary font-extrabold text-5xl">Signup</h1>
        <form action="" className="w-full flex flex-col justify-center gap-20 text-2xl">
            {
                signupFields.map((signupField, key) => (
                    <AuthField 
                        key={key} 
                        name={signupField.name} 
                        label={signupField.label} 
                        value={formData[signupField.name as keyof typeof formData]} 
                        onChange={onChange}
                    />
                ))
            }

            <PrimaryButton 
                padding="25px" 
                text="Sign In"
                onClick={handleSumbit}
            />
        </form>

        <div>
            <span className="mr-10">You already have an account? </span>
            <Link href="/login" className="text-primary underline font-extrabold">Log In</Link>
        </div>
    </div>
  )
}

export default Page
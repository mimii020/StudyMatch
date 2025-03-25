'use client';

import AuthField from '../components/AuthField';
import PrimaryButton from '@/components/PrimaryButton';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { login } from '@/lib/services/auth/auth.service';
import { setCurrentUser } from '@/lib/services/auth/authSlice';
import { LoginRequest } from '@/lib/services/auth/interface';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';



function Page() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<LoginRequest>({
        email: '',
        password: ''
        }
    );

    const handleSumbit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const loginRequest: LoginRequest = {
                email: formData.email,
                password: formData.password           
            };
            const response = await login(loginRequest);
            console.log("student login",response);
            if (response.student) {
                dispatch(setCurrentUser(response))
                router.push('/main/home');
            }

            else {
                throw new Error("login failed");
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

    const loginFields = [
        {
            name: "email",
            label: "Enter a valid email"
        },

        {
            name: "password",
            label: "Enter your password"
        }
    ];
  return (
    <div className="max-h-full w-2/3 flex flex-col items-center gap-12">
        <h1 className="text-primary font-extrabold text-5xl">Login</h1>
        <form action="" className="w-full flex flex-col justify-center gap-20 text-2xl">
            {
                loginFields.map((loginField, key) => (
                    <AuthField 
                        key={key} 
                        name={loginField.name} 
                        label={loginField.label}
                        value={formData[loginField.name as keyof typeof formData]} 
                        onChange={onChange} />
                ))
            }

            <PrimaryButton padding="25px" text="Log In" onClick={(e) => handleSumbit(e)}/>
        </form>

        <div>
            <span className="mr-10">You don&apos;t have an account? </span>
            <Link href="/signup" className="text-primary underline font-extrabold">Sign Up</Link>
        </div>
    </div>
  )
}

export default Page
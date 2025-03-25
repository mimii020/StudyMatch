import { RolesEnum } from "@/lib/enums/roles.enum";
import { LoginRequest, SignupRequest } from "./interface";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL

export async function signup(request: SignupRequest) {
    const response = await fetch(`${backendUrl}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                ...request,
                role: RolesEnum.STUDENT
            }
        ),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error("login failed");
    }
    console.log(response)
    return response
}

export async function login(request: LoginRequest) {
    const response = await fetch(`${backendUrl}/auth/authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request),
        credentials: 'include'
    });

    if (!response.ok) {
        const errorData = response.json()
        console.log("login error");
        throw new Error("login failed");
    }

    const data = await response.json();
    console.log(data);
    localStorage.setItem('accessToken', data.token);
    return data
}

export async function logout(): Promise<void> {
    try{
        await fetch(
            `${backendUrl}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
        );
    } catch(e) {
        console.error('logout error', e);
        throw new Error("failed to logout");
    }
}
import React, {ChangeEvent, FormEvent, useState} from "react";
import {useAuth} from "../useHook/useAuth.ts";
import imagesvg from '../assets/test-svg.svg'

export function Login() {

    const [loginEmailValidity, setLoginEmailValidity] = useState(true);
    const [loginEmail, setLoginEmail] = useState("");
    const handleLoginEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginEmail(event.target.value)
        if ((/^[\w\-\.]+@(?:[\w-]+\.)+[\w-]{2,4}$/).test(event.target.value)) {setLoginEmailValidity(true)}
        else {setLoginEmailValidity(false)}
    }

    const [loginPasswordValidity, setLoginPasswordValidity] = useState(true);
    const [loginPassword, setLoginPassword] = useState("");
    const handleLoginPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginPassword(event.target.value)
        if ((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,32}$/).test(event.target.value)) {setLoginPasswordValidity(true)}
        else {setLoginPasswordValidity(false)}
    }

    const {login, register} = useAuth();
    const handleSubmitLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const email = data.get('email')!.toString();
        const password = data.get('password')!.toString();

        if (loginEmailValidity && loginPasswordValidity) {
            login(
                email,
                password,
            )
        }
        else {

        }
    };


    const handleSubmitRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        register(
            data.get('email')!.toString(),
            data.get('username')!.toString(),
            data.get('password')!.toString(),
        )
    };


    return (
        <>
            <div style={{backgroundImage: `url(${imagesvg})`, backgroundSize: 'cover'}} className="h-screen w-full">
                <div className="flex w-full p-8 gap-16 items-center justify-center h-screen">
                    <div className="p-3 rounded-lg shadow-xl bg-slate-50 w-[80ch]">
                        <legend className="text-center text-2xl font-semibold pb-2">Login</legend>
                        <form onSubmit={handleSubmitLogin} className="flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" placeholder="Email" required={true} 
                            className={`${loginEmailValidity? "border-slate-600":"border-red-500"} border-2 rounded-md pl-2`} name="email" value={loginEmail} onChange={handleLoginEmailChange}/>

                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Password" required={true} name="password" 
                            className={`${loginPasswordValidity? "border-slate-600":"border-red-500"} border-2 rounded-md pl-2`} value={loginPassword} onChange={handleLoginPasswordChange}/>

                            <button type="submit" className="p-2 bg-fuchsia-700 text-yellow-300 font-bold text-2xl text-white rounded">Login</button>
                        </form>
                    </div>

                    <div className="p-3 rounded-lg shadow-xl bg-slate-50 w-[80ch]">
                        <legend className="text-center text-2xl font-semibold pb-2">Register</legend>
                        <form onSubmit={handleSubmitRegister} className="flex flex-col gap-2">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" placeholder="Username" required={true} className="pl-2" name="username"/>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" placeholder="Email" required={true} className="pl-2" name="email"/>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Password" required={true} className="pl-2" name="password"/>
                            <button type="submit" className="p-2 bg-fuchsia-700 text-yellow-300 font-bold text-2xl text-white rounded">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}
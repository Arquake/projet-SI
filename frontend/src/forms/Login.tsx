import { FormEvent, useEffect } from 'react';
import imagesvg from '../assets/background-login-2.svg'
import "../styles/login.css";
import { useAuth } from '../useHook/useAuth';

export function Login() {

    const {login} = useAuth();

    useEffect(()=>{
        
    }, [])
    
    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            login(parseInt(data.get('code')!.toString()))
        }
        catch(_) {

        }
    }

    return (
        <>
            <div style={{backgroundImage: `url(${imagesvg})`, backgroundSize: 'cover'}} className="h-screen w-full">
                <div className='flex items-center justify-center'>
                    <div className='container py-16 px-2 flex items-center justify-center'>
                        <form className='shadow-lg p-6 basis-1/2 flex flex-col items-center justify-center gap-4' onSubmit={handleLogin}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-64 aspect-square'>
                                <path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"/>
                                <rect width="2" height="7" x="11" y="6" fill="currentColor" rx="1"><animateTransform attributeName="transform" dur="90s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></rect>
                                <rect width="2" height="9" x="11" y="11" fill="currentColor" rx="1"><animateTransform attributeName="transform" dur="7.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></rect>
                            </svg>

                            <input type='text' className='px-2 py-0.5 rounded-full border border-neutral-100' placeholder='Code ...' maxLength={6} name='code' id='code'/>

                            <button className='bg-orange-400 active:bg-orange-600 text-neutral-50 py-1 px-8 rounded-full text-xl'>Commencer</button>
                        </form>
                    </div>
                </div>
                
            </div>
        </>

    )
}
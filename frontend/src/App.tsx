import './App.css'
import {AuthStatus, useAuth} from "./useHook/useAuth.ts";
import {useEffect} from "react";
import {Login} from "./forms/Login.tsx";
import {Logout} from "./forms/Logout.tsx";

function App() {
    const {status, tokenAuthenticate} = useAuth()

    useEffect(() => {
        tokenAuthenticate()
    }, []);

    if (status === AuthStatus.Unknown) {
        return (
            <>

                <div >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="animate-spin h-6 aspect-square">
                        <path fill="currentColor" d="M2 8a6 6 0 1 1 6 6a.5.5 0 0 0 0 1a7 7 0 1 0-7-7a.5.5 0 0 0 1 0"/>
                    </svg>
                </div>

            </>
        )
    }

    if (status === AuthStatus.Guest) {
        return (
            <>
                <Login />
            </>
        )
    } else {
        return (
            <>
                <Logout />
            </>
        )
    }
}

export default App

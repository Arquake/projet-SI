import {useAuth} from "../useHook/useAuth.ts";
import {FormEvent} from "react";


export function Logout() {
    const {logout} = useAuth();
    const handleLogout = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        logout()
    };
    return (
        <form onSubmit={handleLogout}>
            <button type="submit" className="p-2 bg-blue-600 text-white rounded">Logout</button>
        </form>
    )
}
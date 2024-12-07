import {userStore} from "../store/userStore.ts";
import {useCallback} from "react";

export enum AuthStatus {
    Unknown = 0,
    Authenticated = 1
}

const apiUrl: string = import.meta.env.VITE_FETCH_API;

export function useAuth() {
    const {account, setAccount} = userStore();

    let status = AuthStatus.Unknown;
    switch (account) {
        case null :
            status = AuthStatus.Unknown;
            break;
        default :
            status = AuthStatus.Authenticated;
            break;
    }


    const login = useCallback((codeId: number) => {
        return fetch('http://localhost:3000/get-code-validity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: codeId
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(() => {
            setAccount(true);
            return true
        })
        .catch(()=>{return false});
    }, [])



    const endSession = useCallback((codeId: number) => {
        return fetch('http://localhost:3000/validate-stage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: codeId
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(() => {
            setAccount(true);
            return true
        })
        .catch(()=>{return false});
    }, [])


    return {
        account,
        status,
        login,
    }
}
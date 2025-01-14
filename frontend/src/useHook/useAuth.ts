import {userStore} from "../store/userStore.ts";
import {useCallback} from "react";

export enum AuthStatus {
    Unknown = 0,
    Authenticated = 1
}

const apiUrl: string = /*import.meta.env.VITE_FETCH_API ||*/ "http://localhost:3000";

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
        return fetch(apiUrl + '/get-code-validity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${13} ${'pk'}`
            },
            body: JSON.stringify({
                code: codeId
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            else if (res.status === 200) {
                setAccount(codeId);
                return true
            }
        })
        .catch(()=>{return false});
    }, [])



    const endSession = useCallback(() => {
        return fetch(apiUrl + '/validate-stage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${13} ${'pk'} ${account || ''}`
            },
            body: JSON.stringify({
                completed: true
            })
        })
        .then(res => {
            console.log(res)
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(() => {
            setAccount(null);
            return true
        })
        .catch(()=>{return false});
    }, [])


    return {
        account,
        status,
        login,
        endSession
    }
}
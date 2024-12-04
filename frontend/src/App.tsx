import './App.css'
import {AuthStatus, useAuth} from "./useHook/useAuth.ts";
import {Login} from "./forms/Login.tsx";
import Home from './pages/Home.tsx';

function App() {
    const {status} = useAuth()

    if (status === AuthStatus.Unknown) {
        return (
            <>
                <Login />
            </>
        )
    } else {
        return (
            <>
                <Home />
            </>
        )
    }
}

export default App

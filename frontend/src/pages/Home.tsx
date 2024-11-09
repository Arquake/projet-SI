import React, { useState } from "react";
import { useAuth } from "../useHook/useAuth";
import "/app/src/styles/home.css"


export default function Home () {
    const {logout} = useAuth();
    const handleLogout = () => {
        logout()
    };

    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleOpenProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    }

    return (
        <>
            <div className="w-screen h-screen flex flex-col">
                <header className="p-2 grid grid-cols-3 gap-12 items-center bg-yellow-100">
                    <div className="flex col-span-1 col-start-2 justify-center">
                        <div className="cursor-pointer bg-yellow-300 p-2 rounded-full justify-self-center">
                            <div className="h-8 aspect-square">
                                <img src="/src/assets/parrot.svg" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-end">
                        <div className="cursor-pointer bg-yellow-300 p-2 rounded-full text-gray-700" onClick={handleOpenProfileMenu}>
                            <ProfileOrArrowSvg extendMenu={!showProfileMenu} />
                            <div className={(showProfileMenu? "profile-close":"profile-open") + " profile-bar"}>
                                <p>Paramètres</p>
                                <p>Se déconnecter</p>
                            </div>
                        </div>
                        
                        <div onClick={handleLogout} className="cursor-pointer hidden">
                            Logout
                        </div>
                    </div>
                    
                </header>

                <main className="flex-1 bg-gray-100">

                </main>
            </div>
        </>
    )
}



interface profileOrArrow {
    extendMenu: boolean
}

const ProfileOrArrowSvg: React.FC<profileOrArrow> = ({extendMenu}) => {
    return (
        <>
            {
                extendMenu?
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 aspect-square">
                    <path fill="currentColor" d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569z"/>
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 aspect-square">
                    <path fill="currentColor" fill-rule="evenodd" d="M12 4a8 8 0 0 0-6.96 11.947A4.99 4.99 0 0 1 9 14h6a4.99 4.99 0 0 1 3.96 1.947A8 8 0 0 0 12 4m7.943 14.076q.188-.245.36-.502A9.96 9.96 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12a9.96 9.96 0 0 0 2.057 6.076l-.005.018l.355.413A9.98 9.98 0 0 0 12 22q.324 0 .644-.02a9.95 9.95 0 0 0 5.031-1.745a10 10 0 0 0 1.918-1.728l.355-.413zM12 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6" clip-rule="evenodd"/>
                </svg>

            }
        </>
    )
}
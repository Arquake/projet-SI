import { useAuth } from "../useHook/useAuth"


export default function MainMenu() {

    const {endSession} = useAuth();

    const handleClick = () => {
        endSession();
    }

    return (
        <>
            <main className="flex-1 bg-gray-100 flex justify-center">
                <div className="container">
                    <div className="flex justify-center py-4">
                        <div onClick={handleClick} className="w-1/5 rounded-full border-2 border-emerald-500 flex justify-center py-2 px-8 cursor-pointer hover:shadow-xl duration-300">
                            <p className="text-emerald-500 font-bold text-2xl">
                                Valider
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
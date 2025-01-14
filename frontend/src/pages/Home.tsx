import MainMenu from "./MainMenu"
import NavBar from "./NavBar"
import "/app/src/styles/home.css"



export default function Home () {

    return (
        <>
            <div className="w-screen h-screen flex flex-col">
                
                <NavBar/>

                <MainMenu />
            
            </div>
        </>
    )
}

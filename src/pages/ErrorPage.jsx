import { Navbar } from "../components/Navbar";
import errorImage from "../assets/errorImage.jpg"

export const ErrorPage=({message})=>{
    return(
        <>
            <Navbar/>
            <div className="h-screen flex items-center gap-2 bg-[#d7e8f8]">
                {/* Image content */}
                <div >
                    <img src={errorImage} alt="" className="h-screen"/>
                </div>
                {/* Specific error message */}
                <div className="font-Rubik text-5xl text-primary">
                    Something went wrong
                </div>
            </div>
        </>
    )
}
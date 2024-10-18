import { Navbar } from "../../components/Navbar";
import errorImage from "../../assets/errorImage.jpg"

export const ErrorPage=({message})=>{
    return(
        <>
            <Navbar/>
            <div className="h-screen items-center gap-2 bg-[#d7e8f8] p-2 md:flex">
                {/* Image content */}
                <div >
                    <img src={errorImage} alt="" className="md:h-screen"/>
                </div>
                {/* Specific error message */}
                <div className="font-Rubik text-5xl text-primary text-center">
                    Something went wrong
                </div>
            </div>
        </>
    )
}
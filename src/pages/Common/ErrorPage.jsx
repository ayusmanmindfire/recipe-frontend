//Static imports
import { errorStrings } from "../../utils/constantStrings"
import { imagePaths } from "../../utils/imageImports"

export default function ErrorPage({message}){
    return(
        <>
            <div className="h-screen items-center gap-2 bg-[#d7e8f8] p-2 md:flex">
                {/* Image content */}
                <div >
                    <img src={imagePaths.errorImage} alt="" className="md:h-screen"/>
                </div>
                {/* Specific error message */}
                <div className="font-Rubik text-5xl text-primary text-center">
                    {errorStrings.wentWrong}
                </div>
            </div>
        </>
    )
}
import { Navbar } from "../../components/Navbar"
import cookingImage from "../../assets/cooking.jpg"
import { CustomButton } from "../../components/CustomButton"
import { useNavigate } from "react-router-dom"

export const LandingPage = () => {
    const navigate=useNavigate();
    return (
        <>
            <Navbar />

            {/* landing page design */}
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* left container */}
                <div className="w-full p-10 flex justify-center items-center ">
                    <div className="block">
                        <div className="font-bold text-4xl font-Rubik text-primary">
                            Dive into delicious recipes
                        </div>
                        <div className="font-Rubik">
                            If you are a chef, no matter how good a chef you are, it's not good cooking for yourself; the joy is in cooking for others.
                        </div>
                        <div className="flex gap-2">
                        <CustomButton text="Sign UP" eventFunction={()=>{navigate('/signup')}}/>
                        <CustomButton text="Go to recipes" eventFunction={()=>{navigate('/recipes')}}/>
                        </div>
                    </div>
                </div>
                {/* right container */}
                <div className="w-full">
                    <img src={cookingImage} alt="cooking" />
                </div>
            </div>
        </>
    )
}
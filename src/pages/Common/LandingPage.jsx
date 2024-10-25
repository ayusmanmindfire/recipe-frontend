import { Navbar } from "../../components/Navbar";
import cookingImage from "../../assets/cooking.jpg";
import darkCooking from "../../assets/darkCooking.jpg";
import { CustomButton } from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar />

            {/* landing page design */}
            <div className="relative grid grid-cols-1 md:grid-cols-2">
                {/* left container */}
                <div className="w-full p-10 flex justify-center items-center relative z-10">
                    <div className="block">
                        <div className="font-bold text-4xl font-Rubik text-primary">
                            Dive into delicious recipes
                        </div>
                        <div className="font-Rubik dark:text-white">
                            If you are a chef, no matter how good a chef you are, it's not good cooking for yourself; the joy is in cooking for others.
                        </div>
                        <div className="flex gap-2">
                            <CustomButton text="Sign UP" eventFunction={() => { navigate('/signup') }} />
                            <CustomButton text="Go to recipes" eventFunction={() => { navigate('/recipes') }} />
                        </div>
                    </div>
                </div>

                {/* right container */}
                <div className="w-full h-screen">
                    {/* Light mode image */}
                    <img src={cookingImage} alt="cooking light" className="w-full h-full object-cover dark:hidden" />

                    {/* Dark mode image */}
                    <div className="absolute inset-0 w-full h-full">
                        <img
                            src={darkCooking}
                            alt="cooking dark"
                            className="w-full h-full object-cover hidden dark:block filter"
                        />
                        {/* Dark overlay for additional effect */}
                        <div className="dark:absolute inset-0 bg-black opacity-60 "></div>
                    </div>
                </div>
            </div>
        </>
    );
};

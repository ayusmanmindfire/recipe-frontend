import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar"
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { userApi } from "../../utils/apiPaths";
import axios from "axios";
import chefImage from "../../assets/chef.jpg"

export const Profile=()=>{
    const [cookies, setCookie,removeCookie] = useCookies(['user']);
    const [userDetails,setUserDetails]=useState(null);
    const [loading, setLoading] = useState(true); // State to handle loading state
    const token = cookies.Authorization
    const navigate = useNavigate();

    //fetch user details using token verification
    useEffect(()=>{
        const fetchUserData=async()=>{
            try {
                if(!token){
                    navigate('/login')
                    return
                }
                const userResponse=await axios.get(userApi.verifyTokenUser,{
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token in header
                    },
                })
                setUserDetails(userResponse.data.data);
    
            } catch (error) {
                navigate('/error')
            }finally {
                setLoading(false);
            }
        }
        fetchUserData();
    },[]);

    if (loading) {
        return <div>Loading...</div>;
    }
    return(
        <>
    <Navbar />
    {/* Main Container */}
    <div className="min-h-screen dark:bg-gray-700 bg-gray-100 py-10 px-6 flex flex-col items-center transition-colors duration-200">
        {/* Profile Card */}
        <div className="bg-white p-8 dark:bg-gray-900 dark:text-white rounded-lg shadow-md w-full max-w-md font-Rubik">
            <h2 className="text-2xl font-semibold text-center mb-6">User Profile</h2>
            {/* User Details Section */}
            <div className="space-y-4 ">
                <div className="flex justify-between">
                    <span className="font-medium">Username:</span>
                    <span>{userDetails.username}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Email:</span>
                    <span>{userDetails.email}</span>
                </div>
            </div>
        </div>
        {/* Profile Image Section (Optional) */}
        <div className="mt-8 flex flex-col gap-5 items-center">
            <img 
                src={chefImage || "https://via.placeholder.com/150"} 
                alt="Profile" 
                className="w-56 h-32 rounded-full shadow-md object-cover"
            />
            <button className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-2 py-1 font-Rubik" onClick={()=>{
                removeCookie('Authorization');
                navigate('/login')
            }}>Log out</button>
        </div>
    </div>
</>

    )
}
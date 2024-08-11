import { SingupInput } from "@jaitesh/medium-common";
import { ChangeEvent, useState } from "react"; 
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { BACKEND_URL } from "../config";


export const Auth = ( { type }: {type : "signin" | "signup"}) => {
    const navigate = useNavigate();
    const [postInput, setPostInput] = useState<SingupInput>({
        name : "",
        password : "",
        username : ""
    })

    async function sendReqest(){
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" :"signin"}`, postInput)
        const jwt = response.data
        localStorage.setItem("token", (jwt))
        navigate("/blog")
    
    }

  return <>
    <div className="h-screen flex flex-col  justify-center">
        <div className="flex justify-center">
           <div>
                <div className="px-9">
                    <div className="text-3xl font-extrabold ">
                    {type === "signup" ? "Create An Account" : "Welcome Back "}
                    </div>
                    <div className="text-slate-400">
                   { type === "signin" ? "Don't have an account ?":"Already have an account ?"} 
                        <Link className="underline pl-2" to = {type === "signin" ? "/signup":"/signin"}>{type === "signin" ? "Sign Up":"Sing In"}</Link>
                    </div>
                </div>
                <div className="pt-4">
                {type === "signup" ? <LabledInput lable="Username" placeholder="Enter your Name " onChange={(e) => {
                    setPostInput({
                        ...postInput,
                        name : e.target.value })
                }} /> : null}
                <LabledInput lable="Email" placeholder="m@example.com " onChange={(e) => {
                    setPostInput({
                        ...postInput,
                        username : e.target.value })
                }} />
                <LabledInput lable="Password" placeholder="12345678" type="password" onChange={(e) => {
                    setPostInput({
                        ...postInput,
                        password : e.target.value })
                }} />
                </div>
                <div className="pt-5">
                    <button onClick={sendReqest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg w-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign Up":"Sing In"}</button>
                </div>
            </div>
        </div> 
    </div>
  </>
} 

interface LabledInputTypes {
    lable : string;
    placeholder : string;
    onChange : (e: ChangeEvent<HTMLInputElement>) => void;
    type? : string;
}
function LabledInput({ lable, placeholder, onChange, type} : LabledInputTypes ){
    return <div>
         <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white pt-5">{lable}</label>
            <input onChange={onChange} type= {type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
}
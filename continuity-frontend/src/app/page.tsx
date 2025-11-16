import Image from "next/image";
import login_pic from "@/assets/login_pic.png";
import logo from "@/assets/logo.png";
import Link from "next/link";
import googlelogo from "@/assets/googlelogo.png"


export default function Home() {

  return (
    <div className="w-screen h-screen flex" style={{ backgroundColor: "#000000", fontFamily: "'Montserrat', sans-serif" }}>
      <div className="h-full flex flex-col mx-auto page-transition justify-center items-center">
        <Image className="w-auto h-[125px]" src={logo} alt="logo"/>
        <div className="flex flex-col mx-auto justify-center items-center">   
          <h1 className="text-white text-center font-bold text-5xl p-5" >WELCOME BACK hello</h1>
          <input className="text-white mt-10 w-[30vw] min-w-[400px] mb-5 h-12 text-sm border border-white rounded-sm p-5 transition-transform duration-300 focus:ring-0 focus:ring-offset-0 focus:outline-none" placeholder="Username"></input>
          <input className="text-white h-12 w-[30vw] min-w-[400px] border border-white text-sm rounded-sm p-5 transition-transform duration-300 focus:ring-0 focus:ring-offset-0 focus:outline-none" placeholder="Password" type="Username"></input>
        </div>
        <div>
        <p className="text-xs text-red-400 mt-5 hover:text-red-800 duration-100 hover:cursor-pointer" >Forgot password?</p>
        <Link href="/dashboard" className="rounded-sm flex justify-center min-w-[400px] items-center text-white h-12 bg-red-400 hover:bg-red-500 mt-5 mb-10 font-bold transition-transform duration-300 hover:scale-[1.01]" >Sign in</Link>
        </div>
      </div>
    </div>

  );
}
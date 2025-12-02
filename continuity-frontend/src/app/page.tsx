import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import loginbg from "@/assets/loginbg.jpg"


export default function Home() {

  return (
    <div className="w-screen h-screen flex items-center" style={{backgroundImage: `url('${loginbg.src}')`,
    backgroundPosition: "center", backgroundSize: "cover", fontFamily: "'Montserrat', sans-serif" }}>
      <div className="h-screen w-screen flex flex-col mx-auto justify-center items-center bg-black/50 backdrop-blur">
        <Image className="w-auto h-[125px] page-transition" src={logo} alt="logo"/>
          <div className="flex flex-col mx-auto justify-center items-center page-transition">   
            <h1 className="text-white text-center font-bold text-4xl p-5 page-transition" >WELCOME BACK</h1>
            <input className="page-transition text-white mt-5 w-[20vw] min-w-[350px] mb-5 h-12 text-sm border border-white p-5 transition-transform duration-300 focus:ring-0 focus:ring-offset-0 focus:outline-none" placeholder="Username"></input>
            <input className="page-transition text-white h-12 w-[20vw] min-w-[350px] border border-white text-sm p-5 transition-transform duration-300 focus:ring-0 focus:ring-offset-0 focus:outline-none" placeholder="Password" type="Username"></input>
          </div>
          <div>
          <p className="page-transition text-xs text-red-400 mt-5 hover:text-red-800 duration-100 hover:cursor-pointer" >Forgot password?</p>
          <Link href="/dashboard" className="page-transition w-[20vw] flex justify-center min-w-[350px] items-center text-white h-12 bg-[#e35540] hover:bg-[#b54333] mt-5 mb-10 font-bold transition-transform duration-500 hover:scale-[1.01]" >Sign in</Link>
          </div>
      </div>
    </div>

  );
}
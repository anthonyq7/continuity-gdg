import Image from "next/image";
import login_pic from "@/assets/login_pic.png";
import logo from "@/assets/logo.png";


export default function Home() {

  return (
    <div className="w-screen h-screen flex" style={{ backgroundColor: "#000000"}}>
      <Image className="object-contain h-screen w-1/3" src={login_pic} alt="login" />
      <div className="h-full flex flex-col mx-auto justify-center items-center">
        <div className="flex flex-col mx-auto justify-center items-center">   
          <h1 className="text-white text-center font-bold text-5xl p-5" style={{ fontFamily: "Futura" }}>Welcome back</h1>
          <input className="text-white mt-10 w-[30vw] min-w-[400px] mb-10 h-12 text-sm border border-white rounded-sm p-5" placeholder="Username" style={{ fontFamily: "Futura" }}></input>
          <input className="text-white h-12 w-[30vw] min-w-[400px] border border-white text-sm rounded-sm p-5" placeholder="Password" type="Username" style={{ fontFamily: "Futura" }}></input>
        </div>
        <div>
        <p className="text-xs text-red-400 mt-5" style={{ fontFamily: "Futura" }}>Forgot password?</p>
        <button className="rounded-sm text-white w-[30vw] min-w-[400px] h-12 bg-red-400 mt-10 mb-10" style={{ fontFamily: "Futura" }}>Sign in</button>
        <div className="flex justify-between w-[30vw] min-w-[400px] items-center">
          <hr className="border-t-[0.5px] border-white w-[40%]"></hr>
          <p className="text-xs text-white" style={{ fontFamily: "Futura" }}>OR</p>
          <hr className="border-t-[0.5px] border-white w-[40%]"></hr>
        </div>
        <button className="rounded-sm text-white w-[30vw] h-12 min-w-[400px] bg-gray-900 mt-10 mb-10" style={{ fontFamily: "Futura" }}>Continue with Google</button>

        </div>
      </div>
    </div>

  );
}
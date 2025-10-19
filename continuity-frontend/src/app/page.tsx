import Image from "next/image";
import login_pic from "@/assets/login_pic.png";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#000000"}}>
      <Image src={login_pic} alt="login" />;
      <h1 style={{ position: "absolute", left: "1110px", top: "250px", color: "#FFFFFF", fontSize: "48px", fontWeight: "bold", }}>Welcome Back!</h1>
      <p style={{ position: "absolute", left: "1110px", top: "320px", color: "#FFFFFF", fontSize: "30px" }}>log in 🎉</p>
    </div>

  );
}

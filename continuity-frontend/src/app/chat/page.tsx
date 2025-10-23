export function ChatHeader() {
  return <h2>Welcome to Chat</h2>;
}

export default function Chat() {
  return (
    <div className="w-screen h-screen flex" style={{ backgroundColor: "#F6E8E8"}}>
        <input className="relative top-160 left-[30%] text-[#C41E3A] mt-50 w-[60vw] min-w-[400px] mb-30 h-12 text-sm border border-[#C41E3A] rounded-sm p-5" placeholder="Ask Chatbot Anything" style={{ fontFamily: "Futura" }}></input>
    </div>
  );
}
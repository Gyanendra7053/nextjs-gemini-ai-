import Image from "next/image";

export default function Home() {
  return (


    <>
      <main className="flex w-screen h-screen flex-col item-center justify-between p-24">
        <div className="input-area fixed  botttom-6 px-24 py-2 flex items-center justify-between w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <input 
          className="border p-2 rounded-md w-[80%] outline-none"
          placeholder="Type your messagw"
          type="text" />

          <button className="bg-neutral-700 text-white p-2 cursor-pointer rounded-md ml-4 w-[18%]"
          >Send</button>
        </div>


      </main>

    </>
  );
}

"use client"

import logo from "../../public/logo ZonSpy.png"
import { motion } from "framer-motion"
import { useState } from "react"


export default function Home() {

  const [isDark, setIsDark] = useState(false)


  return (
    <div className={`h-screen flex justify-center items-center ${isDark ? "bg-gray-700 text-white" : "bg-[#faf6cb] text-black"} `}>
      {/* dark mode button */}
      <div className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${isDark ? "bg-gray-600" : "bg-gray-300"} top-4 right-4 absolute`} onClick={() => setIsDark(!isDark)}>
        <motion.div
          className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
          animate={{ x: isDark ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {isDark ? "🌙" : "☀️"}
        </motion.div>
      </div>
      
      {/* content */}
      <section className="flex flex-col items-center">
        <img className={`w-[40vw] h-auto ${isDark ? "invert":"color-black"}`} src="/logo zon.spy.png" />

        <div className="flex items-center">
          <input
            className={` border-2 ${isDark ? "border-white":"border-black"} rounded-[30px] p-2 w-[30vw] text-center`}
            placeholder="Type the product name you want to search"
          />
          <button className="m-1 rounded-[30px] p-2 w-[30w] text-center cursor-pointer bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 ">Search</button>
        </div>        
      </section>
    </div>
  );
}

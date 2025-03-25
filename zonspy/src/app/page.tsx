"use client"
import { motion } from "framer-motion" //import for animations
import { useState } from "react"
/* ----------------------------- BOOTSTRAP ITENS ---------------------------- */
import Spinner from 'react-bootstrap/Spinner'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
/* ----------------------------- COMPONENTS ---------------------------- */
import ProductsList from "@/components/productList"
import axios from "axios"

export default function Home() {
/* --------------------------------- STATES --------------------------------- */
  const [isDark, setIsDark] = useState(false) //dark mode state
  const [keyword, setKeyword] = useState("") //keyword state
  const [loading, setLoading] = useState(false) //loading state
  const [products, setProducts] = useState([]) //products state

/* --------------------------------- FUNCTIONS --------------------------------- */

  const handleSearch = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`/api/keywords?keyword=${keyword}`)
      if (!keyword.trim()) return alert(response.data.error) //prevents an empty request
      setProducts(response.data.products) //returning the products
    } catch (error) {
      console.error(error)
      setProducts([]) //returning an empty array in case of error
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`h-screen flex flex-col justify-center items-center ${isDark ? "bg-gray-700 text-white" : "bg-[#fffbc5] text-black"} overflow-x-hidden`}>
      {/* dark mode button */}
      <div className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${isDark ? "bg-gray-600" : "bg-gray-300"} top-4 right-4 absolute`} onClick={() => setIsDark(!isDark)}>
        <motion.div
          className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
          animate={{ x: isDark ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        > {/* animation Switch */}
          {isDark ? "🌙" : "☀️"}
        </motion.div>
      </div>

      {/* SEARCH BAR */}
      <section className="flex flex-col items-center">
        {/* Fade out effect on search elements */}
        <motion.img
          className={`w-[40vw] h-auto ${isDark ? "invert" : "color-black"}`}
          src="/logo zon.spy.png"
          initial={{ display: 'block', opacity: 1 }}
          animate={{ display: products.length > 0 ? 'none' : 'block' , opacity: products.length > 0 ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        />

        <div className="flex items-center">
          <motion.div
            initial={{ y:0 }}
            animate={{ y: products.length > 0 ? -9 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <InputGroup className="mb-5 border-1 rounded w-[60vw]">
              <Form.Control
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Type here the product you want to search"
                aria-describedby="basic-addon2"
              />
              <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" id="button-addon2"
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? <Spinner animation="border" variant="info" size="sm" /> : 'Search'}
              </Button>
            </InputGroup>
          </motion.div>
        </div>
      </section>

      {/* PRODUCTS LISTS */}
      <section className="flex flex-col items-center w-full overflow-y-auto max-h-[70vh]">
        {/* Fade in effect on products */}
        {products.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: loading ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <ProductsList products={products} />
          </motion.div>
        )}
      </section>
    </div>
  )
}

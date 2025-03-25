import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

interface Products {
    image: string
    title: string
    rating: string
    reviews: string
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const keyword = searchParams.get("keyword") // The keyword is required to search on Amazon
    if (!keyword) {
        return NextResponse.json({ error: "Keyword is required" }, { status: 400 }) //response with status 400 for empty requests
    }
    try {
        const response = await axios.get(`http://localhost:4000/api/scrape?keyword=${keyword}`) // Fetching data from the Node server
        const products: Products[] = response.data.products || [] // Returning the products or an empty array
        return NextResponse.json({ products }, { status: 200 }) // Returning status + products
    } catch (e) { // Handling errors and exceptions
        console.error("Error fetching data", e)
        return NextResponse.json({ error: "Failed to return web scraping data" }, { status: 500 })
    }
}

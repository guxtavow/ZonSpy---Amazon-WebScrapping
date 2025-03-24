/* --------------------------------- IMPORTS -------------------------------- */
const express = require("express");
const axios = require("axios");
const { JSDOM } = require("jsdom");

const app = express();
const PORT = 3000;

/* ------------------------------- GET METHOD ------------------------------- */
app.get("/api/scrape", async (req, res) => {
    const { keyword } = req.query //Keyword is required to search in Amazon
    if (!keyword) {
        return res.status(400).json({ error: "Keyword is required" }) //prevents an empty request
    }

    try {
        const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}` //url with keyword search on amazon
        const { data } = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                 //passing a User-Agent header to prevent Amazon from blocking the request
            },
        })

        /* -------------------------------- SCRAPPING ------------------------------- */
        const dom = new JSDOM(data)
        const document = dom.window.document

        const products = []

        document.querySelectorAll(".s-result-item").forEach((item) => { //looping/maping through each product sought
            const title = item.querySelector("h2 span")?.textContent || "No title" //getting the title of product
            const rating = item.querySelector(".a-icon-alt")?.textContent.match(/[\d.]+/)?.[0] || "No rating" //getting the rating of product
            const reviews = item.querySelector(".s-link-style .s-underline-text")?.textContent.replace(/\D/g, "") || "0" //getting the number of reviews
            const image = item.querySelector(".s-image")?.src || "No image" //getting the image of product

            if (title !== "No title") {     //pushing the product only if it has a title (if the product exists, he haves a title)
                products.push({ title, rating, reviews, image })
            }

        })

        res.json({ keyword, products }) //returning the products
    } catch (error) {
        res.status(500).json({ error: "Failed search products", details: error.message }) //returning the error
    }
});

app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`)
});

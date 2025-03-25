interface Products {
    image: string,
    title: string,
    rating: string,
    reviews: string
}

interface ProductListProps{
    products : Products[]
}

const ProductsList : React.FC<ProductListProps> = ({products}) => {
    return (
        <div className="grid grid-cols-4 gap-4 mt-1">
            {/* mapping the array of products */}
            {products.map((product, index) => (
            <div key={index} className="border p-4 rounded shadow-lg">
                <img src={product.image} alt={product.title} className="w-full object-cover mb-3" />
                <h6 className="text-sm font-bold m-2">{product.title}</h6>
                <p className="text-sm">⭐ {product.rating} | 📝 {product.reviews} reviews</p>
            </div>
            ))}
        </div>
    )
}

export default ProductsList
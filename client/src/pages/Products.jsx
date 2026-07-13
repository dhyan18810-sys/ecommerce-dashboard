import { useEffect, useState } from "react";
import axios from "axios";

function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:5000/products")
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => console.log(err));

    }, []);

    return (

        <div style={{ padding: "20px" }}>

            <h1>Products</h1>

            <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Product</th>

                        <th>Category</th>

                        <th>Price</th>

                        <th>Stock</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {products.map((product) => (

                        <tr key={product.PRODUCT_ID}>

                            <td>{product.PRODUCT_ID}</td>

                            <td>{product.PRODUCT_NAME}</td>

                            <td>{product.CATEGORY}</td>

                            <td>₹ {product.SALE_PRICE}</td>

                            <td>{product.STOCK_QUANTITY}</td>

                            <td>{product.STOCK_STATUS}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Products;
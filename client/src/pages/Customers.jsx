import { useEffect, useState } from "react";
import axios from "axios";

function Customers() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:5000/customers")
            .then((res) => {
                setCustomers(res.data);
            });

    }, []);

    return (

        <div style={{ padding: "20px" }}>

            <h1>Customers</h1>

            <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Phone</th>

                        <th>City</th>

                        <th>Total Orders</th>

                        <th>Total Spent</th>

                    </tr>

                </thead>

                <tbody>

                    {customers.map((customer) => (

                        <tr key={customer.CUSTOMER_ID}>

                            <td>{customer.CUSTOMER_ID}</td>

                            <td>{customer.FIRST_NAME} {customer.LAST_NAME}</td>

                            <td>{customer.EMAIL}</td>

                            <td>{customer.PHONE}</td>

                            <td>{customer.CITY}</td>

                            <td>{customer.TOTAL_ORDERS}</td>

                            <td>₹ {customer.TOTAL_SPENT}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Customers;
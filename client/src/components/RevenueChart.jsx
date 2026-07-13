import { useEffect, useState } from "react";
import axios from "axios";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

function RevenueChart() {

    const [data, setData] = useState([]);

    useEffect(() => {

        axios
            .get("http://localhost:5000/revenue")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);

    return (

        <div
            style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.15)"
            }}
        >

            <h2>Revenue by Date</h2>

            <ResponsiveContainer width="100%" height={350}>

                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="SALES_DATE" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="REVENUE"
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}

export default RevenueChart;
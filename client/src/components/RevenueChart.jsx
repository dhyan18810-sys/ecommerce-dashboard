import { useEffect, useState } from "react";
import { getRevenue } from "../services/api";

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRevenue()
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    return (
        <div style={chartWrapperStyle}>
            <div style={chartHeaderStyle}>
                <h2 style={chartTitleStyle}>Revenue Trend</h2>
                <p style={chartSubtitleStyle}>Daily revenue over time</p>
            </div>

            {loading ? (
                <div style={loadingStyle}>Loading chart...</div>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis 
                            dataKey="SALES_DATE" 
                            stroke="#9CA3AF"
                            style={{ fontSize: "12px" }}
                        />
                        <YAxis 
                            stroke="#9CA3AF"
                            style={{ fontSize: "12px" }}
                        />
                        <Tooltip 
                            contentStyle={{
                                background: "#FFFFFF",
                                border: "1px solid #E5E7EB",
                                borderRadius: "8px",
                                fontSize: "12px"
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="REVENUE"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={true}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

const chartWrapperStyle = {
    width: "100%"
};

const chartHeaderStyle = {
    marginBottom: "24px"
};

const chartTitleStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1F2937",
    margin: "0 0 4px 0"
};

const chartSubtitleStyle = {
    fontSize: "13px",
    color: "#6B7280",
    margin: "0",
    fontWeight: "400"
};

const loadingStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "300px",
    color: "#9CA3AF",
    fontSize: "14px"
};

export default RevenueChart;
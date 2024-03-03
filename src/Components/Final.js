import axios from "axios";
import React, { useEffect, useState } from "react";

const Final = ({ pincode }) => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("");
    const [error, setError] = useState(null);

    // Function to fetch data based on pincode
    const fetchData = async (pincode) => {
        try {
            const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
            const postData = response.data[0].PostOffice;
            setData(postData);
            setError(null);
        } catch (error) {
            setError("Error fetching data. Please try again.");
            setData([]);
        }
    };

    // Fetch data when pincode changes
    useEffect(() => {
        if (pincode && pincode.length === 6) {
            fetchData(pincode);
        } else if (pincode) {
            setError("Pincode must be 6 digits.");
            setData([]);
        }
    }, [pincode]);

    const filterData = () => {
        if (data === null) {
            return [];
        }
        return data.filter(item => item.Name.toLowerCase().includes(filter.toLowerCase()));
    };

    return (
        <div>
            <h2>Pincode: {pincode}</h2>
            {error && <p>{error}</p>}
            <h2>Message: Number of pincode(s) found: {data ? data.length : 0}</h2>
            <div className="search">
            <span className="material-icons">search</span>
            <input placeholder="Filter" value={filter} onChange={(e) => setFilter(e.target.value)} />
            </div>
            
            <div className="card">
                {filterData().length > 0 ? (

                    filterData().map((item, index) => (
                        <div key={item.Name} className="cardSize">
                            <p>Name: {item.Name}</p>
                            <p>Branch Type: {item.BranchType}</p>
                            <p>Delivery Status: {item.DeliveryStatus}</p>
                            <p>District: {item.District}</p>
                            <p>State: {item.State} </p>
                        </div>

                    ))
                ) : (
                    <p>Couldn’t find the postal data you’re looking for...</p>
                )}</div>
        </div>
    );
};

export default Final;
import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

const HomePage = ({ setPincode }) => {
    const navigate = useNavigate();
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const number = (e) => {
        setCode(e.target.value);
    }
    const postalCode = async (e) => {
        e.preventDefault();
        console.log(code);

        if (code.length !== 6) {
            alert("Postal code should be 6 digits");
        } else {
            setLoading(true);
            try {
                setPincode(code);
                await new Promise((resolve) => setTimeout(resolve, 2000));

                
                setCode("");
                navigate("/Output");
            } catch (error) {
                console.error("Error during lookup:", error);
                // Handle error, show an error message, etc.
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        }
    }
    return (<div>

        <form onSubmit={postalCode}>
            <h1>Enter Pincode</h1>
            <input placeholder="Pincode" onChange={number} value={code} className="textfield" type="number" />
            <button type="submit" disabled={loading}>
                {loading ? (
                    <div className="loader-container">
                        <div className="loader">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                ) : (
                    "Lookup"
                )}
            </button>
        </form>


    </div>)
}
export default HomePage;
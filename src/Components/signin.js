import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config"; // Ensure this contains your backend URL

const SignIn = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (phone.length !== 10 && phone.length !== 13) {
            alert("Phone number must be 10 or 13 digits long.");
            return;
        }          

        // Validate phone number format
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Login failed.");
                return;
            }

            localStorage.setItem("token", data.token); // Store token
            navigate("/farmers"); // Redirect after login
        } catch (err) {
            setError("Server error. Try again later.");
            console.error(err);
        }
    };

    const handlePhoneNumberInput = (e) => {
        let value = e.target.value;
      
        // Remove anything that isn't a number, +, or - (adjust as needed)
        value = value.replace(/[^0-9+\-() ]/g, '');
      
        // Set the cleaned value to your input
        e.target.value = value;
    };

    return (
        <div>
            <div className="WholeSection">
                <div className="SignUpSection">
                    <div className="Text">
                        <img src="monoleg.png" height="70px" width="70px" alt="Logo Mono" />
                    </div>
                    <div className="FormSection">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={phone}
                                onInput={handlePhoneNumberInput}
                                onChange={(e) => setPhone(e.target.value)}
                                maxLength="13"
                                required
                            />
                            <div className="passwordclass" style={{ position: "relative" }}>
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    className="password-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span
                                    onClick={togglePasswordVisibility}
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        right: "10px",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer",
                                    }}
                                >
                                    {passwordVisible ? (
                                        <i className="fa fa-eye-slash" aria-hidden="true"></i>
                                    ) : (
                                        <i className="fa fa-eye" aria-hidden="true"></i>
                                    )}
                                </span>
                            </div>

                            {error && <p id="err">{error}</p>}

                            <button type="submit">Sign In</button>
                        </form>
                        <p id="paratwo">
                            Don't have an account?
                            <Link to="/Register"> Sign Up here and get started</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;

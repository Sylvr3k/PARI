import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config"; // Ensure this is correctly set

const SignIn = () => {
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ emailOrPhone, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Login failed");
                return;
            }

            // Store token securely in localStorage
            localStorage.setItem("token", data.token);

            // Redirect user to farmers dashboard
            navigate("/farmers");

        } catch (err) {
            setError("Server error. Please try again later.");
            console.error(err);
        }
    };

    return (
        <div className="WholeSection">
            <div className="SignUpSection">
                <div className="Text">
                    <img src="monoleg.png" height="70px" width="70px" alt="Logo Mono"/>
                </div>
                <div className="FormSection">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="emailOrPhone"
                            placeholder="Email Address Or Phone Number"
                            value={emailOrPhone}
                            onChange={(e) => setEmailOrPhone(e.target.value)}
                            required
                        />
                        <div className="passwordclass" style={{ position: "relative" }}>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
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

                        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

                        <button type="submit">Sign In</button>
                    </form>

                    <p id="paratwo">
                        Don't have an account? <Link to="/register">Sign Up here and get started</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;

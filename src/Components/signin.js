import React, { useState } from "react";
import { Link } from 'react-router-dom';

const SignIn = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div>
            <div className="WholeSection">
                <div className="SignUpSection">
                    <div className="Text">
                        <img src="monoleg.png" height="70px" width="70px" alt="Logo Mono " />
                    </div>
                    <div className="FormSection">
                        <form>
                            <input type="text" name="emailornumber" placeholder="Email Address Or Phone Number" />
                            <div class="passwordclass" style={{ position: "relative" }}>
                                <input type={passwordVisible ? "text" : "password"} name="password" placeholder="Password" className="password-input"/>
                                <span onClick={togglePasswordVisibility}
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        right: "10px",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer",
                                    }}>
                                    {passwordVisible ? (
                                        <i className="fa fa-eye-slash" aria-hidden="true"></i>
                                    ) : (
                                        <i className="fa fa-eye" aria-hidden="true"></i>
                                    )}
                                </span>
                            </div>
                            <p id="parathree">
                               {/*<div className="CheckAndForgot">
                                    <input
                                        type="checkbox"
                                        id="rememberme"
                                        name="rememberme"
                                        value="rememberme"
                                    />
                                    <label>&nbsp;&nbsp;Remember Me</label>
                                </div>
                                <Link to="#">Forgot your password?</Link>*/}
                            </p>
                            <button type="submit">Sign In</button>
                        </form>
                        <p id="paratwo">
                            Don't have an account?
                            <Link to="/Register">Sign Up here and get started</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;

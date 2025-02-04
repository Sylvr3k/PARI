/*import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Register = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const [setFileName] = useState('No file chosen');
    const [previewSrc, setPreviewSrc] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);

            // Create a FileReader to show image preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewSrc(reader.result); // Set the image data URL
            };
            reader.readAsDataURL(file); // Read file as a data URL
        } else {
            setFileName('No file chosen');
            setPreviewSrc(null); // Reset preview if no file
        }
    };

    return (
        <div>
            <div className="WholeSectionRegister">
                <div className="SignUpSectionRegister">
                    <div className="Text">
                        <img src="monoleg.png" height="70px" width="70px" alt="Logo Mono" />
                    </div>
                    <div className="FormSection">
                        <form>
                            <div className="FullName">
                                 <input type="text" name="firstname" placeholder="First Name"/>
                                 <input type="text" name="midname" placeholder="Middle Name"/>
                                 <input type="text" name="lastname" placeholder="Last Name"/>
                            </div>
                            <div className="AddressAge">
                                <input type="number" name="age" placeholder="Age"/>
                                <input type="text" name="fulladdress" placeholder="Village/Street, Ward, District and Region "/>
                            </div>
                            <div className="PhoneDesignation">
                                <input type="text" name="phone" placeholder="Phone Number"/>
                                <input type="text" name="designation" placeholder="Designation"/>
                            </div>
                            <div className="IdEmailPass">
                                <div className="IdEmail">
                                    <input type="text" id="id" name="id" placeholder="ID Number"/>
                                    <input type="text" id="emailregister" name="email" placeholder="Email Address (optional)"/>
                                </div>
                                <div className="PlusPassword">
                                    <input type={passwordVisible ? "text" : "password"} name="password" placeholder="Add Password"/>
                                    <input type={passwordVisible ? "text" : "password"} name="confirmpassword" placeholder="Confirm Password"/>
                                    <button id="btnpass" type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                                        {passwordVisible ? "Hide" : "Show"}
                                    </button>
                                </div>
                                <div className="Profile">
                                <label htmlFor="profilePicture" className="custom-file-upload">
                                    Add Passport Size
                                </label>
                                <input 
                                    type="file" 
                                    name="profilePicture" 
                                    id="profilePicture" 
                                    accept="image/*"
                                    style={{ display: 'none' }} 
                                    onChange={handleFileChange} 
                                />
                                {previewSrc && (
                                    <div className="image-preview">
                                        <img src={previewSrc} alt="Selected Preview" />
                                    </div>
                                )}
                                </div>    
                            </div>
                            <div className="Extra">
                                 <select id="region">
                                    <option value="" disabled selected>Choose to Work in Your Region</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                                <select id="position">
                                    <option value="" disabled selected>Choose to Your Position</option>
                                    <option value="employer">Employer</option>
                                    <option value="farmer">Farmer</option>
                                </select>
                                <input id="veo" type="text" name="extraone" placeholder="Full Names of Village Executive Officer(VEO) and his/her PhoneNumber"/>
                                <input id="weo" type="text" name="extratwo" placeholder="Full Names of Ward Executive Officer(WEO) and his/her PhoneNumber"/>
                            </div>
                            <button type="submit" id="reggie">Register</button>
                        </form>
                        <p id="parafour">
                            Already have an account?
                            <Link id="half" to="/">Log In here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;*/

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [previewSrc, setPreviewSrc] = useState(null);
    const [formData, setFormData] = useState({
        firstname: "",
        midname: "",
        lastname: "",
        age: "",
        fulladdress: "",
        phone: "",
        designation: "",
        id: "",
        email: "",
        password: "",
        confirmpassword: "",
        extraone: "",
        extratwo: "",
        region: "",
        position: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewSrc(reader.result);
                setFormData((prev) => ({ ...prev, profilePicture: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const age = Number(formData.age);
        if (isNaN(age) || age < 18) {
            setError("You must be at least 18 years old to register.");
            return;
        }
        
        if (formData.password !== formData.confirmpassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const emailCheckResponse = await fetch(`${API_BASE_URL}/api/check-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email })
            });
            const emailCheckData = await emailCheckResponse.json();

            if (emailCheckData.exists) {
                setError("This email is already registered.");
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            
            if (response.ok) {
                alert("Registration successful!");
                navigate("/");
            } else {
                setError(data.message || "Registration failed.");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleInputChange} required />
                <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleInputChange} required />
                <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleInputChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
                <input type="password" name="confirmpassword" placeholder="Confirm Password" value={formData.confirmpassword} onChange={handleInputChange} required />
                <input type="file" name="profilePicture" onChange={handleFileChange} required />
                {previewSrc && <img src={previewSrc} alt="Preview" className="image-preview" />}
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/">Log in</Link></p>
        </div>
    );
};

export default Register;

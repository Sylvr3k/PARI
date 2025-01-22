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
import { Link, useNavigate } from 'react-router-dom';
import API_BASE_URL from "../config";  // Import the API base URL

const Register = () => {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [previewSrc, setPreviewSrc] = useState(null);
    const [formData, setFormData] = useState({
        firstname: '',
        midname: '',
        lastname: '',
        age: '',
        fulladdress: '',
        phone: '',
        designation: '',
        id: '',
        email: '',
        password: '',
        confirmpassword: '',
        extraone: '',
        extratwo: '',
        region: '',
        position: ''
    });

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewSrc(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewSrc(null);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (formData.password !== formData.confirmpassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/register`, {  // Use the centralized URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Registration successful!');
                navigate('/');  // Redirect to login page
            } else {
                const errorData = await response.json();
                alert(`Registration failed: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
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
                        <form onSubmit={handleSubmit}>
                            <div className="FullName">
                                <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleInputChange} required/>
                                <input type="text" name="midname" placeholder="Middle Name" value={formData.midname} onChange={handleInputChange} required/>
                                <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleInputChange} required/>
                            </div>
                            <div className="AddressAge">
                                <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleInputChange} required/>
                                <input type="text" name="fulladdress" placeholder="Village/Street, Ward, District and Region" value={formData.fulladdress} onChange={handleInputChange} required/>
                            </div>
                            <div className="PhoneDesignation">
                                <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required/>
                                <input type="text" name="designation" placeholder="Designation" value={formData.designation} onChange={handleInputChange} required/>
                            </div>
                            <div className="IdEmailPass">
                                <div className="IdEmail">
                                    <input type="text" name="id" placeholder="ID Number" value={formData.id} onChange={handleInputChange} required/>
                                    <input type="email" id="emailregister" name="email" placeholder="Email Address (optional)" value={formData.email} onChange={handleInputChange} />
                                </div>
                                <div className="PlusPassword">
                                    <input type={passwordVisible ? "text" : "password"} name="password" placeholder="Add Password" value={formData.password} onChange={handleInputChange} required/>
                                    <input type={passwordVisible ? "text" : "password"} name="confirmpassword" placeholder="Confirm Password" value={formData.confirmpassword} onChange={handleInputChange} required/>
                                    <button  id="btnpass" type="button" className="toggle-password" onClick={togglePasswordVisibility}>
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
                                        required 
                                    />
                                    {previewSrc && (
                                        <div className="image-preview">
                                            <img src={previewSrc} alt="Selected Preview" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="Extra">
                                <select id="region" name="region" value={formData.region} onChange={handleInputChange} required>
                                    <option value="" disabled>Choose to Work in Your Region</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                                <select id="position" name="position" value={formData.position} onChange={handleInputChange} required>
                                    <option value="" disabled>Choose Your Position</option>
                                    <option value="employer">Employer</option>
                                    <option value="farmer">Farmer</option>
                                </select>
                                <input type="text" name="extraone" placeholder="Full Names of Village Executive Officer(VEO) and his/her Phone Number" value={formData.extraone} onChange={handleInputChange} required/>
                                <input type="text" name="extratwo" placeholder="Full Names of Ward Executive Officer(WEO) and his/her Phone Number" value={formData.extratwo} onChange={handleInputChange} required/>
                            </div>
                            <button type="submit">Register</button>
                        </form>
                        <p id="parafour">
                            Already have an account? <Link id="half" to="/">Log In here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;


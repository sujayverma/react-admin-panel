import React, { useState } from "react";
import './Form.css';
import { useNavigate } from "react-router-dom"; // ✅ import this
import axios from "axios";


const Register: React.FC = () => {
    const navigate = useNavigate(); // ✅ create navigate instance
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [serverMessage, setServerMessage] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Invalid email address";

        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6)
            newErrors.password = "Password must be at least 6 characters";

        if (!formData.confirmPassword)
            newErrors.confirmPassword = "Please confirm your password";
        else if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setServerMessage(null);

        if (!validate()) return;

        try {
            setLoading(true);


            const response = await axios.post("http://localhost:8085/api/register", {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.confirmPassword,
            });
            setServerMessage("✅ Registration successful!");
            console.log("Server response:", response.data);

            // Optionally reset form
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            // ✅ Redirect to login page after 2 seconds
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error: any) {
            if (error.response) {
                // Server returned error
                setServerMessage(`❌ ${error.response.data.message || "Registration failed"}`);
            } else {
                // Network or other error
                setServerMessage("❌ Network error. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="form-signin" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Please Sign Up</h1>

            <label htmlFor="inputFirstName" className="sr-only">First Name</label>
            <input
                type="text"
                id="firstName"
                className="form-control mb-2"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
            />
            {errors.firstName && <div className="text-danger small">{errors.firstName}</div>}

            <label htmlFor="inputLastName" className="sr-only">Last Name</label>
            <input
                type="text"
                id="lastName"
                className="form-control mb-2"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
            />
            {errors.lastName && <div className="text-danger small">{errors.lastName}</div>}

            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input
                type="email"
                id="email"
                className="form-control mb-2"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
            />
            {errors.email && <div className="text-danger small">{errors.email}</div>}

            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input
                type="password"
                id="password"
                className="form-control mb-2"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />
            {errors.password && <div className="text-danger small">{errors.password}</div>}

            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
            <input
                type="password"
                id="confirmPassword"
                className="form-control mb-2"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
            />
            {errors.confirmPassword && (
                <div className="text-danger small">{errors.confirmPassword}</div>
            )}

            <button className="btn btn-lg btn-primary btn-block mt-3" type="submit" disabled={loading}>
                {loading ? "Registering..." : "Sign Up"}
            </button>
            {serverMessage && (
                <div
                    className={`mt-3 text-center ${serverMessage.startsWith("✅") ? "text-success" : "text-danger"
                        }`}
                >
                    {serverMessage}
                </div>
            )}
        </form>
    );
}

export default Register;
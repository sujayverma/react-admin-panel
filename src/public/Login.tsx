import React, { useState } from "react";
import './Form.css';
import { useNavigate } from "react-router-dom"; // ✅ import this
import axios from "axios";
import api from "../libs/axiosInstance";

const Login: React.FC = () => {
    const navigate = useNavigate(); // ✅ create navigate instance
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string; apiError?: string }>({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: typeof errors = {};
        if (!email) {
        newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Invalid email format";
        }

        if (!password) {
        newErrors.password = "Password is required";
        } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        try {
        setLoading(true);
        setErrors({});

        // Send POST request
        const response = await api.post("/login", {
            email,
            password,
        });

        console.log("Login response:", response.data);

        if (response.data.message === "Login successful") {
            console.log("Token:", response.data);
            localStorage.setItem("token", response.data.token);
            // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
            navigate("/");
            // setTimeout(() => {
            //     navigate("/dashboard");
            // }, 1000);
        } else {
            setErrors({ apiError: response.data.message || "Login failed" });
        }
        } catch (err: any) {
        console.error("Login error:", err);
        setErrors({ apiError: err.response?.data?.message || "Something went wrong. Please try again." });
        } finally {
        setLoading(false);
        }
    };

    return (
        <>
         <form className="form-signin" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label className="sr-only">Email address</label>
            <input
                type="email"
                id="inputEmail"
                className="form-control mb-2"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
            <label className="sr-only">Password</label>
            <input
                type="password"
                id="inputPassword"
                className="form-control mb-2"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {errors.password && <p className="text-danger">{errors.password}</p>}
            {errors.apiError && <p className="text-danger">{errors.apiError}</p>}
            <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
            </button>
           
        </form>

        </>
    );
}

// class Login extends Component {
//     render() {
//         return (
//             <>
                // <form className="form-signin">
                    
                //     <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                //     <label className="sr-only">Email address</label>
                //     <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required />
                //     <label className="sr-only">Password</label>
                //     <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                    
                //     <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                // </form>
//             </>
//         )

//     }

// }

export default Login;
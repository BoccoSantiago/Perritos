import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
    });

    const navigate = useNavigate();

    const { name, email, password, error, loading } = data;

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setData({ ...data, error: null, loading: true });
        if (!name || !email || !password) {
            setData({ ...data, error: "All fields are required" });
        }
        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await setDoc(doc(db, "users", result.user.uid), {
                uid: result.user.uid,
                name,
                email,
                createdAt: Timestamp.fromDate(new Date()),
                // isOnline: false,
            });
            setData({
                name: "",
                email: "",
                password: "",
                error: null,
                loading: false,
            });
            navigate("/");
        } catch (err) {
            setData({ ...data, error: err.message, loading: false });
        }
    };
    return (
        <div className="login-container">
            <div className="login-inner">

                <form onSubmit={handleSubmit}>
                    <h3>Create An Account</h3>
                    <div className="input_container">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={name} onChange={handleChange} />
                    </div>
                    <div className="input_container">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input_container">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    {error ? <p className="error">{error}</p> : null}
                    <div className="btn_container">
                        <button className="btn" disabled={loading}>
                            {loading ? "Creating ..." : "Register"}
                        </button>
                    </div>
                </form>
            </div>
            <p className="my-4 text-sm text-center px-3">
                Don't have an account?&nbsp; 
                <Link to="/login" className="text-blue-700 hover:text-blue-900">
                    Login here
                </Link>
            </p>
        </div>
    );
};

export default Register;
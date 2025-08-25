import React, { useState } from 'react';
import { login } from '../services/api';
import '../styles/login.css'; // you can create this CSS based on signup.css
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        mobileNumber: '',
        password: '',
    });

    const [message, setMessage] = useState({ type: '', text: '' })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // clear field-specific error
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.mobileNumber.trim()) {
            newErrors.mobileNumber = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
            newErrors.mobileNumber = 'Mobile number must be 10 digits';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await login(formData); // call backend API
            setMessage({ type: 'success', text: response.message || 'Login successful!' });

            // Optional: Save token to localStorage if returned
            if (response.data) {
                localStorage.setItem('token', response.data);
            }

            setTimeout(() => {
                navigate('/familyGroup'); // redirect to Family Group page after successful login
            }, 1000)

        } catch (error) {
            console.log("FULL BACKEND ERROR:", error);

            const backendMessage = error.response?.data?.error || error.response?.data?.message || error.message;



            setMessage({
                type: 'error',
                text: backendMessage || 'Login failed. Please check your credentials and try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <h1>Login</h1>
                <p>Welcome back! Please login to continue</p>
            </div>

            {message.text && (
                <div className={`alert alert-${message.type}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="mobileNumber">Mobile Number *</label>
                    <input
                        type="tel"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        className={errors.mobileNumber ? 'error' : ''}
                        placeholder="Enter your mobile number"
                    />
                    {errors.mobileNumber && <span className="error-message">{errors.mobileNumber}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password *</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={errors.password ? 'error' : ''}
                        placeholder="Enter your password"
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <div className="signup-link">
                Don't have an account? <a href="/signup">Sign up here</a>
            </div>
        </div>
    );
};

export default Login;

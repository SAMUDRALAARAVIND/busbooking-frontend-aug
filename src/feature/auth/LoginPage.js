import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginPage.scss';

const LoginPage = ({ onLoginClick, onSignUpClick }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const showToast = (message) => {
        toast(message);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Email:', formData.email);
        console.log('Password:', formData.password);

        e.preventDefault();
        setLoading(true);
        setError(null); // Clear any previous error

        try {
            const response = await fetch('http://localhost:8000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Login failed. Please try again.');
            }

            const data = await response.json();
            console.log('Login successful:', data.token);
            
            localStorage.setItem('token', data.token);
            showToast('Login successfull');
            onLoginClick();

        } catch (err) {
            console.error(err);
            showToast(err.message)
            setError(err.message);
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className='login-container'>
        {/* <ToastContainer /> */}
            <div className='left-section'>
                <div className='logo'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100px"
                        height="27.52px"
                        fill="none"
                        viewBox="0 0 183 40"
                        id="abhibus-logo"
                        style={{ color: "gray", verticalAlign: "middle" }}
                    >
                        <g clipPath="url(#main_logo_svg__clip0_576_4713)">
                            <path
                                fill="#C32629"
                                d="M16.599 36.199h-.102c-.84 1.354-1.96 2.327-3.355 2.916-1.395.59-2.867.886-4.416.886-1.145 0-2.246-.165-3.303-.496a8.22 8.22 0 0 1-2.8-1.486A7.086 7.086 0 0 1 .705 35.57c-.473-.97-.706-2.1-.706-3.386 0-1.458.26-2.691.783-3.697a7.171 7.171 0 0 1 2.12-2.5 10.334 10.334 0 0 1 3.053-1.535 21.843 21.843 0 0 1 3.556-.81 33.347 33.347 0 0 1 3.682-.312c1.227-.032 2.361-.052 3.405-.052 0-1.387-.48-2.491-1.44-3.308-.958-.814-2.092-1.223-3.404-1.223-1.313 0-2.38.269-3.405.809-1.027.537-1.941 1.277-2.748 2.215L1.564 17.5a13.779 13.779 0 0 1 4.945-3.049 17.169 17.169 0 0 1 5.852-1.017c2.218 0 4.044.286 5.475.859 1.428.572 2.573 1.414 3.43 2.527.856 1.11 1.455 2.473 1.79 4.087.335 1.615.505 3.482.505 5.6v12.865h-6.96v-3.177l-.003.003Zm-1.868-7.917c-.57 0-1.287.025-2.144.08-.857.052-1.683.2-2.471.44-.791.245-1.464.61-2.019 1.095-.554.488-.832 1.165-.832 2.03 0 .938.388 1.635 1.162 2.084.774.453 1.582.677 2.422.677.738 0 1.455-.104 2.144-.312a6.27 6.27 0 0 0 1.843-.886 4.255 4.255 0 0 0 1.287-1.458c.32-.59.481-1.283.481-2.083v-1.667h-1.873ZM29.01 0h7.567v16.77h.102c.873-1.213 1.993-2.074 3.355-2.579 1.362-.501 2.834-.754 4.416-.754 1.749 0 3.311.373 4.692 1.119a10.987 10.987 0 0 1 3.507 2.993c.958 1.25 1.697 2.684 2.218 4.299.522 1.614.783 3.306.783 5.076 0 1.911-.286 3.665-.857 5.26-.571 1.599-1.386 2.978-2.446 4.14a10.987 10.987 0 0 1-3.809 2.708c-1.48.642-3.127.965-4.945.965-.876 0-1.7-.123-2.471-.364a10.448 10.448 0 0 1-2.145-.938 8.987 8.987 0 0 1-1.716-1.277 8.438 8.438 0 0 1-1.186-1.382h-.102v3.334h-6.96V0h-.003Zm8.55 31.354c1.06 1.182 2.548 1.771 4.465 1.771 1.917 0 3.405-.59 4.465-1.77 1.06-1.18 1.59-2.726 1.59-4.636 0-1.91-.53-3.454-1.59-4.636-1.06-1.178-2.548-1.77-4.465-1.77-1.917 0-3.405.592-4.465 1.77-1.06 1.182-1.59 2.728-1.59 4.636s.53 3.456 1.59 4.635ZM67.652 0v17.5h.102c.167-.485.453-.97.856-1.458.404-.486.89-.919 1.464-1.302.57-.381 1.244-.694 2.018-.938a8.442 8.442 0 0 1 2.523-.364c1.917 0 3.463.304 4.64.912 1.179.609 2.093 1.45 2.75 2.525.656 1.077 1.1 2.344 1.337 3.802.236 1.458.354 3.037.354 4.74v13.958h-7.568V26.979c0-.729-.024-1.486-.077-2.267a7.28 7.28 0 0 0-.453-2.16 3.737 3.737 0 0 0-1.161-1.614c-.522-.417-1.269-.625-2.246-.625-.978 0-1.766.183-2.373.548a3.668 3.668 0 0 0-1.386 1.458 6.087 6.087 0 0 0-.632 2.056 18.185 18.185 0 0 0-.15 2.396v12.604h-7.568V0h7.57ZM89.825 2.89c.856-.885 1.891-1.33 3.102-1.33 1.211 0 2.246.445 3.103 1.33.857.885 1.288 1.952 1.288 3.202S96.89 8.41 96.03 9.296c-.857.886-1.892 1.327-3.103 1.327-1.21 0-2.246-.444-3.103-1.327-.856-.885-1.287-1.951-1.287-3.204 0-1.253.428-2.32 1.287-3.202Zm-.681 11.17h7.567v25.313h-7.567V14.06Z"
                            />
                            <path
                                fill="#541717"
                                d="M102.867 0h7.568v16.77h.101c.873-1.213 1.994-2.074 3.356-2.579 1.362-.501 2.833-.754 4.415-.754 1.749 0 3.311.373 4.693 1.119a10.987 10.987 0 0 1 3.506 2.993c.958 1.25 1.697 2.684 2.219 4.299.521 1.614.782 3.306.782 5.076 0 1.911-.285 3.665-.856 5.26-.572 1.599-1.387 2.978-2.447 4.14a10.987 10.987 0 0 1-3.808 2.708c-1.48.642-3.128.965-4.946.965a8.238 8.238 0 0 1-2.471-.364 10.443 10.443 0 0 1-2.144-.938 8.975 8.975 0 0 1-1.717-1.277 8.475 8.475 0 0 1-1.186-1.382h-.101v3.334h-6.961V0h-.003Zm8.551 31.354c1.06 1.182 2.548 1.771 4.464 1.771 1.917 0 3.405-.59 4.465-1.77 1.06-1.18 1.59-2.726 1.59-4.636 0-1.91-.53-3.454-1.59-4.636-1.06-1.178-2.548-1.77-4.465-1.77-1.916 0-3.404.592-4.464 1.77-1.06 1.182-1.59 2.728-1.59 4.636s.53 3.456 1.59 4.635ZM157.553 39.375h-7.265v-3.438h-.102a8.56 8.56 0 0 1-1.035 1.459 6.76 6.76 0 0 1-1.538 1.302 8.776 8.776 0 0 1-2.067.937 8.448 8.448 0 0 1-2.524.365c-1.916 0-3.473-.304-4.668-.913-1.194-.606-2.119-1.45-2.773-2.525-.656-1.074-1.093-2.343-1.312-3.802-.22-1.458-.327-3.037-.327-4.74V14.064h7.567v12.395c0 .73.025 1.486.077 2.265.05.78.201 1.502.453 2.162.253.661.64 1.198 1.162 1.615.522.417 1.268.625 2.246.625.977 0 1.766-.184 2.372-.548a3.674 3.674 0 0 0 1.387-1.459c.319-.605.53-1.293.632-2.055.101-.763.151-1.563.151-2.396V14.062h7.567v25.313h-.003ZM176.774 21.511c-1.109-1.422-2.573-2.135-4.388-2.135a4.03 4.03 0 0 0-1.867.468c-.604.313-.909.853-.909 1.615 0 .625.311 1.086.934 1.382.62.296 1.411.556 2.37.781.958.227 1.985.469 3.078.73 1.092.26 2.119.668 3.078 1.224a7.006 7.006 0 0 1 2.372 2.265c.621.956.934 2.231.934 3.826 0 1.596-.346 2.977-1.035 4.038a8.026 8.026 0 0 1-2.65 2.552c-1.077.645-2.287 1.094-3.633 1.355-1.345.26-2.674.389-3.984.389-1.716 0-3.449-.252-5.195-.754-1.749-.502-3.229-1.398-4.44-2.684l4.591-5.26c.705.905 1.488 1.587 2.345 2.056.856.468 1.859.704 3.001.704.873 0 1.664-.131 2.37-.389.705-.26 1.059-.737 1.059-1.434 0-.658-.31-1.154-.933-1.485-.623-.33-1.411-.606-2.373-.834-.958-.224-1.985-.468-3.078-.729a12.496 12.496 0 0 1-3.078-1.173 6.486 6.486 0 0 1-2.369-2.215c-.624-.954-.934-2.231-.934-3.827 0-1.491.294-2.777.881-3.854a7.923 7.923 0 0 1 2.321-2.656c.958-.694 2.059-1.206 3.303-1.538a14.732 14.732 0 0 1 3.784-.494c1.614 0 3.245.245 4.893.73a9.055 9.055 0 0 1 4.187 2.604l-4.64 4.74.005.002Z"
                            />
                        </g>
                    </svg>
                </div>
                <ul className="features">
                    <li>
                        <b>Abhi Assured</b>
                        <p>Protect yourself with up to 150% refund in case of service cancellation</p>
                    </li>
                    <li>
                        <b>Free Cancellation</b>
                        <p>Protect yourself from cancellation charges and get 100% refund</p>
                    </li>
                    <li>
                        <b>4.6* Rating</b>
                        <p>
                            India's highest-rated bus platform, trusted by 5+ crore happy customers
                        </p>
                    </li>
                </ul>
                <img
                    className='bus-image'
                    src='https://static.abhibus.com/web/media/branding/Login.svg'
                    alt='Bus-image'
                />
            </div>
            <div className='right-section'>
                <h2 className='main_heading'>Login to AbhiBus</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Enter Email to Continue</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Email" />

                    <label htmlFor="referral-code">Enter Password</label>
                    <input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        id="referral-code"
                        placeholder="Enter Referral Code if Available" />

                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <p className='para'>Don't have an account?
                        {" "}
                        <span
                            className="sign-up-link"
                            onClick={onSignUpClick}
                        >
                            Sign Up
                        </span>
                    </p>

                    {/* <button type="submit" className="login-btn">Login</button> */}
                </form>
                {/* <div className="divider">
                    <span>Or Continue With</span>
                </div>
                <button className="google-btn">
                    <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAABzElEQVR4Ab2WAUQDURjHDw0QIAQkAVBaMwvDJiMbY7QgFgAkAAGZZUASFiyAnQUEotMIGUKgAAYNWxY20Gyv9+d57d52X99mN/zcuee933vv/b+7sxKnyX9pxUORVixUkNe6pCMRQN3XVVuEMxbZ2E4Ej7WARwd9phbKGa/Izg2+aIwGxmAJsTUSMRcmSP2UFcgVqm0UDBzJjcKhZYSQcWZZIsVZjgz8pTEaGniI6mYnQnzCKothzfruFteFKeXL+Fh9J7DdfwyI4ZMlcIUUQDhnmRZeQDTKV3ZLnYU/wmdTiNWenReXqY6xQq8suZ6C8m6psiKFS21TiGeUTAnFDCQsQ6aEgRd/hN3c4oWL3VIIjdAgMMzQNCXvHjS9z1CVxWgtHt4lxaadIcuCkWBhgpS6Cv/jYU0E7YyGL+Ftt+vVVr0PidXKgUu4Y2de57U6PNfCVDWVM2WzSGP5nzwRmg0tBHLgTwg8pD3JkZcoaKfDmFj08k3E84NJstrY9xAHaoi85I6kpMB9T7dX90Tk9sqUuhI/NlNCxkJJXaVgfg99keKKQmf9JmJ7iTNlkg5P/SOMoOgzYmK+MGghkUIMpEKiV457pFMFaJ8z1i/ATnOr+aZzdAAAAABJRU5ErkJggg=="
                        alt=""
                    />
                    Sign in with Google
                </button>
                <p>
                    By logging in, I understand & agree to AbhiBus <Link to="#">terms of use</Link> 
                    & <Link to="#">privacy policy</Link>
                </p> */}
            </div>
        </div>
    )
}

export default LoginPage
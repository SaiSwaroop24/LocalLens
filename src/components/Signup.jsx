import { useState } from 'react';
import Nav from './Main/Nav';
import axios from 'axios';
function Signup() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Signup forms

  const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/signup', signupData);
      alert(response.data.message);  // Display the signup success message
      setIsLogin(true);  // Switch to the login form after signup
    } catch (error) {
      alert(error.response.data.message);  // Show error message
    }
  };
  

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        loginData
      });
      alert(response.data.message);  // Display the login success message
      localStorage.setItem('authToken', response.data.token);  // Store the JWT token in localStorage
      // Redirect to another page after successful login, or you can update UI state
    } catch (error) {
      alert(error.response.data.message);  // Show error message
    }
  };
  

  return (
    <>
    <Nav/>
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>{isLogin ? 'Log In' : 'Sign Up'}</h2>
        
        {/* Conditional Form Rendering */}
        {isLogin ? (
          <form onSubmit={handleLogin}>
            <input
              style={styles.input}
              placeholder="Email"
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <button style={styles.button} type="submit">Log In</button>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <input
              style={styles.input}
              placeholder="Username"
              onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
            />
            <input
              style={styles.input}
              placeholder="Email"
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
            />
            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
            />
            <button style={styles.button} type="submit">Sign Up</button>
          </form>
        )}

        {/* Toggle Text */}
        <p style={styles.toggleText} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Not registered? Sign up" : "Already have an account? Log in"}
        </p>
      </div>
    </div>
    </>
  );
}

// Styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    width: '350px',
    textAlign: 'center',
  },
  heading: {
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px',
    fontFamily: "'Roboto', sans-serif",
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '12px 0',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
    transition: 'border 0.3s',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor:'#198754',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  toggleText: {
    color: '#4CAF50',
    fontSize: '14px',
    marginTop: '10px',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default Signup;

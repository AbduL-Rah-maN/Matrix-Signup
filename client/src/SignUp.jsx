import { useState } from 'react';
import { useFormik } from 'formik'; 
import * as Yup from 'yup';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase/firebase.js"; 
import { useNavigate } from 'react-router-dom';


function SignUpPage() {
  
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Enter your username'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Enter your email'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Enter your password'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm your password')
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
  
        console.log("User created:", userCredential.user);
        navigate("/login");
        
      } catch (error) {
        console.error("Signup error:", error.message);
  
        if (error.code === "auth/email-already-in-use") {
          setErrors({ email: "This email is already in use." });
        } else {
          setErrors({ password: "Signup failed. Try again." });
        }
      } finally {
        setSubmitting(false);
      }
    }
  });
  

  return (
    <div className="matrix-signup-page">
      <div className="matrix-signup-content">
        <div className="matrix-header">
            <h1 className="matrix-title">ENTER THE MATRIX</h1>
            <p className="matrix-subtitle">Create your account</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="matrix-form">
            <div className="matrix-form-group">
            <label htmlFor="username">USERNAME</label>
            <input
                type="text"
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.username && formik.errors.username ? 'error' : ''}
                placeholder="Dev"
            />
            {formik.touched.username && formik.errors.username && (
                <span className="matrix-error">{formik.errors.username}</span>
            )}
            </div>

            <div className="matrix-form-group">
            <label htmlFor="email">EMAIL</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.email && formik.errors.email ? 'error' : ''}
                placeholder="@email.com"
            />
            {formik.touched.email && formik.errors.email && (
                <span className="matrix-error">{formik.errors.email}</span>
            )}
            </div>

            <div className="matrix-form-group">
            <label htmlFor="password">PASSWORD</label>
            <input
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.password && formik.errors.password ? 'error' : ''}
                placeholder="Create Password"
            />
            {formik.touched.password && formik.errors.password && (
                <span className="matrix-error">{formik.errors.password}</span>
            )}
            </div>

            <div className="matrix-form-group">
            <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'error' : ''}
                placeholder="Confirm Password"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <span className="matrix-error">{formik.errors.confirmPassword}</span>
            )}
            </div>

            <button type="submit" className="matrix-pill red-pill">
            <span className="inline-block w-5 h-5 rounded-full bg-red-700 border border-black"></span>
            SIGN UP
            </button>

            <div className="matrix-login-link">
            Already have an account? <a href="/Login">Take the blue pill</a>
            </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;

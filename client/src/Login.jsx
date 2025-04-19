import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase/firebase.js"; 



const LoginSchema = Yup.object().shape({
  emailId: Yup.string()
    .email('Invalid Email ID format')
    .required('Email ID required'),
  password: Yup.string()
    .min(8, 'Key must be 8+ characters')
    .required('Password required')
});

export default function MatrixLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="Login-page flex items-center justify-center bg-gray-900 px-4 py-8 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="Login-main-content w-full max-w-md sm:max-w-lg bg-gray-800/90 border-2 border-blue-500/50 rounded-xl shadow-lg shadow-blue-500/20 px-6 py-8 sm:px-10 sm:py-10">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2 tracking-wider">
            SYSTEM ACCESS
          </h1>
          <p className="text-blue-300/80 text-sm sm:text-base">Verify your identity</p>
        </div>

        <Formik
          initialValues={{ emailId: '', password: '', remember: false }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              const userCredential = await signInWithEmailAndPassword(
                auth,
                values.emailId,
                values.password
              );
              console.log("User logged in:", userCredential.user);
              navigate("/dashboard");
            } catch (error) {
              console.error("Login error:", error.message);
          
              if (error.code === "auth/user-not-found") {
                setErrors({ emailId: "Email not found" });
              } else if (error.code === "auth/wrong-password") {
                setErrors({ password: "Incorrect password" });
              } else {
                setErrors({ password: "Login failed. Try again." });
              }
            } finally {
              setSubmitting(false);
            }
          }}
          
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-6">
              
              
              <div>
                <label htmlFor="emailId" className="block text-sm font-medium text-blue-300 mb-1">
                  EMAIL ID
                </label>
                <Field
                  name="emailId"
                  type="email"
                  className={`w-full px-4 py-3 bg-gray-700/50 border ${
                    errors.emailId && touched.emailId 
                      ? 'border-red-500' 
                      : 'border-blue-500/30'
                  } rounded-lg text-white placeholder-blue-400/70 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent`}
                  placeholder="smith@email.in"
                />
                {errors.emailId && touched.emailId && (
                  <p className="mt-1 text-sm text-red-400">{errors.emailId}</p>
                )}
              </div>

              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-blue-300 mb-1">
                  PASSWORD
                </label>
                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className={`w-full px-4 py-3 bg-gray-700/50 border ${
                      errors.password && touched.password
                        ? 'border-red-500' 
                        : 'border-blue-500/30'
                    } rounded-lg text-blue-100 placeholder-blue-400/70 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all`}
                    placeholder="enter password"
                  />
                </div>
                {errors.password && touched.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center">
                  <Field 
                    type="checkbox" 
                    name="remember" 
                    id="remember"
                    className="h-4 w-4 border border-blue-500/50 rounded bg-gray-700/50 focus:ring-blue-500/50 text-blue-500"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-blue-300/80">
                    Remember my details
                  </label>
                </div>
                <Link to="/forgot" className="text-sm text-blue-400 hover:text-blue-300">
                  Key recovery
                </Link>
              </div>

              
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-md font-bold text-blue-50 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200"
              >
                <>
                  <div className="w-3 h-3 rounded-full bg-blue-300 border border-blue-500"></div>
                  Login
                </>
              </button>

              
              <div className="text-center text-sm text-blue-400/80">
                <Link to="/signup" className="font-medium text-blue-300 hover:text-blue-200">
                  [ NEW USER? ▸ ENTER HERE ]
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>

  );
}

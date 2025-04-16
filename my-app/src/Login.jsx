import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Replace with actual authentication logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Login data:', formData);
      navigate('/dashboard'); // Redirect on success
    } catch (err) {
      setError('Invalid credentials. The system rejects you.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="matrix-login-container">
      {/* Header */}
      <div className="matrix-header">
        <h1 className="text-green-400 text-4xl font-bold mb-2 tracking-widest">
          SYSTEM LOGIN
        </h1>
        <p className="text-gray-400">Enter your credentials to access the construct</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="matrix-error">
          {error}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="matrix-form">
        {/* Email Field */}
        <div className="matrix-input-group">
          <label htmlFor="email" className="matrix-label">
            USER ID
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="matrix-input"
            placeholder="neo@zion.net"
            required
          />
        </div>

        {/* Password Field */}
        <div className="matrix-input-group">
          <label htmlFor="password" className="matrix-label">
            ENCRYPTION KEY
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="matrix-input pr-10"
              placeholder="••••••••"
              minLength="8"
              required
            />
            <button
              type="button"
              className="matrix-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex justify-between items-center mb-6">
          <label className="matrix-checkbox">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="mr-2"
            />
            Remember this terminal
          </label>
          <Link to="/forgot-password" className="matrix-link">
            Encryption key lost?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="matrix-pill blue-pill flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="matrix-spinner"></span>
          ) : (
            <>
              <span className="w-5 h-5 rounded-full bg-blue-500 border-2 border-blue-700"></span>
              <span>ACCESS SYSTEM</span>
            </>
          )}
        </button>

        {/* Sign Up Link */}
        <div className="matrix-footer">
          Not jacked in?{' '}
          <Link to="/signup" className="matrix-link font-bold">
            Take the red pill
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage
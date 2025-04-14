import { useState, useEffect } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: '',
    fatherName: '',
    age: '',
    email: '',
    password: '',
    phoneNumber: '',
    gender: 'male'
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log('SignUp component mounted');
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.email.includes('@')) tempErrors.email = 'Invalid email';
    if (formData.password.length < 6) tempErrors.password = 'Password must be at least 6 characters';
    if (!formData.phoneNumber.match(/^\d{10}$/)) tempErrors.phoneNumber = 'Invalid phone number';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 201) {
        setSuccess(true);
        setFormData({
          userName: '',
          fatherName: '',
          age: '',
          email: '',
          password: '',
          phoneNumber: '',
          gender: 'male'
        });
      } else {
        throw new Error(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ server: error.message || 'Registration failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // The return statement (JSX) remains exactly the same
  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      {success && <div className="success">Registration successful!</div>}
      {errors.server && <div className="error">{errors.server}</div>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Father's Name:</label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>

        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
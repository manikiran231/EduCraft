import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Payment.css';

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`https://educraft-backend-ax1v.onrender.com/api/courses/${id}`);
        if (!res.ok) throw new Error('Course not found');
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        toast.error(err.message || 'Failed to fetch course.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For card number and cvv, remove all non-digit chars automatically
    if (name === 'cardNumber') {
      // Allow only digits, max length 16
      const digitsOnly = value.replace(/\D/g, '').slice(0, 16);
      setForm(prev => ({ ...prev, [name]: digitsOnly }));
    } else if (name === 'cvv') {
      // Allow only digits, max length 3
      const digitsOnly = value.replace(/\D/g, '').slice(0, 3);
      setForm(prev => ({ ...prev, [name]: digitsOnly }));
    } else {
      // For other fields, just update normally, trimming leading spaces
      setForm(prev => ({ ...prev, [name]: value.replace(/^\s+/, '') }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const name = form.name.trim();
  const cardNumber = form.cardNumber.trim();
  const expiry = form.expiry.trim();
  const cvv = form.cvv.trim();

  if (!name || !cardNumber || !expiry || !cvv) {
    toast.error('Please fill in all fields.');
    return;
  }

  const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!expiryPattern.test(expiry)) {
    toast.error('Invalid expiry date. Use MM/YY format.');
    return;
  }

  if (cvv.length !== 3) {
    toast.error('CVV must be 3 digits.');
    return;
  }

  if (cardNumber.length !== 16) {
    toast.error('Card number must be 16 digits.');
    return;
  }

  setSubmitted(true);
  toast.info('Processing your payment...');

  setTimeout(async () => {
    try {
      // Get auth token from localStorage (adjust if you store it elsewhere)
      const token = localStorage.getItem('token');
      if (!token) throw new Error('User not authenticated');

      const response = await fetch(`https://educraft-backend-ax1v.onrender.com/api/auth/enroll/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to enroll course');
      }

      toast.success('Payment successful and course enrolled!');
      setTimeout(() => navigate(`/course/${id}`), 2000);

    } catch (error) {
      toast.error(`Enrollment failed: ${error.message}`);
      setSubmitted(false);
    }
  }, 2000);
};


  if (loading) {
    return (
      <div className="payment-page loading" aria-live="polite" aria-busy="true">
        <div className="card placeholder-card" aria-hidden="true">
          <div className="card-img-top placeholder-glow loading-image"></div>
          <div className="card-body">
            <h5 className="card-title placeholder-glow">
              <span className="placeholder col-6"></span>
            </h5>
            <p className="card-text placeholder-glow">
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-8"></span>
            </p>
            <span className="btn btn-primary disabled placeholder col-6" aria-disabled="true"></span>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return <p>Course not found.</p>;
  }

  return (
  <div className="payment-page">
    <ToastContainer position="top-right" autoClose={3000} />
    <h2>Checkout - {course.course_title}</h2>

    <div className="payment-summary" aria-label="Course summary">
      <p><strong>Instructor:</strong> {course.instructor_name}</p>
      <p>
        <strong>Price:</strong> ₹{Math.floor(course.price * 0.8)}{' '}
        <span className="original-price" aria-label={`Original price ₹${course.price}`}>₹{course.price}</span>
      </p>
      <p><strong>Duration:</strong> {course.course_duration} mins</p>
    </div>

    {submitted ? (
      <p className="success-msg" role="alert" aria-live="assertive">Processing payment...</p>
    ) : (
      <>
        <div className="free-service-notice">
          <p style={{ backgroundColor: '#fff3cd', padding: '10px', borderRadius: '6px', border: '1px solid #ffeeba', color: '#856404' }}>
            ⚠️ <strong>Note:</strong> This platform is currently running as a <strong>free service</strong>. You can use any dummy credentials to proceed with the simulation.
          </p>
        </div>

        <form className="payment-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="name">
            Name on Card
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="cc-name"
              disabled={submitted}
              aria-required="true"
            />
          </label>

          <label htmlFor="cardNumber">
            Card Number
            <input
              id="cardNumber"
              type="tel"
              name="cardNumber"
              maxLength="16"
              value={form.cardNumber}
              onChange={handleChange}
              required
              placeholder="1234567812345678"
              autoComplete="cc-number"
              disabled={submitted}
              inputMode="numeric"
              aria-required="true"
              pattern="\d{16}"
              title="16 digit card number"
            />
          </label>

          <div className="card-details">
            <label htmlFor="expiry">
              Expiry Date
              <input
                id="expiry"
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={form.expiry}
                onChange={handleChange}
                required
                autoComplete="cc-exp"
                disabled={submitted}
                aria-required="true"
                pattern="(0[1-9]|1[0-2])\/\d{2}"
                title="Expiry date in MM/YY format"
              />
            </label>

            <label htmlFor="cvv">
              CVV
              <input
                id="cvv"
                type="tel"
                name="cvv"
                maxLength="3"
                placeholder="123"
                value={form.cvv}
                onChange={handleChange}
                required
                autoComplete="cc-csc"
                disabled={submitted}
                inputMode="numeric"
                aria-required="true"
                pattern="\d{3}"
                title="3 digit CVV"
              />
            </label>
          </div>

          <button type="submit" className="pay-btn" disabled={submitted} aria-disabled={submitted}>
            Pay ₹{Math.floor(course.price * 0.8)}
          </button>
        </form>
      </>
    )}
  </div>
);

};

export default Payment;

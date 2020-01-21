import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signin } from '../redux/auth/auth.actions';

const SignInPage = ({ signin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  const onChange = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      {' '}
      <div className="register-container">
        <div className="register">
          <h3 className="text-center heading-primary">Login</h3>
          <input
            onChange={e => onChange(e)}
            value={email}
            name="email"
            type="email"
            placeholder="Email"
            className="p-sm"
          />
          <input
            onChange={e => onChange(e)}
            type="password"
            placeholder="Password"
            name="password"
            className="p-sm"
            value={password}
          />
          <button
            onClick={() => signin(email, password)}
            className="text-center btn heading-secondary"
          >
            Login
          </button>
        </div>
        <div className="or heading-secondary">
          Or Register
          <Link className="or__link heading-secondary" to="/signup">
            {' Here'}
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  signin: (email, password) => dispatch(signin(email, password))
});

export default connect(null, mapDispatchToProps)(SignInPage);

import React, { useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../redux/auth/auth.actions';

const SignUpPage = ({ signup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const { email, password, passwordConfirm } = formData;

  const onChange = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      {' '}
      <div className="register-container">
        <div className="register">
          <h3 className="text-center heading-primary">Register</h3>
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
          <input
            onChange={e => onChange(e)}
            className="p-sm"
            type="password"
            name="passwordConfirm"
            placeholder="Password Confirm"
            value={passwordConfirm}
          />
          <button
            onClick={() => signup(email, password, passwordConfirm)}
            className="text-center btn heading-secondary"
          >
            Register
          </button>
        </div>
        <div className="or heading-secondary">
          Or Login
          <Link className="or__link heading-secondary" to="/signin">
            {' Here'}
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  signup: (email, password, passwordConfirm) =>
    dispatch(signup(email, password, passwordConfirm))
});

export default connect(null, mapDispatchToProps)(SignUpPage);

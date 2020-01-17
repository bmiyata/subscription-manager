import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Manager from './../components/manager.component';
import Totals from './../components/totals.component';
import { connect } from 'react-redux';
import { logout } from '../redux/auth/auth.actions';

const HomePage = ({ logout }) => {
  return (
    <Fragment>
      <div className="app-container">
        <div className="logout">
          <Link
            onClick={() => logout()}
            className="logout__btn btn"
            to="/signin"
          >
            Logout
          </Link>
        </div>

        <Manager />
        <Totals />
      </div>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(HomePage);

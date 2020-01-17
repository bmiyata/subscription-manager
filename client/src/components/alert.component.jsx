import React from 'react';
import { connect } from 'react-redux';

const Alert = ({ alert }) =>
  alert !== null &&
  alert.length > 0 &&
  alert.map(el => (
    <div key={alert.id} className={`alert alert--${el.alertType}`}>
      {el.msg}
    </div>
  ));

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps)(Alert);

import React, { Fragment, useState } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  deleteSubscription,
  paid
} from '../redux/subscriptions/subscriptions.actions';
import ManagerInputs from './manager-new-item-inputs';
const ManagerItem = ({ subscription, deleteSubscription, paid }) => {
  const [editMode, setEditMode] = useState({
    editing: false
  });

  const { editing } = editMode;

  const onClickEdit = () => {
    setEditMode({ editing: true });
  };

  const onClickHideEdit = () => {
    setEditMode({ editing: false });
  };

  return editing ? (
    <ManagerInputs
      subscription={subscription}
      onClickHideEdit={onClickHideEdit}
    />
  ) : (
    <Fragment>
      <div className="manager__divider"></div>
      <div className="heading-item">{subscription.nameOfService}</div>
      <div className="heading-item">${subscription.amount}</div>
      <div className="heading-item">
        {subscription.monthly[0].toUpperCase() + subscription.monthly.slice(1)}
      </div>
      <div className="heading-item">
        <Moment format="MM/DD/YYYY">{moment.utc(subscription.dueDate)}</Moment>
      </div>
      <div className="p-lg">
        <button onClick={() => paid(subscription)} className="btn">
          Paid
        </button>
      </div>
      <div className="manager__edit-delete">
        <button
          onClick={onClickEdit}
          className="btn btn--p-sm btn--yellow-green"
        >
          Edit
        </button>
        <button
          onClick={() => deleteSubscription(subscription._id)}
          className="btn btn--p-sm btn--red"
        >
          Delete
        </button>
      </div>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteSubscription: id => dispatch(deleteSubscription(id)),
  paid: subscription => dispatch(paid(subscription))
});

export default connect(null, mapDispatchToProps)(ManagerItem);

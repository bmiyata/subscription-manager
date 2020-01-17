import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import {
  addSubscription,
  updateSubscription
} from '../redux/subscriptions/subscriptions.actions';

const ManagerInputs = ({
  subscription,
  addSubscription,
  updateSubscription,
  onClickHide,
  onClickHideEdit
}) => {
  {
    /* This checks if a subscription was passed down. This is the case when edit button is clicked */
  }

  const initialFormData = subscription
    ? subscription
    : { nameOfService: '', amount: 0, monthly: 'Monthly', dueDate: '' };

  const [formData, setFormData] = useState(initialFormData);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { nameOfService, amount, monthly, dueDate } = formData;

  return (
    <Fragment>
      <div className="manager__divider"></div>
      <input
        className="p-sm input__width"
        type="text"
        placeholder="Enter Service Name"
        name="nameOfService"
        value={nameOfService}
        onChange={e => onChange(e)}
        required
      />

      <input
        className="p-sm input__width"
        placeholder="Enter Amount"
        name="amount"
        step=".01"
        type="number"
        value={amount}
        onChange={e => onChange(e)}
        required
      />
      <select
        className="p-sm input__width"
        type="text"
        placeholder="Enter Monthly/Yearly"
        name="monthly"
        value={monthly}
        onChange={e => onChange(e)}
        required
      >
        <option value="monthly" name="monthly">
          Monthly
        </option>
        <option value="yearly" name="monthly">
          Yearly
        </option>
      </select>
      <input
        className="p-sm input__width"
        type="date"
        placeholder="Enter Due Date"
        name="dueDate"
        onChange={e => onChange(e)}
        value={dueDate}
        required
      />
      <div className="p-lg manager__submit-cancel">
        <button
          onClick={
            subscription
              ? () => {
                  onClickHideEdit();
                  updateSubscription(subscription._id, formData);
                }
              : () => addSubscription(formData)
          }
          className="btn btn--p-sm btn--submit"
          type="submit"
          value="submit"
        >
          Submit
        </button>
        <button
          onClick={onClickHide ? onClickHide : onClickHideEdit}
          className="btn btn--p-sm btn--red"
        >
          Cancel
        </button>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  subscriptions: state.subscriptions
});

const mapDispatchToProps = dispatch => ({
  addSubscription: formData => dispatch(addSubscription(formData)),
  updateSubscription: (id, formData) =>
    dispatch(updateSubscription(id, formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerInputs);

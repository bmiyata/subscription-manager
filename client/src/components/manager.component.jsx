import React, { useState } from 'react';
import ManagerTitles from './manager-titles.component';
import ManagerInputs from './manager-new-item-inputs';
import ManagerItem from './manager-item';
import { connect } from 'react-redux';

const Manager = ({ subscriptions: { subscriptions } }) => {
  const makeDate = date => {
    const year = parseInt(date.slice(0, 4));
    const month = parseInt(date.slice(5, 7));
    const day = parseInt(date.slice(8, 10));

    return new Date(year, month, day);
  };

  const sortedSubscriptions = subscriptions.sort((a, b) => {
    a = makeDate(a.dueDate);
    b = makeDate(b.dueDate);

    return a.getTime() - b.getTime();
  });
  const subscriptionList = sortedSubscriptions.map(subscription => (
    <ManagerItem subscription={subscription} key={subscription._id} />
  ));

  const [showManagerInputs, setManagerInputs] = useState({
    hidden: true
  });

  const onClickShow = () => {
    setManagerInputs({ hidden: false });
  };

  const onClickHide = () => {
    setManagerInputs({ hidden: true });
  };
  const { hidden } = showManagerInputs;

  return (
    <section className="manager">
      <div className="header heading-primary">Subscription Manager</div>
      <div className="manager__content">
        <ManagerTitles />

        <div className="p-lg manager__btn">
          <button onClick={onClickShow} className="btn">
            Add Subscription
          </button>
        </div>

        {/* <!-- Add New Item --> */}

        {hidden ? null : <ManagerInputs onClickHide={onClickHide} />}
        {subscriptionList}
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  subscriptions: state.subscriptions
});

export default connect(mapStateToProps)(Manager);

import React from 'react';
import { connect } from 'react-redux';

const Totals = ({ subscriptions }) => {
  let totalMonthly = 0;
  let totalSubscriptions = 0;
  let totalYearly = 0;
  for (let subscription of subscriptions) {
    if (
      subscription.monthly === 'Monthly' ||
      subscription.monthly === 'monthly'
    ) {
      totalMonthly += subscription.amount;
    } else {
      totalMonthly += subscription.amount / 12;
    }
    totalSubscriptions++;
  }

  totalMonthly = totalMonthly.toFixed(2);
  totalYearly = (totalMonthly * 12).toFixed(2);

  return (
    <section className="totals">
      <div className="header heading-primary">Totals</div>
      <div className="totals__content">
        <div className="p-lg heading-item totals__desc">
          <p>Subscription Count</p>
          <p className="text-center text--red">{totalSubscriptions}</p>
        </div>

        <div className="p-lg heading-item">
          <p>Payments Monthly</p>
          <p className="text-center text--red">${totalMonthly}</p>
        </div>
        <div className="p-lg heading-item">
          <p>Payments Yearly</p>
          <p className="text-center text--red">${totalYearly}</p>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  subscriptions: state.subscriptions.subscriptions
});

export default connect(mapStateToProps)(Totals);

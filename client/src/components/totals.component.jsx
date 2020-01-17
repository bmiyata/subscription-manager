import React from 'react';

const Totals = () => {
  return (
    <section className="totals">
      <div className="header heading-primary">Totals</div>
      <div className="totals__content">
        <div className="p-lg heading-item totals__desc">
          <p>Subscription Count</p>
          <p className="text-center text--red">5</p>
        </div>

        <div className="p-lg heading-item">
          <p>Payments Monthly</p>
          <p className="text-center text--red">$100.00</p>
        </div>
        <div className="p-lg heading-item">
          <p>Payments Yearly</p>
          <p className="text-center text--red">$1,200.00</p>
        </div>
      </div>
    </section>
  );
};

export default Totals;

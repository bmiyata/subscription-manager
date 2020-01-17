import React, { Fragment } from 'react';

const ManagerTitles = () => {
  return (
    <Fragment>
      <div className="bg-grey text-center p-sm heading-title">
        Name of Service
      </div>
      <div className="bg-grey text-center p-sm heading-title">
        <p>Amount</p>
      </div>
      <div className="bg-grey text-center p-sm heading-title">
        Monthly / Yearly
      </div>
      <div className="bg-grey text-center p-sm heading-title">
        Payment Due Date
      </div>
      <div className="bg-grey text-center p-sm heading-title">Paid?</div>
      <div className="bg-grey text-center p-sm heading-title">Edit/Delete</div>
    </Fragment>
  );
};

export default ManagerTitles;

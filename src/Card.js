import React from "react";

function Card({report}) {
  return (
    <div className="col-xl-3 col-md-6 mb-4">
      <div className="card border-left-info shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters text-center">
            <div className="col mr-2">
              <div className="text-lg font-weight-bold text-primary text-uppercase mb-1">
                {report.period}
              </div>
            </div>
          </div>
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-sm text-success text-uppercase mb-1">
                Income
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                Rs.{report.income}
              </div>
            </div>
            <div className="col mr-2">
              <div className="text-sm text-danger text-uppercase mb-1">
                Expenditure
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
              Rs.{report.expenditure}
              </div>
            </div>
            <div className="col-auto">
              <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

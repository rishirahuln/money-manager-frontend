import React, { useEffect, useState } from "react";
import { listIncome } from "./api/income";
import IncomeEdit from "./IncomeEdit";

function IncomeHist() {
  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    getIncome();
  }, []);

  async function getIncome() {
    try {
      let incomeDetails = await listIncome();
      let incomes = incomeDetails.data;
      incomes.map((income) => {
        return (income.createdAt = income.createdAt
          .split("T")
          .join(" ")
          .split(".")
          .slice(0, -1));
      });
      setIncomeData(incomes);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Income History</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Income History</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Date & Time</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </tfoot>
              <tbody>
                {incomeData.map((income, index) => {
                  return (
                    <tr key={index}>
                      <td>{income.createdAt}</td>
                      <td>{income.category}</td>
                      <td>{income.incomeAmt}</td>
                      <td>
                        <IncomeEdit
                          income_id={income._id}
                          incomeData={incomeData}
                          setIncomeData={setIncomeData}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomeHist;

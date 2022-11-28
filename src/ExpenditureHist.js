import React, { useEffect, useState } from "react";
import { listExpense } from "./api/expense";
import ExpenseEdit from "./ExpenseEdit";

function ExpenditureHist() {
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    getExpense();
  }, []);

  async function getExpense() {
    try {
      let expenseDetails = await listExpense();
      let expenses = expenseDetails.data;
      expenses.map((expense) => {
        return (expense.createdAt = expense.createdAt
          .split("T")
          .join(" ")
          .split(".")
          .slice(0, -1));
      });
      setExpenseData(expenses);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Expenditure History</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Expenditure History
          </h6>
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
                  <th>Description</th>
                  <th>Category</th>
                  <th>Division</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Date & Time</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Division</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </tfoot>
              <tbody>
                {expenseData.map((expense, index) => {
                  return (
                    <tr key={index}>
                      <td>{expense.createdAt}</td>
                      <td>{expense.description}</td>
                      <td>{expense.category}</td>
                      <td>{expense.division}</td>
                      <td>{expense.expenseAmt}</td>
                      <td>
                        <ExpenseEdit
                          expense_id={expense._id}
                          expenseData={expenseData}
                          setExpenseData={setExpenseData}
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

export default ExpenditureHist;

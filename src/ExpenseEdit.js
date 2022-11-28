import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import React, { useState } from "react";
import { useFormik } from "formik";
import { getExpense, updateExpense } from "./api/expense";

function ExpenseEdit({ expense_id, expenseData, setExpenseData }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [expenseId, setExpenseId] = useState(null);

  const expense = useFormik({
    initialValues: {
      description: "",
      category: "",
      division: "",
      expenseAmt: "",
    },
    validate: (values) => {
      let errors = {};

      if (!values.description) {
        errors.description = "Required";
      }
      if (!values.category) {
        errors.category = "Required";
      }
      if (!values.division) {
        errors.division = "Required";
      }
      if (!values.expenseAmt) {
        errors.expenseAmt = "Required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        await updateExpense(expenseId, values);
        const expenseIndex = expenseData.findIndex(
          (exp) => exp._id == expenseId
        );
        expenseData[expenseIndex] = values;
        setExpenseData([...expenseData]);
        handleClose();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const editExpense = async (expense_id) => {
    try {
      handleShow();
      const expenseData = await getExpense(expense_id);
      expense.setValues(expenseData.data);
      setExpenseId(expense_id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        onClick={() => editExpense(expense_id)}
        className="btn btn-primary btn-sm"
      >
        Edit
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <Tabs
                  defaultActiveKey="profile"
                  id="justify-tab-example"
                  className="mb-3"
                  justify
                >
                  <Tab eventKey="profile" title="Edit Expense">
                    <div className="container">
                      <form onSubmit={expense.handleSubmit}>
                        <div className="row">
                          <div className="col-lg-12">
                            <label>Description:</label>
                            <input
                              type={"text"}
                              className="form-control mb-2"
                              name="description"
                              value={expense.values.description}
                              onChange={expense.handleChange}
                            />
                          </div>
                          <div className="col-lg-12">
                            <label>Category:</label>
                            <select
                              className="form-control mb-2"
                              name="category"
                              value={expense.values.category}
                              onChange={expense.handleChange}
                            >
                              <option value={""}>--Select a Category--</option>
                              <option value={"Fuel"}>Fuel</option>
                              <option value={"Movie"}>Movie</option>
                              <option value={"Food"}>Food</option>
                              <option value={"Loan"}>Loan</option>
                              <option value={"Medical"}>Medical</option>
                              <option value={"Others"}>Others</option>
                            </select>
                          </div>
                          <div className="col-lg-12">
                            <label>Division:</label>
                            <select
                              className="form-control mb-2"
                              name="division"
                              value={expense.values.division}
                              onChange={expense.handleChange}
                            >
                              <option value={""}>--Select a Division--</option>
                              <option value={"Personal"}>Personal</option>
                              <option value={"Office"}>Office</option>
                            </select>
                          </div>
                          <div className="col-lg-12 mb-2">
                            <label>Amount:</label>
                            <input
                              type={"number"}
                              className="form-control"
                              placeholder="Enter Expense amount here"
                              name="expenseAmt"
                              value={expense.values.expenseAmt}
                              onChange={expense.handleChange}
                            />
                          </div>
                        </div>
                        <div className="float-right mt-2">
                          <button
                            type="button"
                            onClick={handleClose}
                            className="btn btn-secondary mr-2"
                          >
                            Cancel
                          </button>
                          <input
                            type={"submit"}
                            className="btn btn-primary"
                            value={"Update"}
                          />
                        </div>
                      </form>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ExpenseEdit;

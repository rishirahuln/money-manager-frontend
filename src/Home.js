import { useFormik } from "formik";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { addIncome } from "./api/income";
import { addExpense } from "./api/expense";

function Home() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const income = useFormik({
    initialValues: {
      category: "",
      incomeAmt: "",
    },
    validate: (values) => {
      let errors = {};

      if (!values.category) {
        errors.category = "Required";
      }
      if (!values.incomeAmt) {
        errors.incomeAmt = "Required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        let incomeRes = await addIncome(values);
        income.resetForm();
        alert(incomeRes.data.message);
      } catch (error) {
        console.log(error);
      }
    },
  });

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
        let expenseRes = await addExpense(values);
        expense.resetForm();
        alert(expenseRes.data.message);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        Add transaction
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction</Modal.Title>
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
                  <Tab eventKey="home" title="Income">
                    <div className="container">
                      <form onSubmit={income.handleSubmit}>
                        <div className="row">
                          <div className="col-lg-12">
                            <label>Category:</label>
                            <select
                              className="form-control mb-2"
                              name="category"
                              value={income.values.category}
                              onChange={income.handleChange}
                            >
                              <option value={""}>--Select a Category--</option>
                              <option value={"Salary"}>Salary</option>
                              <option value={"Rent"}>Rent</option>
                              <option value={"Interest"}>Interest</option>
                            </select>
                          </div>
                          <div className="col-lg-12">
                            <label>Amount (in Rupees):</label>
                            <input
                              type={"number"}
                              className="form-control"
                              placeholder="Enter Income amount here"
                              name="incomeAmt"
                              value={income.values.incomeAmt}
                              onChange={income.handleChange}
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
                            value={"Submit"}
                          />
                        </div>
                      </form>
                    </div>
                  </Tab>
                  <Tab eventKey="profile" title="Expense">
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
                            <label>Amount (in Rupees):</label>
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
                            value={"Submit"}
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

export default Home;

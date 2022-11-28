import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import React, { useState } from "react";
import { useFormik } from "formik";
import { getIncome, updateIncome } from "./api/income";

function IncomeEdit({ income_id, incomeData, setIncomeData }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [incomeId, setIncomeId] = useState(null);

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
        await updateIncome(incomeId, values);
        const incomeIndex = incomeData.findIndex((inc) => inc._id == incomeId);
        incomeData[incomeIndex] = values;
        setIncomeData([...incomeData]);
        handleClose();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const editIncome = async (income_id) => {
    try {
      handleShow();
      const incomeData = await getIncome(income_id);
      income.setValues(incomeData.data);
      setIncomeId(income_id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        onClick={() => editIncome(income_id)}
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
          <Modal.Title>Edit Income</Modal.Title>
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
                  <Tab eventKey="profile" title="Edit Income">
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
                            <label>Amount:</label>
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

export default IncomeEdit;

import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "./config";
import { registerUser } from "./api/user";

function Register() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      let errors = {};

      if (!values.firstName) {
        errors.firstName = "Required";
      }
      if (!values.lastName) {
        errors.lastName = "Required";
      }
      if (!values.email) {
        errors.email = "Required";
      }
      if (!values.password) {
        errors.password = "Required";
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = "Required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        let registerReq = await registerUser(values);
        if (registerReq.data.token) {
          localStorage.setItem(`${config.storage_key}`, registerReq.data.token);
          navigate("/portal/dashboard");
        } else {
          alert(registerReq.data.message);
          formik.resetForm();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-6 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-12">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">
                        Create your account
                      </h1>
                    </div>
                    <form className="user" onSubmit={formik.handleSubmit}>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            placeholder="First Name"
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.firstName ? (
                            <span>{formik.errors.firstName}</span>
                          ) : null}
                        </div>
                        <div className="col-sm-6">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            placeholder="Last Name"
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.lastName ? (
                            <span>{formik.errors.lastName}</span>
                          ) : null}
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          placeholder="Email Address"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.email ? (
                          <span>{formik.errors.email}</span>
                        ) : null}
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            placeholder="Password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.password ? (
                            <span>{formik.errors.password}</span>
                          ) : null}
                        </div>
                        <div className="col-sm-6">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.confirmPassword ? (
                            <span>{formik.errors.confirmPassword}</span>
                          ) : null}
                        </div>
                      </div>
                      <input
                        type="Submit"
                        className="btn btn-primary btn-user btn-block"
                        defaultValue="Register Account"
                      />
                    </form>
                    <hr />
                    <div className="text-center">
                      Have an account? <Link to={"/login"}>Log in</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { loginUser } from "./api/user";
import { config } from "./config";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};

      if (!values.email) {
        errors.email = "Required";
      }

      if (!values.password) {
        errors.password = "Required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        let loginReq = await loginUser(values);
        if (loginReq.data.token) {
          localStorage.setItem(`${config.storage_key}`, loginReq.data.token);
          navigate("/portal/dashboard");
        } else {
          alert(loginReq.data.message);
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
                        Log in to your account
                      </h1>
                    </div>
                    <form className="user" onSubmit={formik.handleSubmit}>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          placeholder="Email Address"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.email && <span>Required</span>}
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          placeholder="Password"
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                        />
                      </div>
                      <input
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                        defaultValue="Login"
                      />
                    </form>
                    <hr />
                    <div className="text-center">
                      Don't have an account? <Link to={"/"}>Sign Up</Link>
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

export default Login;

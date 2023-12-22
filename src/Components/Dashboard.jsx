import React from "react";
import Logo from "./Icons/Logo";
import { logout } from "./User/Auth/authService";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import Loading from "./User/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setGeneratePage } from "../features/UserReducer";

const Dashboard = () => {
  const navigate = useNavigate();
  const { loading,generatePage } = useSelector(state => state.users);
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      url: "",
    },
    validationSchema: Yup.object().shape({
      url: Yup.string().required("The url is required"),
    }),
    onSubmit: async (value) => {
      try {
        dispatch(setGeneratePage(true))
        formik.resetForm()
      } catch (error) { }
    },
  });
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const handleBack=()=>{
    dispatch(setGeneratePage(false))
  }
  return (
    <article className="container">
      <hgroup className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <section className="card o-hidden border-0 shadow-lg my-5">
            <main className="card-body p-0">
              <section className="row justify-content-center">
                <section className="col-lg-12 d-flex  p-5">
                  <div className="flex-grow-1">
                    <hgroup className="d-flex justify-content-center user-heading">
                      <Logo width={60} height={60} className="me-3 fill-orange" />
                      <h1 className="text-center  h1">Jet.ly</h1>
                    </hgroup>

                    <header className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">
                        Welcome Come Back!
                      </h1>
                    </header>
                  </div>
                  <div className="">
                    <button
                      className="btn btn-primary btn-user btn-block "
                      type="submit"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </section>
                {
                  generatePage ? (
                    <div className="col-lg-7 pb-5 px-5">
                  <div>
                    <span>Short Url</span> <br />
                    <a href=""></a>
                  </div>
                  <div>
                    <span>Original Url</span> <br />
                    <a href=""></a>
                  </div>
                  <div className="text-center">
                    <button className="btn btn-primary" onClick={handleBack}>Back to generatePage</button>
                  </div>

                </div>
                  ) : (
                    <form onSubmit={formik.handleSubmit} className="col-lg-7  pb-5 px-5">
                  <fieldset className="form-group">
                    <label htmlFor="url" className="h5">
                      Enter your long url :
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-user ${formik.touched.url &&
                        formik.errors.url ? "is-invalid" : ''}`}
                      value={formik.values.url}
                      name="url"
                      id="url"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {
                        formik.touched.url && formik.errors.url && (
                          <span className="d-block ms-3 text-danger small invalid-feedback">
                        {formik.errors.url}
                      </span>
                        )
                      }
                  </fieldset>
                  <div className="form-group text-center">
                  <button
                    type="submit"
                    className="btn btn-primary col-lg-5"
                    
                  >
                    {
                      loading ? <Loading /> : "Generate"
                    }
                  </button>
                  </div>

                </form>
                  )
                }
                

                

              </section>
            </main>
          </section>
        </div>
      </hgroup>
    </article>
  );
};

export default Dashboard;

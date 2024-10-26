import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../app/slices/auth/authSlice.js";
import { useLoginMutation } from "../../app/services/authApi.js";
import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  username: Yup.string().min(3, "Too Short!").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      dispatch(setCredentials(response.data));
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.log("general", "Неверные имя пользователя или пароль");
    }
  };
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src="login.jpg" className="rounded-circle" alt="Войти" />
              </div>
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form className="col-12 col-md-6 mt-3 mt-md-0">
                    <h1 className="text-center mb-4">Войти</h1>
                    <div className="form-floating mb-3">
                      <Field
                        name="username"
                        autoComplete="username"
                        required
                        placeholder="Ваш ник"
                        id="username"
                        className="form-control"
                      />
                      <label htmlFor="username">Ваш ник</label>
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="form-floating mb-4">
                      <Field
                        name="password"
                        autoComplete="current-password"
                        required
                        placeholder="Пароль"
                        type="password"
                        id="password"
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="password">
                        Пароль
                      </label>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-100 mb-3 btn btn-outline-primary"
                    >
                      Войти
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                {/* <a href="/signup">Регистрация</a> */}
                <Link to="/signup">Регистрация</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <div>
  //       <div>
  //         <img src="login.jpg" alt="Войти" />
  //       </div>
  //       <form onSubmit={handleSubmit}>
  //         <h1>{t("login")}</h1>
  //         <div>
  //           <input
  //             name="username"
  //             autoComplete="username"
  //             required=""
  //             placeholder={t("username")}
  //             id="username"
  //             onChange={(e) => setUsername(e.target.value)}
  //             value={username}
  //           />
  //           <label htmlFor="username">{t("username")}</label>
  //         </div>
  //         <div>
  //           <input
  //             name="password"
  //             autoComplete="current-password"
  //             required=""
  //             placeholder={t("password")}
  //             type="password"
  //             id="password"
  //             onChange={(e) => setPassword(e.target.value)}
  //             value={password}
  //           />
  //           <label htmlFor="password">{t("password")}</label>
  //         </div>
  //         <button type="submit">{t("login")}</button>
  //       </form>
  //     </div>
  //     <div>
  //       <div>
  //         <span>{t("noAccount")}</span>{" "}
  //         <button onClick={() => navigate("/signup")}>
  //           {t("registration")}
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Login;

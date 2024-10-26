import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../app/slices/auth/authSlice.js";
import { useSignupMutation } from "../../app/services/authApi.js";

// import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  username: Yup.string().min(3, "Too Short!").required("Обязательное поле"),
  password: Yup.string().required("Обязательное поле"),
});

const Signup = () => {
  // const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signup] = useSignupMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup({ username, password });
      dispatch(setCredentials(response.data));
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.log("Ошибка регистрации");
    }
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src="signup.jpg"
                  className="rounded-circle"
                  alt="Регистрация"
                />
              </div>
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form className="w-50">
                    <h1 className="text-center mb-4">Регистрация</h1>
                    <div className="form-floating mb-3">
                      <Field
                        name="username"
                        autocomplete="username"
                        placeholder="От 3 до 20 символов"
                        className="form-control"
                        id="username"
                        required
                      />
                      <label className="form-label" htmlFor="username">
                        Имя пользователя
                      </label>
                      <div className="invalid-tooltip" placement="right">
                        <ErrorMessage name="username" />
                      </div>
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        name="password"
                        placeholder="Не менее 6 символов"
                        type="password"
                        className="form-control"
                        id="password"
                        aria-describedby="passwordHelpBlock"
                        required
                        autocomplete="new-password"
                        aria-autocomplete="list"
                      />
                      <div className="invalid-tooltip">
                        <ErrorMessage name="password" />
                      </div>
                      <label className="form-label" htmlFor="password">
                        Пароль
                      </label>
                    </div>
                    <div className="form-floating mb-4">
                      <Field
                        name="confirmPassword"
                        placeholder="Пароли должны совпадать"
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        required
                        autocomplete="new-password"
                      />
                      <div className="invalid-tooltip">
                        <ErrorMessage name="confirmPassword" />
                      </div>
                      <label className="form-label" htmlFor="confirmPassword">
                        Подтвердите пароль
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="w-100 btn btn-outline-primary"
                    >
                      Зарегистрироваться
                    </button>
                  </Form>
                )}
              </Formik>
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
  //         <img src="signup.jpg" alt={t("registration")} />
  //       </div>
  //       <form onSubmit={handleSubmit}>
  //         <h1>{t("registration")}</h1>
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
  //             autoComplete="new-password"
  //             required=""
  //             placeholder={t("password")}
  //             type="password"
  //             id="password"
  //             onChange={(e) => setPassword(e.target.value)}
  //             value={password}
  //           />
  //           <label htmlFor="password">{t("password")}</label>
  //         </div>
  //         <div>
  //           <input
  //             name="confirmPassword"
  //             autoComplete="new-password"
  //             required=""
  //             placeholder={t("confirmPassword")}
  //             type="password"
  //             id="confirmPassword"
  //             onChange={(e) => setConfirmPassword(e.target.value)}
  //             value={confirmPassword}
  //           />
  //           <label htmlFor="confirmPassword">{t("confirmPassword")}</label>
  //         </div>
  //         <button type="submit">{t("register")}</button>
  //       </form>
  //     </div>
  //   </div>
  // );
};

export default Signup;

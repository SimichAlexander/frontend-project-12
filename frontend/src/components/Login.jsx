import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../app/services/authApi.js";

const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const handleSubmit = async (values, { setErrors }) => {
    const { username, password } = values;
    try {
      const response = await login({ username, password });
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      setErrors({
        username: "",
        password: "Неверные имя пользователя или пароль",
      });
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
                onSubmit={handleSubmit}
              >
                {({ errors }) => (
                  <Form className="col-12 col-md-6 mt-3 mt-md-0">
                    <h1 className="text-center mb-4">Войти</h1>
                    <div className="form-floating mb-3">
                      <Field
                        name="username"
                        autoComplete="username"
                        required
                        placeholder="Ваш ник"
                        id="username"
                        className={`form-control ${
                          errors.password && "is-invalid"
                        }`}
                      />
                      <label className="form-label" htmlFor="username">
                        Ваш ник
                      </label>
                    </div>

                    <div className="form-floating mb-4">
                      <Field
                        name="password"
                        autoComplete="current-password"
                        required
                        placeholder="Пароль"
                        type="password"
                        id="password"
                        className={`form-control ${
                          errors.password && "is-invalid"
                        }`}
                      />
                      <label className="form-label" htmlFor="password">
                        Пароль
                      </label>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="invalid-tooltip"
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
                <Link to="/signup">Регистрация</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

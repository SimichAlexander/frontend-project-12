import { Formik, Form, Field, ErrorMessage } from "formik";
// import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../app/slices/auth/authSlice.js";
import { useLoginMutation } from "../../app/services/authApi.js";
import { useEffect } from "react";

const SignInSchema = Yup.object().shape({
  username: Yup.string().min(3, "Too Short!").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  // useEffect(() => {
  //   axios
  //     .post("/api/v1/signup", { username: "qqqqq", password: "qqqqq" })
  //     .then((response) => {
  //       console.log(response.data); // => { token: ..., username: 'newuser' }
  //     });
  // }, []);

  return (
    <Formik
      initialValues={{ username: "", password: "", general: "" }}
      validationSchema={SignInSchema}
      onSubmit={async (values, { setFieldError, setSubmitting }) => {
        try {
          const res = await login(values);
          dispatch(setCredentials(res.data));
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("token", res.data.token);
          navigate("/");
        } catch (error) {
          setFieldError("general", "Неверные имя пользователя или пароль");
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="username">username</label>
            <Field name="username" placeholder="Ваш ник" />
            <ErrorMessage component="div" name="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">password</label>
            <Field type="password" name="password" placeholder="Пароль" />
            <ErrorMessage component="div" name="password" />
          </div>
          <ErrorMessage
            name="general"
            component="div"
            style={{ color: "red" }}
          />
          <button type="submit" disabled={isSubmitting}>
            Войти
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;

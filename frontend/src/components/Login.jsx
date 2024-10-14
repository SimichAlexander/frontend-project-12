import { Formik, Form, Field, ErrorMessage } from "formik";
// import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice.js";
import { useLoginMutation } from "../app/services/authApi.js";

const SignInSchema = Yup.object().shape({
  username: Yup.string().min(3, "Too Short!").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const navigate = useNavigate();
  const goChat = () => navigate("/");

  const loginUser = async (data) => {
    // const res = await axios.post("/api/v1/login", data);
    const res = await login(data);
    dispatch(setCredentials(res));

    localStorage.setItem("token", res.data.token);
    goChat();
  };

  return (
    <Formik
      initialValues={{ username: "", password: "", general: "" }}
      validationSchema={SignInSchema}
      onSubmit={async (values, { setFieldError, setSubmitting }) => {
        try {
          await loginUser(values);
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

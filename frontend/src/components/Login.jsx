import { useFormik } from "formik";
import axios from "axios";

const Login = () => {
  const loginUser = async (data) => {
    const res = await axios.post("/api/v1/login", data);
    console.log(res);
    console.log(res.data);
    return res;
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: loginUser,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="username">username</label>
      <input
        id="username"
        name="username"
        type="username"
        onChange={formik.handleChange}
        value={formik.values.username}
      />

      <label htmlFor="password">password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;

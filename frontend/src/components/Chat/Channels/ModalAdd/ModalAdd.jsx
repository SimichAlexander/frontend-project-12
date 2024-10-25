import { Formik, Form, Field, ErrorMessage } from "formik";

const ModalAdd = () => {
  return (
    <Formik
      initialValues={{ username: "", password: "", general: "" }}
      onSubmit={console.log("SUBMIT FORM WW")}
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

export default ModalAdd;

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLoginMutation } from '../app/services/authApi.js';

const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const { t } = useTranslation();

  const handleSubmit = async (values, { setErrors }) => {
    const { username, password } = values;
    try {
      const response = await login({ username, password });
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      setErrors({
        username: '',
        password: t('invalid_credentials'),
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
                <img src="login.jpg" className="rounded-circle" alt={t('login')} />
              </div>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                }}
                onSubmit={handleSubmit}
              >
                {({ errors }) => (
                  <Form className="col-12 col-md-6 mt-3 mt-md-0">
                    <h1 className="text-center mb-4">{t('login')}</h1>
                    <div className="form-floating mb-3">
                      <Field
                        name="username"
                        autoComplete="username"
                        required
                        placeholder={t('your_nickname')}
                        id="username"
                        className={`form-control ${errors.password && 'is-invalid'}`}
                      />
                      <label className="form-label" htmlFor="username">
                        {t('your_nickname')}
                      </label>
                    </div>

                    <div className="form-floating mb-4">
                      <Field
                        name="password"
                        autoComplete="current-password"
                        required
                        placeholder={t('password')}
                        type="password"
                        id="password"
                        className={`form-control ${errors.password && 'is-invalid'}`}
                      />
                      <label className="form-label" htmlFor="password">
                        {t('password')}
                      </label>
                      <ErrorMessage name="password" component="div" className="invalid-tooltip" />
                    </div>

                    <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
                      {t('login')}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('no_account')}</span>
                <Link to="/signup">{t('registration')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSignupMutation } from '../app/services/authApi.js';

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [signup] = useSignupMutation();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('character_limit'))
      .max(20, t('character_limit'))
      .required(t('required_field')),
    password: Yup.string().min(6, t('min_length_6')).required(t('required_field')),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], t('passwords_must_match')),
  });

  const handleSubmit = async (values, { setErrors }) => {
    const { username, password } = values;
    try {
      const response = await signup({ username, password });
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      setErrors({
        username: true,
        password: true,
        confirmPassword: t('user_exists'),
      });
    }
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src="signup.jpg" className="rounded-circle" alt={t('registration')} />
              </div>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form className="w-50">
                    <h1 className="text-center mb-4">{t('registration')}</h1>
                    <div className="form-floating mb-3">
                      <Field
                        name="username"
                        autoComplete="username"
                        required
                        placeholder={t('character_limit')}
                        id="username"
                        className={`form-control ${
                          errors.username && touched.username && 'is-invalid'
                        }`}
                      />
                      <label className="form-label" htmlFor="username">
                        {t('user_name')}
                      </label>
                      <ErrorMessage name="username" component="div" className="invalid-tooltip" />
                    </div>

                    <div className="form-floating mb-3">
                      <Field
                        name="password"
                        autoComplete="new-password"
                        required
                        placeholder={t('min_length_6')}
                        type="password"
                        id="password"
                        aria-describedby="passwordHelpBlock"
                        aria-autocomplete="list"
                        className={`form-control ${
                          errors.password && touched.password && 'is-invalid'
                        }`}
                      />
                      <label className="form-label" htmlFor="password">
                        {t('password')}
                      </label>
                      <ErrorMessage name="password" component="div" className="invalid-tooltip" />
                    </div>
                    <div className="form-floating mb-4">
                      <Field
                        name="confirmPassword"
                        autoComplete="new-password"
                        required
                        placeholder={t('passwords_must_match')}
                        type="password"
                        id="confirmPassword"
                        className={`form-control ${
                          errors.confirmPassword && touched.confirmPassword && 'is-invalid'
                        }`}
                      />
                      <label className="form-label" htmlFor="confirmPassword">
                        {t('confirm_password')}
                      </label>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="invalid-tooltip"
                      />
                    </div>
                    <button type="submit" className="w-100 btn btn-outline-primary">
                      {t('sign_up')}
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
};

export default Signup;

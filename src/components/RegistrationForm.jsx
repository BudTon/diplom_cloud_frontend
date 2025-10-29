import { useSelector, useDispatch } from "react-redux";
import { fetchRegisterUser } from '../fetch/fetchRegisterUser'
import { Formik, Field, Form } from "formik";
import { useNavigate } from 'react-router-dom';
import { invisibleRegistrationForm } from '../redux/slices/formSlice';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isModalRegistrationForm = useSelector((state) => state.form.isModalRegistrationForm);

  return (
    <>
      {isModalRegistrationForm && (
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validate={(values) => { }}
          onSubmit={async (values) => {
            await dispatch(fetchRegisterUser(values)).unwrap();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="register-form">
              <Field type="text" name="username" placeholder="Username" />
              <Field type="email" name="email" placeholder="Email" />
              <Field type="password" name="password" placeholder="Password" />
              <button type="submit" disabled={isSubmitting || loading}>Зарегистрироваться</button>
              {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default RegistrationForm;

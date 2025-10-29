import { useSelector, useDispatch } from "react-redux";
import { fetchRegisterUser } from '../fetch/fetchRegisterUser'; // Импортируем экшн для регистрации
import { Formik, Field, Form } from "formik";
import './register-form.css'

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const { results, loading, errorMessage } = useSelector((state) => state.user);

  return (
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
  );
};

export default RegisterForm;

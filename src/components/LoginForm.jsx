import { useSelector, useDispatch } from "react-redux";
import { fetchLoginUser } from '../fetch/fetchLoginUser'
import { Formik, Field, Form } from "formik";
import { useNavigate } from 'react-router-dom';
import { invisibleLoginForm } from '../redux/slices/formSlice';
import { logout } from "../redux/slices/menuRegSlice";
import './login-form.css'

export const LoginForm = () => {
  const dispatch = useDispatch();
  const { results } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const isModalLoginForm = useSelector((state) => state.form.isModalLoginForm);

  if (results.status !== 'ok') {
    console.warn('Пользователь еще неавторизирован');
  }

  const handleCancel = () => {
    dispatch(invisibleLoginForm());
    dispatch(logout());
  };

  return (
    <>

      {isModalLoginForm && (
        <div className="modal-box-form">
          <div className="modal-form">
            <Formik
              initialValues={{ username: "", password: "" }}
              validate={(values) => {
              }}
              onSubmit={async (values) => {
                await dispatch(fetchLoginUser(values)).unwrap();
                dispatch(invisibleLoginForm())
                navigate('/storage');
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field type="text" name="username" placeholder="Username" />
                  <Field type="password" name="password" placeholder="Password" />
                  <button className="button-login-form-submit" type="submit" disabled={isSubmitting}>Login</button>
                  <button className="button-login-form-cancel" onClick={handleCancel}>Cancel</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;

import { useSelector, useDispatch } from "react-redux";
import { fetchLoginUser } from '../fetch/fetchLoginUser'
import { Formik, Field, Form } from "formik";
import { useNavigate } from 'react-router-dom';
import { invisibleLoginForm } from '../redux/slices/formSlice';


export const LoginForm = () => {
  const dispatch = useDispatch();
  const { results } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const isModalLoginForm = useSelector((state) => state.form.isModalLoginForm);

  if (results.status !== 'ok') {
    console.warn('Пользователь еще неавторизирован');
  }

  return (
    <>

      {isModalLoginForm && (
        <div className="modal-box">
          <div className="modal-file">
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
                  <button type="submit" disabled={isSubmitting}>Login</button>
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

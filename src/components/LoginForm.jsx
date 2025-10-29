import { useSelector, useDispatch } from "react-redux";
import { fetchLoginUser } from '../fetch/fetchLoginUser'
import { Formik, Field, Form } from "formik";
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  // const dispatch = useDispatch();
  // const { results, loading, errorMessage } = useSelector((state) => state.user);
  // const navigate = useNavigate();

  // if (results.status === 'ok') {
  //   navigate('/storage');
  // } else {
  //   console.warn('Пользователь еще неавторизирован');
  // }

  return (
    <>
    </>
    // <Formik
    //   initialValues={{ username: "", password: "" }}
    //   validate={(values) => { }}
    //   onSubmit={async (values) => {
    //     console.log(values, 'values--------');
    //     await dispatch(fetchLoginUser(values)).unwrap(); // unwrap() используется для обработки ошибок
    //   }}
    // >
    //   {/* {({ isSubmitting }) => (
    //     // <Form>
    //     //   <Field type="text" name="username" placeholder="Username" />
    //     //   <Field type="password" name="password" placeholder="Password" />
    //     //   <button type="submit" disabled={isSubmitting || loading}>Login</button>
    //     //   {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    //     // </Form>
    //   )} */}
    // </Formik>
  );
};

export default LoginForm;

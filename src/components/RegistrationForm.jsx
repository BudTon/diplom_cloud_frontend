import { useSelector, useDispatch } from "react-redux";
import { fetchRegisterUser } from '../fetch/fetchRegisterUser'
import { Formik, Field, Form } from "formik";
import { useNavigate } from 'react-router-dom';
import { invisibleRegistrationForm } from '../redux/slices/formSlice';
import { logout } from "../redux/slices/menuRegSlice";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { results, loading, errorMessage } = useSelector((state) => state.user);
  const isModalRegistrationForm = useSelector((state) => state.form.isModalRegistrationForm);

    const handleCancel = () => {
      dispatch(invisibleRegistrationForm());
      dispatch(logout());
    };

  return (
    <>

      {isModalRegistrationForm && (
        <div className="modal-box-form-reg">
          <div className="modal-form-reg">
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
                  <button className="button-login-form-submit" type="submit" disabled={isSubmitting || loading}>Зарегистрироваться</button>
                  <button className="button-login-form-cancel" onClick={handleCancel}>Cancel</button>
                  {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default RegistrationForm;

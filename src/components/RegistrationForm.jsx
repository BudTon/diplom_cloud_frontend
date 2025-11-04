import { useSelector, useDispatch } from "react-redux";
import { fetchRegisterUser } from '../fetch/fetchRegisterUser';
import { fetchLoginUser } from "../fetch/fetchLoginUser";
import { useState } from 'react';
import { Formik, Field, Form } from "formik";
import { useNavigate } from 'react-router-dom';
import { invisibleRegistrationForm } from '../redux/slices/formSlice';
import { logout } from "../redux/slices/menuRegSlice";
import './register-form.css'

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { results, loading, errorMessage } = useSelector((state) => state.user);
  const isModalRegistrationForm = useSelector((state) => state.form.isModalRegistrationForm);
  const [isCheckedAdmin, setIsCheckedAdmin] = useState(false);

  const handleCancel = () => {
    dispatch(invisibleRegistrationForm());
    dispatch(logout());
  };

  const handleCheckboxChangeAdmin = () => {
    let auchAdmin = prompt('введите пароль администратора')
    console.log(auchAdmin, ' - auchAdmin');
    if (auchAdmin === 'admin') {
      setIsCheckedAdmin(!isCheckedAdmin);
    } else {
      alert('Неверный пароль Администратора')
    }
  };

  return (
    <>

      {isModalRegistrationForm && (
        <div className="modal-box-form-reg">
          <div className="modal-form-reg">
            <Formik
              initialValues={{ username: "", firstname: "", email: "", password: "", isStaff: false }}
              validate={(values) => { }}
              onSubmit={async (values) => {
                values.isStaff = isCheckedAdmin;
                console.log(values);
                await dispatch(fetchRegisterUser(values)).unwrap();
                dispatch(invisibleRegistrationForm());
                await dispatch(fetchLoginUser({ username: values.username, password: values.password })).unwrap();
                navigate('/storage');
              }}
            >
              {({ isSubmitting }) => (
                <Form className="register-form">
                  <Field type="text" name="username" placeholder="Логин" />
                  <Field type="text" name="firstname" placeholder="Полное имя" />
                  <Field type="email" name="email" placeholder="Электронная почта" />
                  <Field type="password" name="password" placeholder="Пароль" />
                  <label name="is_staff" className="label-admin">
                    <input className="input-admin"
                      type="checkbox"
                      checked={isCheckedAdmin}
                      onChange={handleCheckboxChangeAdmin}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <button className="button-login-form-submit" type="submit" disabled={isSubmitting || loading}>Зарегистрироваться</button>
                  <button className="button-login-form-cancel" onClick={handleCancel}>Отмена</button>
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

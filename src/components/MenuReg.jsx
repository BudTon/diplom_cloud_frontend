import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/slices/menuRegSlice';
import { hidden, nothidden } from '../redux/slices/menuSlice';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from "formik";
import { fetchLoginUser } from '../fetch/fetchLoginUser';
import './menu-reg.css';

export default function MenuReg() {
  const results = useSelector((state) => state.user.results);
  const file = useSelector((state) => state.file.results);
  const isLoggedIn = useSelector((state) => state.menuReg.isLoggedIn);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();


  const handleLogin = () => {
    dispatch(login());
    setIsModalOpen(true);
    dispatch(nothidden());

  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    location.reload(true);
    // dispatch(hidden());

    // dispatch(clear());
    // setIsModalOpen(false);

  };

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     // navigate('/storage');
  //   }
  // }, [isLoggedIn, navigate]);

  return (
    <>
      <div className="menu-reg-box">
        <div className="buttons">
          {isLoggedIn ? (
            <button className="button-menu-reg" onClick={handleLogout}>Выход</button>
          ) : (
            <>
              <button className="button-menu-reg" onClick={handleLogin}>Регистрация</button>
              <button className="button-menu-reg" onClick={handleLogin}>Войти</button>
            </>
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-box">
          <div className="modal-file">
            <Formik
              initialValues={{ username: "", password: "" }}
              validate={(values) => {
                console.log(values, '= values');
              }}
              onSubmit={async (values) => {
                console.log(values, 'values--------');
                await dispatch(fetchLoginUser(values)).unwrap();
                navigate('/storage');
                setIsModalOpen(false);
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
}

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchFileUser } from '../fetch/fetchFileUser';
import UserProperty from './UserProperty';
import { Formik, Field, Form } from "formik";
import { fetchFileUploaded } from '../fetch/fetchFileUploaded';
import { useNavigate } from 'react-router-dom';
import './form-load.css'

export const StorageUsers = () => {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.user.results);
  const file = useSelector((state) => state.file.results);
  const loading = useSelector((state) => state.file.loading);
  const error = useSelector((state) => state.file.error);

  const [isModalUploadOpen, setIsModalUploadOpen] = useState(false);

  const navigate = useNavigate();

  const handleCloseModalUpload = () => {
    setIsModalUploadOpen(false);
    navigate('/storage');
  };

  const handleOpenModalUpload = () => {
    setIsModalUploadOpen(true);
  };

  useEffect(() => {
    console.log(results, ' - dispatch, results');
    dispatch(fetchFileUser(results));
  }, [dispatch, results]);

  console.log(file.users, '-users');

  return (
    <>
      <button className="open-button" onClick={handleOpenModalUpload}>Загрузка файл</button>
      <h1>Список пользователей</h1>
      {loading ? (
        <p>Загружаю...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>логин</th>
              <th>полное имя</th>
              <th>email</th>
              <th>количество файов</th>
              <th>размер файлов</th>
              <th>статус админа</th>
            </tr>
          </thead>
          <tbody>
            {
              file.users !== undefined &&
              file.users.length > 0 &&
              file.users.map((user, index) => (
                <UserProperty key={user.id} user={user} index={index + 1} />
              ))
            }
          </tbody>
        </table>
      )}
    </>
  );
};


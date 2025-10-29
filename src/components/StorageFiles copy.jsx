import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchFileUser } from '../fetch/fetchFileUser';
import FileProperty from './FileProperty';
import { Formik, Field, Form } from "formik";
import { fetchFileUploaded } from '../fetch/fetchFileUploaded';
import './card-film.css'
import './find-film.css'
import './form-load.css'

export const StorageFiles = () => {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.user.results);
  const file = useSelector((state) => state.file.results);
  const loading = useSelector((state) => state.file.loading);
  const error = useSelector((state) => state.file.error);

  useEffect(() => {
    console.log(results, ' - dispatch, results');
    dispatch(fetchFileUser(results));
  }, [dispatch, results]);

  console.log(file.user_files, '-file');

  return (
    <>
      <div className="form-container">
        <h2 className="form-title">Загрузка файла</h2>
        <Formik
          initialValues={{
            selectedFile: null,
            comment: ''
          }}
          validate={(values) => { }}
          onSubmit={(values, { resetForm, setFieldValue }) => {
            console.log(values, 'values--------');
            dispatch(fetchFileUploaded(values))
              .unwrap()
              .then(() => {
                alert(`Файл отправлен!\nИмя файла: ${values.selectedFile.name}\nКомментарий: ${values.comment}`);
                resetForm();
              })
              .catch((error) => {
                console.error('Ошибка при отправке файла:', error);
              });
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="upload-field">
                <label htmlFor="selectedFile">Выберите файл: <br /></label>
                <br />
                <input
                  type="file"
                  id="selectedFile"
                  name="selectedFile"
                  onChange={(event) => {
                    const file = event.target.files[0]; // Получаем объект файла
                    setFieldValue('selectedFile', file); // Устанавливаем файл в Formik
                  }}
                  onBlur={handleBlur}
                />
                {touched.selectedFile && errors.selectedFile ? (<span className="errors">{errors.selectedFile}</span>) : null}
              </div>
              <div className="comment-field">
                <textarea
                  placeholder="Напишите комментарий..."
                  rows="4"
                  name="comment"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.comment}
                />
                {touched.comment && errors.comment ? (<span className="errors">{errors.comment}</span>) : null}
              </div>
              <button type="submit" className="submit-button" disabled={isSubmitting}>
                Загрузить файл
              </button>
            </form>
          )}
        </Formik>
      </div>
      <h1>Список файлов</h1>
      {loading ? (
        <p>Загружаю...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>имя файла</th>
              <th>комментарий</th>
              <th>размер</th>
              <th>дата загрузки</th>
              <th>дата последнего скачивания</th>
            </tr>
          </thead>
          <tbody>
            {file.user_files !== undefined &&
              file.user_files.length > 0 &&
              file.user_files.map(file => (
                <FileProperty key={file.id} {...file} />
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};

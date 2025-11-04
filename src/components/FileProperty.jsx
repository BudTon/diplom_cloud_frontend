import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { dateTime } from '../hooks/dateTime';
import { fetchFileDelete } from '../fetch/fetchFileDelete';
import { fetchFileUser } from '../fetch/fetchFileUser';
import { fetchFileRename } from '../fetch/fetchFileRename';
import { fetchFileDownload } from '../fetch/fetchFileDownload';
import { showToast } from '../hooks/showToast'
import './file-property.css'

export default function FileProperty({ file, index }) {
  const dispatch = useDispatch();
  const { id, file_name, comment, size, created_at, lastDownloadDate, type, link } = file
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.user.results);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFileClick = () => {
    setIsModalOpen(true);
  };

  const handleRenameFile = () => {
    let result = prompt("Введите новое имя файла:");
    if (result) {
      let newFileName;
      if (type) {
        newFileName = `${result}${type}`;
      } else {
        newFileName = `${result}${/\.[^.]*$/.exec(file_name)[0]}`;
      }
      const fileId = id
      const token = user.token
      dispatch(fetchFileRename({ fileId, newFileName, token }))
        .then(() => {
          console.log(user, ' - fetchFileRename({fileId, newFilename })');
          showToast('toast', "Имя файла изменилось")
          setTimeout(function () { dispatch(fetchFileUser(user)); }, 3000);
        })
        .catch(error => {
          showToast('toast', "Ошибка при изменении имени файла")
          console.error("Ошибка при изменении имени файла:", error);
        });
    } else {
      showToast('toast', "Имя файла не поменялось")
      console.log("Имя файла не поменялось");
    }
  };

  const handleChangeCommentFile = () => {
    let result = prompt("Введите новый комментарий:");
    if (result) {
      let newComment = result;
      const fileId = id
      const token = user.token

      dispatch(fetchFileRename({ fileId, newComment, token }))
        .then(() => {
          showToast('toast', "Комментарий изменился")
          setTimeout(function () { dispatch(fetchFileUser(user)); }, 3000);
        })
        .catch(error => {
          showToast('toast', "Ошибка при изменении комментария")
          console.error("Ошибка при изменении комментария:", error);
        });
    } else {
      showToast('toast', "Комментарий не поменялся")
      console.log("Комментарий не поменялся");
    }
  };

  const handleDeleteFile = () => {
    dispatch(fetchFileDelete(id))
      .then(() => {
        showToast('toast', "Файл удален")
        setTimeout(function () { dispatch(fetchFileUser(user)); }, 3000);
      })
      .catch(error => {
        console.error("Ошибка при удалении файла:", error);
      });
  };

  const handleDownloadFile = () => {
    const fileId = id
    const token = user.token
    dispatch(fetchFileDownload({ fileId, token, file_name }));
    showToast('toast', "Файл успешно скачен")
    console.log("Файл успешно скачен");
    setTimeout(function () { dispatch(fetchFileUser(user)); }, 3000);
  };

  return (
    <>
      <tr onClick={handleFileClick}>
        <td>{index}</td>
        <td>{file_name}</td>
        <td>{comment ? comment : "-"}</td>
        <td>{Math.round(size / 1024)} KB</td>
        <td>{created_at ? dateTime(created_at) : "-"}</td>
        <td>{lastDownloadDate ? dateTime(lastDownloadDate) : "-"}</td>
      </tr>
      {isModalOpen && (
        <tr>
          <td>
            <div className="modal-box">
              <div className="modal-file">
                <div id="toast"></div>
                <h2>Детали файла</h2>
                <p>type: {type}</p>
                <p className="rename-button-file" onClick={handleRenameFile}>имя файла: {file_name} 🖊️</p>
                <p className="recomment-button-file" onClick={handleChangeCommentFile}>комментарий: {comment ? comment : "-"} 🖊️</p>
                <p>дата загрузки: {created_at ? dateTime(created_at) : "-"}</p>
                <p>дата последнего скачивания: {lastDownloadDate ? dateTime(lastDownloadDate) : "-"}</p>
                <p>размер: {Math.round(size / 1024)} KB</p>
                <p>ссылка для скачивания: {link ? link : "-"}</p>
                <div className="btn-all">
                  <button className="delete-button-file" onClick={handleDeleteFile}>Удалить</button>
                  <button className="download-button-file" onClick={handleDownloadFile}>Скачать</button>
                  <button className="button-login-form-cancel" onClick={handleCloseModal}>Отмена</button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}

    </>
  )
}

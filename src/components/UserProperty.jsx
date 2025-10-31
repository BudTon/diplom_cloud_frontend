// import { useDispatch, useSelector } from 'react-redux';
// import { useState } from 'react';
// import { dateTime } from '../hooks/dateTime';
// import { fetchFileDelete } from '../fetch/fetchFileDelete';
// import { fetchFileUser } from '../fetch/fetchFileUser';
// import { fetchFileRename } from '../fetch/fetchFileRename';
// import { fetchFileDownload } from '../fetch/fetchFileDownload';
import { showToast } from '../hooks/showToast'
import './file-property.css'

export default function UserProperty({ user, index }) {
  // const dispatch = useDispatch();
  const { id, username, first_name, email, file_count, total_size } = user
  // const user = useSelector((state) => state.user.results);

  const handleUserClick = () => {
    const fileId = id
    const token = user.token
    showToast('toast', "Файл успешно скачен")
    console.log(fileId, "Файл успешно скачен", token);
  };

  return (
    <>
      <tr>
        <td>{index}</td>
        <td onClick={handleUserClick}>{username}</td>
        <td>{first_name}</td>
        <td>{email}</td>
        <td>{file_count}</td>
        <td>{Math.round(total_size / 1024)} KB</td>
      </tr>

    </>
  )
}

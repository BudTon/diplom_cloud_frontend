import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { fetchUserStatusAdmin } from '../fetch/fetchUserStatusAdmin';
import { fetchUserDelete } from '../fetch/fetchUserDelete';
// import { StorageUsers } from './StorageUsers';
import { useNavigate } from 'react-router-dom';

// import { showToast } from '../hooks/showToast'
import './file-property.css'
import './user-property.css'


export default function UserProperty({ user, index }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, username, first_name, email, file_count, total_size, is_staff } = user
  const token = useSelector((state) => state.user.results).token;
  const [isChecked, setIsChecked] = useState(is_staff);

  const handleCheckboxChange = () => {
    const userId = id
    const newIsStaff = !isChecked
    dispatch(fetchUserStatusAdmin({ userId, newIsStaff, token }))
    setIsChecked(!isChecked);
  };
  const handleUserClick = () => {
    const fileId = id
    const token = user
    console.log(fileId, "Файл успешно скачен", token);
  };

  const handleUserDelete = () => {
    let actions = confirm("Вы уверены что хотите УДАЛИТЬ Пользователя?");
    if (actions) {
      const userId = id
      dispatch(fetchUserDelete({ userId, token }))
        .unwrap()
        .then(response => {
          if (response.status === 204) {
            alert("Пользователь УДАЛЕН");
            console.log(response, ' - response');
            navigate('/useradmin');
          } else {
            alert("Ошибка при удалении пользователя.");
            console.error(response);
          }
        })
        .catch(error => {
          // console.log(response, ' - response');

          alert("Ошибка при удалении пользователя.");
          console.error(error);
        });
    } else {
      alert("Вы отменили удаление.");
    }
  };

  return (
    <>
      <tr>
        <td>{index}</td>
        <td>{username}</td>
        <td>{first_name}</td>
        <td>{email}</td>
        <td>{file_count}</td>
        <td>{Math.round(total_size / 1024)} KB</td>
        <td>
          <label className="label-admin">
            <input className="input-admin"
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <span className="checkmark"></span>
          </label>
        </td>
        <td className="button-user-actions">
          <button onClick={handleUserClick} className='button-user-link'> Go </button>
          <button onClick={handleUserDelete} className='button-user-delete'> Del </button>
        </td>
      </tr>

    </>
  )
}

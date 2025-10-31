import { NavLink } from 'react-router-dom';
import MenuReg from './MenuReg'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import { useSelector, useDispatch } from 'react-redux';


import '../App.css'

export default function Menu() {
  const hiddenPages = useSelector((state) => state.menu.hiddenPages);
  console.log(hiddenPages, ' - hiddenPages');

  return (
    <>
      <MenuReg />
      <LoginForm />
      <RegistrationForm />
      <nav className="menu">
        <NavLink className={({ isActive }) => isActive ? 'menu__item menu__item-active' : 'menu__item'} to='/'>Главная</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'menu__item menu__item-active' : `menu__item ${hiddenPages}`} to='/storage'>Хранилище</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'menu__item menu__item-active' : 'menu__item'} to='/useradmin'>Пользователи</NavLink>
        {/* <NavLink className={({ isActive }) => isActive ? 'menu__item menu__item-active' : 'menu__item'} to='/login'>login</NavLink> */}
      </nav>
    </>
  )
}

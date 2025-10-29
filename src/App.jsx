import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Menu from './components/Menu';
import HomePage from './pages/HomePage';
import StorageFilesPage from './pages/StorageFilesPage';
import UserAdminPage from './pages/UserAdminPage';
// import UserPage from './pages/UserPage';

import "./styles.css";

export default function App() {
  return (
    <>
      <h1>Дипломный проект по профессии «Fullstack-разработчик на Python»</h1>
      <h2>Облачное хранилище My Cloud</h2>
      <div className="container">
        <Router basename="/">
          <div>
            <Menu />
            <div className="page">
              <Routes >
                <Route path="/" index element={<HomePage />} />
                <Route path="/storage" element={<StorageFilesPage />} />
                <Route path="/useradmin" element={<UserAdminPage />} />
                {/* <Route path="/login" element={<UserPage />} /> */}
                {/* <Route path="*" element={<Navigate replace to="/" />} /> */}
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </>
  );
}

import { Routes, Route, useLocation } from "react-router-dom";

import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";
import TasksPage from "./pages/tasksPage";
import TaskFromPage from "./pages/taskFromPage";
import ProfilePage from "./pages/profilePage";
import HomePage from "./pages/homePage";
import AdminPanel from "./pages/adminPanel";
import AdminFormPage from "./pages/adminFormPage";
import { useAuth } from "./context/authContext";

import ProtectedRoute from "./protectedRoute";
import AdminRoute from "./adminRoute";

import Navbar from "./components/Navbar";

function App() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const showNavbar = isAuthenticated || location.pathname === "/";
  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          {/**  APARTIR DE AQUÍ SON LAS RUTAS QUE ESTARÁN PROTEGIDAS*/}
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/add-task" element={<TaskFromPage />} />
          <Route path="/tasks/:id" element={<TaskFromPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* AQUÍ EMPIEZAN LAS RUTAS PROTEGIDAS POR ADMINISTRADOR*/}
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/edit/:id" element={<AdminFormPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

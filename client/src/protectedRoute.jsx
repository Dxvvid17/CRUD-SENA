import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";

function ProtectedRoute() {

    const {loading, isAuthenticated} = useAuth();

    if (loading) return <h1>Loading...</h1>;

    if (!loading && !isAuthenticated) return <Navigate to='/login' replace />;    {/**  SI NO ESTÁ LOGEADO, LO LLEVA A LA PÁGINA DE LOGIN*/} 

    return <Outlet />;    {/**  SI ESTÁ LOGEADO, LO LLEVA A LA RUTA PROTEGIDA*/}
}

export default ProtectedRoute;
import { Outlet } from "react-router-dom";

const AdminLayoutPages = () => {
    return (
        <div className="admin">
            <div className="admin__container">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayoutPages;

import { Outlet } from "react-router-dom";
import CustomSelect from "../components/CustomSelect";
import { GlobalCartProvider } from "../hooks/CartContex";

const UserLayout = () => {
    return (
        <GlobalCartProvider>
            <div className="layout__user">
                <div className="container">
                    <header className="container__header">
                        <div className="header__para">Jesteśmy otwarci 7 dni w tygodniu</div>
                        <div className="header__locationCinema">
                            <CustomSelect />
                        </div>
                    </header>
                </div>
                <Outlet />
            </div>
        </GlobalCartProvider>
    );
};

export default UserLayout;

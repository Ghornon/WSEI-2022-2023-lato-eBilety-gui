import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import atob from "atob";
import { useState } from "react";

import AppLayout from "./layouts/AppLayout";
import SignInLayout from "./layouts/SignInLayout";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import NotFound from "./pages/NotFound";
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import Login from "./pages/SignIn/LoginPage";
import Register from "./pages/SignIn/RegisterPage";

import UserLayoutPages from "./layouts/UserLayoutPages";

import DashboardUser from "./pages/User/DashboardUser";
import MovieGet from "./pages/User/Movie/MovieGet";
import MovieList from "./pages/User/Movie/MovieList";
import ActorGet from "./pages/User/Actor/ActorGet";
import ActorList from "./pages/User/Actor/ActorList";

import AdminLayoutPages from "./layouts/AdminLayoutPages";

import ActorAList from "./pages/Admin/Actor/ActorAList";
import ActorAGet from "./pages/Admin/Actor/ActorAGet";
import ActorANew from "./pages/Admin/Actor/ActorANew";
import ActorAEdit from "./pages/Admin/Actor/ActorAEdit";

import CinemaAList from "./pages/Admin/Cinema/CinemaAList";
import CinemaAGet from "./pages/Admin/Cinema/CinemaAGet";
import CinemaANew from "./pages/Admin/Cinema/CinemaANew";
import CinemaAEdit from "./pages/Admin/Cinema/CinemaAEdit";

import MovieAList from "./pages/Admin/Movie/MovieList";
import MovieAGet from "./pages/Admin/Movie/MovieAGet";

import ProducerAList from "./pages/Admin/Producer/ProducerAList";
import OrderList from "./pages/Admin/Order/OrderList";
import Cart from "./pages/User/Cart";
import ProducerAGet from "./pages/Admin/Producer/ProducerAGet";
import ProducerANew from "./pages/Admin/Producer/ProducerANew";
import ProducerAEdit from "./pages/Admin/Producer/ProducerAEdit";

const App = () => {
    const [isAuth, setAuth] = useState<boolean>(false);
    const [isAdmin, setAdmin] = useState<boolean>(false);
    let token: any = localStorage.getItem("TOKEN_USER");

    if (token && token !== null) {
        const role = JSON.parse(atob(token.split(".")[1]));
        if (role) {
            let getRole: string = role?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            console.log(typeof getRole);
            // window.location.reload();
            if (getRole && isAuth === false) {
                setAuth(true);
                console.log("Wykryłem rol", getRole);
                if (getRole === "Admin") {
                    setAdmin(true);
                }
            }
        }
    } else {
        if (isAuth !== false) {
            console.log("Ustawiam false");
            setAuth(false);
        }
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<AppLayout />}>
                {isAuth ? (
                    isAdmin ? (
                        <Route path="/" element={<AdminLayout />}>
                            <Route index element={<DashboardAdmin />} />
                            <Route path="Actors" element={<AdminLayoutPages />}>
                                <Route index element={<ActorAList />} />
                                <Route path="Get/:id" element={<ActorAGet />} />
                                <Route path="New" element={<ActorANew />} />
                                <Route path="Edit/:id" element={<ActorAEdit />} />
                            </Route>
                            <Route path="Cinemas" element={<AdminLayoutPages />}>
                                <Route index element={<CinemaAList />} />
                                <Route path="Get/:id" element={<CinemaAGet />} />
                                <Route path="New" element={<CinemaANew />} />
                                <Route path="Edit/:id" element={<CinemaAEdit />} />
                            </Route>
                            <Route path="Movies" element={<AdminLayoutPages />}>
                                <Route index element={<MovieAList />} />
                                <Route path="Get/:id" element={<MovieAGet />} />
                                <Route path="New" element={<h1>Admin</h1>} />
                                <Route path="Edit/:id" element={<h1>Admin</h1>} />
                            </Route>
                            <Route path="Producers" element={<AdminLayoutPages />}>
                                <Route index element={<ProducerAList />} />
                                <Route path="Get/:id" element={<ProducerAGet />} />
                                <Route path="New" element={<ProducerANew />} />
                                <Route path="Edit/:id" element={<ProducerAEdit />} />
                            </Route>
                            <Route path="Orders" element={<AdminLayoutPages />}>
                                <Route index element={<OrderList />} />
                                <Route path="Get/:id" element={<h1>Admin</h1>} />
                                <Route path="New" element={<h1>Admin</h1>} />
                                <Route path="Edit/:id" element={<h1>Admin</h1>} />
                            </Route>
                        </Route>
                    ) : (
                        <Route path="/" element={<UserLayout />}>
                            <Route index element={<DashboardUser />} />
                            <Route path="Actors" element={<UserLayoutPages />}>
                                <Route index element={<ActorList />} />
                                <Route path=":id" element={<ActorGet />} />
                            </Route>
                            <Route path="Movies" element={<UserLayoutPages />}>
                                <Route index element={<MovieList />} />
                                <Route path=":id" element={<MovieGet />} />
                            </Route>
                            <Route path="Cart" element={<UserLayoutPages />}>
                                <Route index element={<Cart />} />
                            </Route>
                        </Route>
                    )
                ) : (
                    <Route path="/" element={<SignInLayout />}>
                        <Route index element={<Login />} />
                        <Route path="Register" element={<Register />} />
                    </Route>
                )}
                <Route path="*" element={<NotFound />} />
            </Route>
        )
    );
    return <RouterProvider router={router} />;
};

export default App;

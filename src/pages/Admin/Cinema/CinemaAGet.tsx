import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getCinemasID } from "../../../services/Api";
interface Data {
    id: string;
    logo: string;
    name: string;
    description: string;
}

const CinemaAGet = () => {
    let navigate = useNavigate();
    const { id } = useParams();

    const [isLoading, setLoading] = useState<boolean>(false);
    const [cinema, setCinema] = useState<Data>({ id: "", logo: "", name: "", description: "" });

    const onSuccess = ({ data }: { data: any }) => {
        console.log(data);
        setCinema(data);
    };

    const onError = ({ data }: { data: any }) => {
        console.log(data);
    };
    useEffect(() => {
        if (!isLoading && id) {
            getCinemasID(id, onSuccess, onError);
            setLoading(true);
        }
    }, [cinema, isLoading, id]);
    return (
        <div className="container__form">
            <nav className="form__nav">
                <button
                    className="button nav"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Cofnij
                </button>
                <NavLink to={`/Cinemas/Edit/${cinema.id}`} className="button default">
                    Edytuj
                </NavLink>
            </nav>
            <div className="get">
                <div className="get__image">
                    <figure className="image" style={{ backgroundImage: `url("${cinema.logo}")` }}></figure>
                </div>
                <div className="get__headertext">
                    <h2>{cinema.name}</h2>
                </div>
                <div className="get__bio">
                    <p>{cinema.description}</p>
                </div>
            </div>
        </div>
    );
};

export default CinemaAGet;

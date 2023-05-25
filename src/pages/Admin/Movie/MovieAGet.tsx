import { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { getMoviesID } from "../../../services/Api";
interface Data {
    id: number;
    name: string;
    description: string;
    price: number;
    imageURL: string;
    startDate: string;
    endDate: string;
    movieCategory: number;
    actorsMovies: any;
    cinemaId: number;
    cinema: any;
    producerId: number;
    producer: any;
}

const MovieAGet = () => {
    let navigate = useNavigate();
    const { id } = useParams();

    const [isLoading, setLoading] = useState<boolean>(false);
    const [movie, setMovie] = useState<Data>({
        id: 0,
        name: "",
        description: "",
        price: 0,
        imageURL: "",
        startDate: "",
        endDate: "",
        movieCategory: 0,
        actorsMovies: {},
        cinemaId: 0,
        cinema: {},
        producerId: 0,
        producer: {},
    });

    const onSuccess = ({ data }: { data: any }) => {
        console.log(data);
        setMovie(data);
    };

    const onError = ({ data }: { data: any }) => {
        console.log("Movie error:", data);
    };
    useEffect(() => {
        if (!isLoading && id) {
            getMoviesID(id, onSuccess, onError);
            setLoading(true);
        }
    }, [movie, isLoading, id]);
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
                <NavLink to={`/Movies/Edit/${movie.id}`} className="button default">
                    Edytuj
                </NavLink>
            </nav>
            <div className="get">
                <div className="get__image ">
                    <figure className="image" style={{ backgroundImage: `url("${movie.imageURL}")` }}></figure>
                </div>
                <div className="get__headertext">
                    <h2>{movie.name}</h2>
                </div>
                <div className="get__bio">
                    <p>{movie.description}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieAGet;

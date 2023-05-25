import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMoviesID } from "../../../services/Api";
import useCartState from "../../../hooks/CartContex";

const MovieGet = () => {
    const globalCart = useCartState();
    interface Data {
        id: string;
        imageURL: string;
        name: string;
        price: number;
        description: string;
        producer: string;

        actorsMovies: [];
    }
    let navigate = useNavigate();
    const { id } = useParams();

    const [isLoading, setLoading] = useState<boolean>(false);
    const [movie, setMovie] = useState<Data>({
        id: "",
        imageURL: "",
        name: "",
        price: 0,
        description: "",
        producer: "",
        actorsMovies: [],
    });

    const onSuccess = ({ data }: { data: any }) => {
        console.log(data);
        setMovie(data);
    };

    const onError = ({ data }: { data: any }) => {
        console.log("Movie error:", data);
    };
    const addToCart = (data: Data) => {
        console.log(data);
        globalCart.setMyCart(data);
        navigate("/Cart");
    };
    useEffect(() => {
        if (!isLoading && id) {
            getMoviesID(id, onSuccess, onError);
            setLoading(true);
        }
    }, [movie, isLoading, id]);
    return (
        <div className="getItem">
            <nav className="getItem__nav">
                <button
                    className="button"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Cofnij
                </button>
            </nav>
            <div className="getItem__container">
                <div className="container__image">
                    <figure className="image" style={{ backgroundImage: `url("${movie.imageURL}")` }}></figure>
                </div>
                <div className="container__info">
                    <h2>{movie?.name}</h2>
                    <p>{movie?.description}</p>
                    <p>Reżyser: {movie?.producer?.fullName}</p>
                    <div>
                        Obsada:{" "}
                        {movie?.actorsMovies?.map((item) => (
                            <div key={item?.actor?.id}>{item?.actor?.fullName}</div>
                        ))}
                    </div>
                    <div className="container__buttons">
                        <button className="button" onClick={() => addToCart(movie)}>
                            {movie?.price} zł
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieGet;

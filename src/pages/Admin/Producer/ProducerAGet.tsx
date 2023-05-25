import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getProducersID } from "../../../services/Api";
interface Data {
    id: string;
    avatar: string;
    fullName: string;
    bio: string;
}

const ProducerAGet = () => {
    let navigate = useNavigate();
    const { id } = useParams();

    const [isLoading, setLoading] = useState<boolean>(false);
    const [producer, setProducer] = useState<Data>({ id: "", avatar: "", fullName: "", bio: "" });

    const onSuccess = ({ data }: { data: any }) => {
        console.log(data);
        setProducer(data);
    };

    const onError = ({ data }: { data: any }) => {
        console.log(data);
    };
    useEffect(() => {
        if (!isLoading && id) {
            getProducersID(id, onSuccess, onError);
            setLoading(true);
        }
    }, [producer, isLoading, id]);
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
                <NavLink to={`/Producers/Edit/${producer.id}`} className="button default">
                    Edytuj
                </NavLink>
            </nav>
            <div className="get">
                <div className="get__image">
                    <figure className="image" style={{ backgroundImage: `url("${producer.avatar}")` }}></figure>
                </div>
                <div className="get__headertext">
                    <h2>{producer.fullName}</h2>
                </div>
                <div className="get__bio">
                    <p>{producer.bio}</p>
                </div>
            </div>
        </div>
    );
};

export default ProducerAGet;

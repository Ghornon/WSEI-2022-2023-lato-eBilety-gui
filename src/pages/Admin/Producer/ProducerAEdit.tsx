import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProducersID, putProducers } from "../../../services/Api";

interface DataValues {
    avatar: string;
    fullName: string;
    bio: string;
}

const ProducerAEdit = () => {
    const { id } = useParams();

    let navigate = useNavigate();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [formValues, setFormValues] = useState<DataValues>({ avatar: "", fullName: "", bio: "" });

    const onSuccessFetch = ({ data }: { data: any }) => {
        console.log(data);
        setFormValues(data);
    };

    useEffect(() => {
        if (!isLoading && id) {
            getProducersID(id, onSuccessFetch, onError);
            setLoading(true);
        }
    }, [formValues, isLoading, id]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const onSuccess = ({ data }: { data: any }) => {
        console.log(data);
        navigate(-1);
    };

    const onError = ({ data }: { data: any }) => {
        console.log(data);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formValues);
        const { avatar, fullName, bio } = formValues;
        putProducers(id, avatar, fullName, bio, onSuccess, onError);
    };
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
            </nav>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form__inputContainer">
                    <label className="inputContainer__label" htmlFor="avatar">
                        Obrazek URL
                    </label>
                    <input
                        className="inputContainer__input"
                        type="text"
                        id="avatar"
                        name="avatar"
                        placeholder="Obrazek URL"
                        value={formValues.avatar}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form__inputContainer">
                    <label className="inputContainer__label" htmlFor="fullName">
                        Nazwa:
                    </label>
                    <input
                        className="inputContainer__input"
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="Imię i Nazwisko"
                        value={formValues.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form__textareaContainer">
                    <label className="textareaContainer__label" htmlFor="bio">
                        Opis:
                    </label>
                    <textarea
                        className="textareaContainer__input"
                        id="bio"
                        name="bio"
                        placeholder="Opis"
                        value={formValues.bio}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form__buttonContainer">
                    <button className="button success" type="submit">
                        Zapisz
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProducerAEdit;

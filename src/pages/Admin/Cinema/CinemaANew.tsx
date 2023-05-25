import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postCinemas } from "../../../services/Api";

interface DataValues {
    logo: string;
    name: string;
    description: string;
}

const CinemaANew = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState<DataValues>({
        logo: "",
        name: "",
        description: "",
    });

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
        const { logo, name, description } = formValues;
        postCinemas(logo, name, description, onSuccess, onError);
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
                    <label className="inputContainer__label" htmlFor="logo">
                        Obrazek URL
                    </label>
                    <input
                        className="inputContainer__input"
                        type="text"
                        id="logo"
                        name="logo"
                        placeholder="Obrazek URL"
                        value={formValues.logo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form__inputContainer">
                    <label className="inputContainer__label" htmlFor="name">
                        Nazwa:
                    </label>
                    <input
                        className="inputContainer__input"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nazwa"
                        value={formValues.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form__textareaContainer">
                    <label className="textareaContainer__label" htmlFor="description">
                        Opis:
                    </label>
                    <textarea
                        className="textareaContainer__input"
                        id="description"
                        name="description"
                        placeholder="Opis"
                        value={formValues.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form__buttonContainer">
                    <button className="button success" type="submit">
                        Stwórz
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CinemaANew;

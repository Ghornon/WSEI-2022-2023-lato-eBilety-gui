import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { putActors, getActorsID } from "../../../services/Api";

interface DataValues {
    profilePictureURL: string;
    fullName: string;
    bio: string;
}

const ActorAEdit = () => {
    let navigate = useNavigate();
    const { id } = useParams();

    const [isLoading, setLoading] = useState<boolean>(false);
    const [formValues, setFormValues] = useState<DataValues>({
        profilePictureURL: "",
        fullName: "",
        bio: "",
    });

    const onSuccess = ({ data }: { data: any }) => {
        console.log(data);
        navigate(-1);
    };

    const onSuccessFetch = ({ data }: { data: any }) => {
        console.log(data);
        setFormValues(data);
    };

    const onError = ({ data }: { data: any }) => {
        console.log("actor error:", data);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (!isLoading && id) {
            getActorsID(id, onSuccessFetch, onError);
            setLoading(true);
        }
    }, [formValues, isLoading, id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formValues);
        const { profilePictureURL, fullName, bio } = formValues;
        putActors(id, profilePictureURL, fullName, bio, onSuccess, onError);
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
                    <label className="inputContainer__label" htmlFor="profilePictureURL">
                        Obrazek URL
                    </label>
                    <input
                        className="inputContainer__input"
                        type="text"
                        id="profilePictureURL"
                        name="profilePictureURL"
                        placeholder="Obrazek URL"
                        value={formValues.profilePictureURL}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form__inputContainer">
                    <label className="inputContainer__label" htmlFor="fullName">
                        Imię i Nazwisko:
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
                        Bio:
                    </label>
                    <textarea
                        className="textareaContainer__input"
                        id="bio"
                        name="bio"
                        placeholder="Bio"
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

export default ActorAEdit;

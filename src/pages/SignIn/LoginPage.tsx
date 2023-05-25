import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/Api";
interface LoginFormValues {
    emailAddress: string;
    password: string;
}

const LoginPage = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState<LoginFormValues>({
        emailAddress: "",
        password: "",
    });
    const [messError, setMessError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const onSuccess = ({ data }: { data: any }) => {
        localStorage.setItem("TOKEN_USER", data);
        console.log("Token", data);
        window.location.reload();
    };

    const onError = ({ data }: { data: any }) => {
        console.log("Login error:", data);
        if (data.status === 400) {
            setMessError("Niepoprawne dane logowania.");
        }
        localStorage.clear();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formValues);
        const { emailAddress, password } = formValues;
        login(emailAddress, password, onSuccess, onError);
    };

    return (
        <div className="signPage">
            <div className="signPage__left">
                <figure className="left__image"></figure>
            </div>
            <div className="signPage__right">
                <div className="right__container">
                    <div className="container__header">
                        <h2>Witamy na eBilety,</h2>
                        <h2>Zaloguj się aby kontynuować</h2>
                    </div>
                    <div className="container__header">
                        <h4>Nie poiadasz konta</h4>
                        <button
                            className="header__button"
                            onClick={() => {
                                navigate("/Register");
                            }}
                        >
                            <u>Stwórz</u>
                        </button>
                    </div>
                    <form className="container__form" onSubmit={handleSubmit}>
                        <div className="form__containerInput">
                            <label className="containerInput__label" htmlFor="emailAddress">
                                Email:
                            </label>
                            <input
                                className="containerInput__input"
                                type="email"
                                id="emailAddress"
                                name="emailAddress"
                                placeholder="Email"
                                value={formValues.emailAddress}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form__containerInput">
                            <label className="containerInput__label" htmlFor="password">
                                Hasło:
                            </label>
                            <input
                                className="containerInput__input"
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Hasło"
                                value={formValues.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form__dropdown">{messError ? messError : null}</div>
                        <button className="form__button" type="submit">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

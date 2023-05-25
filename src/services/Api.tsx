import $ from "jquery";

const URL: string = import.meta.env.VITE_SERVICE_URL || "https://localhost:7180";

export const createAccount = (
    fullName: string,
    emailAddress: string,
    password: string,
    confirmPassword: string,
    onSuccess: (data: any) => void,
    onError: (error: any) => void
) => {
    const url = `${URL}/api/Account/Register`;

    let data: string = JSON.stringify({
        fullName: fullName,
        emailAddress: emailAddress,
        password: password,
        confirmPassword: confirmPassword,
    });

    callApi(url, data, onSuccess, onError, null);
};

export const login = (
    email: string,
    password: string,
    onSuccess: (data: any) => void,
    onError: (error: any) => void
) => {
    const url = `${URL}/api/Account/Login`;

    let data: string = JSON.stringify({ emailAddress: email, password: password });

    callApi(url, data, onSuccess, onError, {
        "Content-Type": "application/json",
    });
};

///////////////////////////////////////////////

export const getActors = (onSuccess: (data: any) => void, onError: (error: any) => void) => {
    const url = `${URL}/api/Actors`;

    callApi(url, null, onSuccess, onError, null, "GET");
};

export const getActorsID = (id: string, onSuccess: (data: any) => void, onError: (error: any) => void) => {
    const url = `${URL}/api/Actors/${id}`;

    callApi(url, null, onSuccess, onError, null, "GET");
};

export const postActors = (
    profilePictureURL: string,
    fullName: string,
    bio: string,
    onSuccess: (data: any) => void,
    onError: (error: any) => void
) => {
    const url = `${URL}/api/Actors`;
    let data: string = JSON.stringify({ profilePictureURL: profilePictureURL, fullName: fullName, bio: bio });
    let Token: any = localStorage.getItem("TOKEN_USER");
    callApi(url, data, onSuccess, onError, {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
    });
};

export const putActors = (
    id: string,
    profilePictureURL: string,
    fullName: string,
    bio: string,
    onSuccess: (data: any) => void,
    onError: (error: any) => void
) => {
    const url = `${URL}/api/Actors/${id}`;
    let data: string = JSON.stringify({ profilePictureURL: profilePictureURL, fullName: fullName, bio: bio });
    let Token: any = localStorage.getItem("TOKEN_USER");

    callApi(
        url,
        data,
        onSuccess,
        onError,
        {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Token,
        },
        "PUT"
    );
};

export const delActors = (id: string, onSuccess: (data: any) => void, onError: (error: any) => void) => {
    const url = `${URL}/api/Actors/${id}`;
    let Token: any = localStorage.getItem("TOKEN_USER");

    callApi(
        url,
        null,
        onSuccess,
        onError,
        {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Token,
        },
        "DELETE"
    );
};

///////////////////////////////////////////////

export const getCinemas = (onSuccess: (data: any) => void, onError: (error: any) => void) => {
    const url = `${URL}/api/Cinemas`;

    callApi(url, null, onSuccess, onError, null, "GET");
};

export const getCinemasID = (id: string, onSuccess: (data: any) => void, onError: (error: any) => void) => {
    const url = `${URL}/api/Cinemas/${id}`;

    callApi(url, null, onSuccess, onError, null, "GET");
};

export const postCinemas = (
    logo: string,
    name: string,
    description: string,
    onSuccess: (data: any) => void,
    onError: (error: any) => void
) => {
    const url = `${URL}/api/Cinemas`;
    let data: string = JSON.stringify({ logo: logo, name: name, description: description });
    let Token: any = localStorage.getItem("TOKEN_USER");

    callApi(url, data, onSuccess, onError, {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
    });
};

export const putCinemas = (
    id: string,
    logo: string,
    name: string,
    description: string,
    onSuccess: (data: any) => void,
    onError: (error: any) => void
) => {
    const url = `${URL}/api/Cinemas/${id}`;
    let data: string = JSON.stringify({ logo: logo, name: name, description: description });
    let Token: any = localStorage.getItem("TOKEN_USER");

    callApi(
        url,
        data,
        onSuccess,
        onError,
        {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Token,
        },
        "PUT"
    );
};

export const delCinemas = (id: string, onSuccess: (data: any) => void, onError: (error: any) => void) => {
    const url = `${URL}/api/Cinemas/${id}`;
    let Token: any = localStorage.getItem("TOKEN_USER");

    callApi(
        url,
        null,
        onSuccess,
        onError,
        {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Token,
        },
        "DELETE"
    );
};

///////////////////////////////////////////////

export const getMovies = (onSuccess: (data: any) => void, onError: (error: any) => void) => {
    const url = `${URL}/api/Movies`;

    callApi(url, null, onSuccess, onError, null, "GET");
};

export const getMoviesID = (id: string, onSuccess: (data: any) => void, onError: (error: any) => void) => {
    const url = `${URL}/api/Movies/${id}`;

    callApi(url, null, onSuccess, onError, null, "GET");
};

export const postMovies = (
    name: string,
    description: string,
    price: number,
    imageURL: string,
    startDate: string,
    endDate: string,
    movieCategory: number,
    actorsMovies: any,
    cinemaId: string,
    // cinema: {
    //     id: 3;
    //     logo: "https://www.helios.pl/img/logo.helios_ua.png";
    //     name: "Helios";
    //     description: "Kino Konesera; Kino Kobiet; Maratony filmowe; Helios dla dzieci; Kultura Dostępna; Helios na scenie; Grupy. Oferta dla firm; Helios dla szkoły; Akademia Filmowa; Kino na Temat; Kino na Temat Jr; Kino.";
    // },
    producerId: string,
    producer: any,
    onSuccess: (data: any) => void,
    onError: (error: any) => void
) => {
    const url = `${URL}/api/Movies`;
    let data: string = JSON.stringify({
        name: name,
        description: description,
        price: price,
        imageURL: imageURL,
        startDate: startDate,
        endDate: endDate,
        movieCategory: movieCategory,
        actorsMovies: actorsMovies,
        cinemaId: cinemaId,
        // cinema: {
        //     id: 3;
        //     logo: "https://www.helios.pl/img/logo.helios_ua.png";
        //     name: "Helios";
        //     description: "Kino Konesera; Kino Kobiet; Maratony filmowe; Helios dla dzieci; Kultura Dostępna; Helios na scenie; Grupy. Oferta dla firm; Helios dla szkoły; Akademia Filmowa; Kino na Temat; Kino na Temat Jr; Kino.";
        // },
        producerId: producerId,
        producer: producer,
    });
    let Token: any = localStorage.getItem("TOKEN_USER");

    callApi(url, data, onSuccess, onError, {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
    });
};

export const putMovies = (
    id: string,
    name: string,
    description: string,
    price: number,
    imageURL: string,
    startDate: string,
    endDate: string,
    movieCategory: number,
    actorsMovies: any,
    cinemaId: string,
    // cinema: {
    //     id: 3;
    //     logo: "https://www.helios.pl/img/logo.helios_ua.png";
    //     name: "Helios";
    //     description: "Kino Konesera; Kino Kobiet; Maratony filmowe; Helios dla dzieci; Kultura Dostępna; Helios na scenie; Grupy. Oferta dla firm; Helios dla szkoły; Akademia Filmowa; Kino na Temat; Kino na Temat Jr; Kino.";
    // },
    producerId: string,
    producer: any,
    onSuccess: (data: any) => void,
    onError: (error: any) => void
) => {
    const url = `${URL}/api/Movies/${id}`;
    let data: string = JSON.stringify({
        name: name,
        description: description,
        price: price,
        imageURL: imageURL,
        startDate: startDate,
        endDate: endDate,
        movieCategory: movieCategory,
        actorsMovies: actorsMovies,
        cinemaId: cinemaId,
        // cinema: {
        //     id: 3;
        //     logo: "https://www.helios.pl/img/logo.helios_ua.png";
        //     name: "Helios";
        //     description: "Kino Konesera; Kino Kobiet; Maratony filmowe; Helios dla dzieci; Kultura Dostępna; Helios na scenie; Grupy. Oferta dla firm; Helios dla szkoły; Akademia Filmowa; Kino na Temat; Kino na Temat Jr; Kino.";
        // },
        producerId: producerId,
        producer: producer,
    });
    let Token: any = localStorage.getItem("TOKEN_USER");

    callApi(
        url,
        data,
        onSuccess,
        onError,
        {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Token,
        },
        "PUT"
    );
};

export const delMovies = (id: string, onSuccess: (data: any) => void, onError: (error: any) => void) => {
    const url = `${URL}/api/Movies/${id}`;
    let Token: any = localStorage.getItem("TOKEN_USER");

    callApi(
        url,
        null,
        onSuccess,
        onError,
        {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Token,
        },
        "DELETE"
    );
};

///////////////////////////////////////////////

export const getOrders = (onSuccess: (data: any) => void, onError: (error: any) => void) => {
    const url = `${URL}/api/Orders`;
    let Token: any = localStorage.getItem("TOKEN_USER");

    callApi(
        url,
        null,
        onSuccess,
        onError,
        {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Token,
        },
        "GET"
    );
};

export const postCompleteOrder = (
    onSuccess: (data: any) => void,
    onError: (error: any) => void
) => {
    const url = `${URL}/api/CompleteOrder`;
    // let data: string = JSON.stringify({
        
    // });
    let Token: any = localStorage.getItem("TOKEN_USER");

    callApi(url, null, onSuccess, onError, {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
    });
};

///////////////////////////////////////////////

export const getProducers = (onSuccess: (data: any) => void, onError: (error: any) => void) => {
    const url = `${URL}/api/Producers`;

    callApi(url, null, onSuccess, onError, null, "GET");
};

export const getProducersID = (id: string, onSuccess: (data: any) => void, onError: (error: any) => void) => {
    const url = `${URL}/api/Producers/${id}`;

    callApi(url, null, onSuccess, onError, null, "GET");
};

export const postProducers = (
    avatar: string,
    fullName: string,
    bio: string,
    onSuccess: (data: any) => void,
    onError: (error: any) => void
) => {
    const url = `${URL}/api/Producers`;
    let data: string = JSON.stringify({
        avatar: avatar,
        fullName: fullName,
        bio: bio,
    });
    let Token: any = localStorage.getItem("TOKEN_USER");

    callApi(url, data, onSuccess, onError, {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
    });
};

export const putProducers = (
    id: string,
    avatar: string,
    fullName: string,
    bio: string,
    onSuccess: (data: any) => void,
    onError: (error: any) => void
) => {
    const url = `${URL}/api/Producers/${id}`;
    let data: string = JSON.stringify({
        avatar: avatar,
        fullName: fullName,
        bio: bio,
    });
    let Token: any = localStorage.getItem("TOKEN_USER");

    callApi(
        url,
        data,
        onSuccess,
        onError,
        {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Token,
        },
        "PUT"
    );
};

export const delProducers = (id: string, onSuccess: (data: any) => void, onError: (error: any) => void) => {
    const url = `${URL}/api/Producers/${id}`;
    let Token: any = localStorage.getItem("TOKEN_USER");

    callApi(
        url,
        null,
        onSuccess,
        onError,
        {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Token,
        },
        "DELETE"
    );
};

///////////////////////////////////////////////

export const getShoppingCart = (onSuccess: (data: any) => void, onError: (error: any) => void) => {
    const url = `${URL}/api/ShoppingCart`;

    callApi(url, null, onSuccess, onError, null, "GET");
};

export const postShoppingCart = (
    movieId: number,
    amount: number,
    onSuccess: (data: any) => void,
    onError: (error: any) => void
) => {
    const url = `${URL}/api/ShoppingCart`;
    let data: string = JSON.stringify({
        movieId: movieId,
        amount: amount,
    });
    let Token: any = localStorage.getItem("TOKEN_USER");

    callApi(url, data, onSuccess, onError, {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
    });
};

export const putShoppingCart = (
    id: string,
    movieId: string,
    amount: number,
    onSuccess: (data: any) => void,
    onError: (error: any) => void
) => {
    const url = `${URL}/api/ShoppingCart/${id}`;
    let data: string = JSON.stringify({
        movieId: movieId,
        amount: amount,
    });
    let Token: any = localStorage.getItem("TOKEN_USER");

    callApi(
        url,
        data,
        onSuccess,
        onError,
        {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Token,
        },
        "PUT"
    );
};

export const delShoppingCart = (id: string, onSuccess: (data: any) => void, onError: (error: any) => void) => {
    const url = `${URL}/api/ShoppingCart/${id}`;

    let Token: any = localStorage.getItem("TOKEN_USER");
    callApi(
        url,
        null,
        onSuccess,
        onError,
        {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Token,
        },
        "DELETE"
    );
};

///////////////////////////////////////////////

const callApi = (
    url: string,
    data: any,
    onSuccess: (data: any) => void,
    onError: (error: any) => void,
    headers: any,
    method: string = "POST"
) => {
    $.ajax({
        url: url,
        method: method,
        timeout: 0,
        headers: headers,
        data: data,
        success: (data) => {
            onSuccess({ data });
        },
        error: (data) => {
            onError({ data });
        },
    });
};

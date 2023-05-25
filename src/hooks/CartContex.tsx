import { createContext, useReducer, useContext, ReactNode } from "react";

type State = {
    myCart: any;
};

type Action = {
    type: string;
    payload: any;
};

type Dispatch = (action: Action) => void;

const SET_MY_CART = "SET_MY_CART";

const GlobalStateContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);

const initialState: State = {
    myCart: null,
};

const globalStateReducer = (state: State, action: Action): State => {
    switch (action.type) {
    case SET_MY_CART:
        return { ...state, myCart: action.payload };
    default:
        return state;
    }
};

type GlobalCartProviderProps = {
    children: ReactNode;
};

export const GlobalCartProvider = ({ children }: GlobalCartProviderProps) => {
    const [state, dispatch] = useReducer(globalStateReducer, initialState);

    return <GlobalStateContext.Provider value={{ state, dispatch }}>{children}</GlobalStateContext.Provider>;
};

const useCartState = () => {
    const context = useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error("useCartState must be used within a GlobalCartProvider");
    }

    const { state, dispatch } = context;

    const setMyCart = (myCart: any) => {
        dispatch({
            type: SET_MY_CART,
            payload: myCart,
        });
    };

    return {
        setMyCart,
        myCart: state.myCart,
    };
};

export default useCartState;

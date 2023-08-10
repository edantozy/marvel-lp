import { useEffect } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { RootState, useAppDispatch } from "../store/store";
import { login, logout } from "../store/auth";

export const useCheckAuth = () => {
    const { loginInfo, status } = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!Cookies.get("authorized")) {
            if (
                !(
                    loginInfo.id &&
                    loginInfo.email &&
                    loginInfo.date_of_birth &&
                    loginInfo.created_at &&
                    loginInfo.favorites
                )
            ) {
                dispatch(logout({ errorMessage: "" }));
            } else {
                Cookies.set(
                    "authorized",
                    JSON.stringify({
                        status: status,
                        id: loginInfo.id,
                        name: loginInfo.name,
                        email: loginInfo.email,
                        date_of_birth: loginInfo.date_of_birth,
                        created_at: loginInfo.created_at,
                        favorites: loginInfo.favorites,
                    }),
                    { expires: 7, path: "" }
                );
                dispatch(
                    login({
                        loginInfo: {
                            id: loginInfo.id,
                            email: loginInfo.email,
                            name: loginInfo.name,
                            date_of_birth: loginInfo.date_of_birth,
                            created_at: loginInfo.created_at,
                            favorites: loginInfo.favorites,
                        },
                    })
                );
            }
        } else {
            const auth = JSON.parse(Cookies.get("authorized") as string);
            dispatch(
                login({
                    loginInfo: {
                        id: auth.id,
                        email: auth.email,
                        name: auth.name,
                        date_of_birth: auth.date_of_birth,
                        created_at: auth.created_at,
                        favorites: auth.favorites,
                    },
                })
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return status;
};

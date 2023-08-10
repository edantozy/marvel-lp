import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { addFavoriteCharacter, addFavoriteComic, checkingCredentials, login, logout, removeFavoriteCharacter, removeFavoriteComic } from ".";
import { loginWithEmailPassword } from "../../services";
import { AppDispatch, RootState } from "../store";
import { IMiniCharacter, IMiniComic } from "../../fake-auth";

export const startLoginWithEmailPassword = ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    return async (dispatch: AppDispatch) => {
        dispatch(checkingCredentials());

        const result = await loginWithEmailPassword(email, password);
        if (!result.success) {
            dispatch(logout({
                errorMessage: result.errorMessage || "Error",
            }))
            return toast.error(result.errorMessage || "Ha ocurrido un error");
        }

        Cookies.set(
            "authorized",
            JSON.stringify({
                id: result.data?.id,
                name: result.data?.name,
                email: result.data?.email,
                ["date_of_birth"]: result.data?.["date_of_birth"],
                ["created_at"]: result.data?.["created_at"],
                ["favorites"]: result.data?.["favorites"],
            }),
            { expires: 7, path: "" }
        );
        dispatch(login({
            loginInfo: {
                id: result.data?.id.toString() || "",
                name: result.data?.name || "",
                email: result.data?.email || "",
                ["date_of_birth"]: result.data?.["date_of_birth"] || "",
                ["created_at"]: result.data?.["created_at"] || "",
                ["favorites"]: result.data?.["favorites"] || {
                    characters: [],
                    comics: [],
                },
            },
        }));
    };
};

export const startAddFavoriteCharacter = (character: IMiniCharacter) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { auth } = getState();
        const favCharArr = JSON.parse(JSON.stringify(auth.loginInfo.favorites.characters));
        favCharArr.push(character);
        dispatch(addFavoriteCharacter({
            id: character.id,
            name: character.name,
            thumbnail: character.thumbnail,
        }));
        toast.success("Personaje agregado a favoritos");
        /* Cookies.set("authorized", JSON.stringify({
            id: auth.loginInfo.id,
            name: auth.loginInfo.name,
            email: auth.loginInfo.email,
            ["date_of_birth"]: auth.loginInfo["date_of_birth"],
            ["created_at"]: auth.loginInfo["created_at"],
            ["favorites"]: {
                characters: favCharArr,
                comics: auth.loginInfo.favorites.comics,
            }
        }), { expires: 7, path: "" }); */
    };
};

export const startRemoveFavoriteCharacter = (id: number) => {
    return async (dispatch: AppDispatch) => {
        const auth = JSON.parse(Cookies.get("authorized") as string);
        auth.favorites.characters = auth.favorites.characters.filter(
            (character: IMiniCharacter) => character.id !== id
        );
        // Cookies.set("authorized", JSON.stringify(auth), { expires: 7, path: "" });
        dispatch(removeFavoriteCharacter({
            id,
        }));
        toast.success("Personaje eliminado de favoritos");
    };
};

export const startAddFavoriteComic = (comic: IMiniComic) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { auth } = getState();
        const favComicsArr = JSON.parse(JSON.stringify(auth.loginInfo.favorites.characters));
        favComicsArr.push(comic);
        dispatch(addFavoriteComic({
            id: comic.id,
            title: comic.title,
            thumbnail: comic.thumbnail,
        }));
        toast.success("Comic agregado a favoritos");
        /* Cookies.set("authorized", JSON.stringify({
            id: auth.loginInfo.id,
            name: auth.loginInfo.name,
            email: auth.loginInfo.email,
            ["date_of_birth"]: auth.loginInfo["date_of_birth"],
            ["created_at"]: auth.loginInfo["created_at"],
            ["favorites"]: {
                comics: favComicsArr,
                characters: auth.loginInfo.favorites.characters,
            }
        }), { expires: 7, path: "" }); */
    };
};

export const startRemoveFavoriteComic = (id: number) => {
    return async (dispatch: AppDispatch) => {
        const auth = JSON.parse(Cookies.get("authorized") as string);
        auth.favorites.comics = auth.favorites.comics.filter(
            (comic: IMiniComic) => comic.id !== id
        );
        // Cookies.set("authorized", JSON.stringify(auth), { expires: 7, path: "" });
        dispatch(removeFavoriteComic({
            id,
        }));
        toast.success("Comic eliminado de favoritos");
    };
};

export const startLogout = () => {
    return async (dispatch: AppDispatch) => {
        Cookies.remove("authorized");
        dispatch(logout({
            errorMessage: "",
        }));
    };
};
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { GenericCard } from "../../ui/components";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { startAddFavoriteComic, startRemoveFavoriteComic } from "../../store/auth/thunks";
import { IMiniComic } from "../../fake-auth";

interface IProps {
    comic: IMiniComic;
}

export const ComicCard: FC<IProps> = ({ comic }) => {
    const { loginInfo } = useSelector((state: RootState) => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleSeeDetails = (id: number) => {
        navigate(`/comics/${id}`)
    }

    const handleAddFavorite = (comic: IMiniComic) => {
        dispatch(startAddFavoriteComic(comic))
    }

    const handleRemoveFavorite = (comic: IMiniComic) => {
        dispatch(startRemoveFavoriteComic(comic.id))
    }
    return (
        <GenericCard
            key={comic.id}
            shouldDisplayHeart={loginInfo?.favorites?.comics?.find((fav) => fav.id === comic.id)
                ? true : false}
            handleAddFavorite={() => handleAddFavorite(comic)}
            handleRemoveFavorite={() => handleRemoveFavorite(comic)}
            handleSeeDetails={() => handleSeeDetails(comic.id)}
            altImage={comic.title}
            name={comic.title}
            srcImage={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        />
    )
}

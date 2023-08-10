import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { startAddFavoriteCharacter, startRemoveFavoriteCharacter } from "../../store/auth/thunks";
import { GenericCard } from "../../ui/components";
import { IMiniCharacter } from "../../fake-auth";

interface IProps {
    character: IMiniCharacter;
}

export const CharacterCard: FC<IProps> = ({ character }) => {
    const { loginInfo } = useSelector((state: RootState) => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleSeeDetails = (id: number) => {
        navigate(`/characters/${id}`)
    }

    const handleAddFavorite = (char: IMiniCharacter) => {
        dispatch(startAddFavoriteCharacter(char))
    }

    const handleRemoveFavorite = (char: IMiniCharacter) => {
        dispatch(startRemoveFavoriteCharacter(char.id))
    }

    return (
        <GenericCard
            key={character.id}
            shouldDisplayHeart={loginInfo?.favorites?.characters?.find((fav) => fav.id === character.id)
                ? true : false}
            handleAddFavorite={() => handleAddFavorite(character)}
            handleRemoveFavorite={() => handleRemoveFavorite(character)}
            handleSeeDetails={() => handleSeeDetails(character.id)}
            altImage={character.name}
            name={character.name}
            srcImage={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        />
    )
}

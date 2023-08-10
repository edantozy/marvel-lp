import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { faHeartCirclePlus, faHeart } from "@fortawesome/free-solid-svg-icons"
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
    shouldDisplayHeart: boolean;
    handleRemoveFavorite: () => void;
    handleAddFavorite: () => void;
    absolute?: boolean;
}

export const FavoriteButton: FC<IProps> = ({ shouldDisplayHeart, handleRemoveFavorite, handleAddFavorite, absolute = true }) => {
    const { status } = useSelector((state: RootState) => state.auth)
    return (
        <>
            {
                status === 'authenticated' && (
                    <div className={`${absolute ? 'absolute' : ''} top-3 right-3 z-10`}>
                        {
                            shouldDisplayHeart ? (
                                <button onClick={handleRemoveFavorite}>
                                    <FontAwesomeIcon color="#F4564F" icon={faHeart} />
                                </button>
                            ) : (
                                <button onClick={handleAddFavorite}>
                                    <FontAwesomeIcon icon={faHeartCirclePlus} />
                                </button>
                            )
                        }
                    </div>
                )
            }
        </>
    )
}

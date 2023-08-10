import { FC } from 'react'
import { Button, Card, CardFooter, Image } from '@nextui-org/react'
import { FavoriteButton } from '.'

interface IProps {
    altImage: string;
    srcImage: string;
    name: string;
    shouldDisplayHeart: boolean;
    handleSeeDetails: () => void;
    handleAddFavorite: () => void;
    handleRemoveFavorite: () => void;
}

export const GenericCard: FC<IProps> = ({ altImage, shouldDisplayHeart, name, srcImage, handleAddFavorite, handleRemoveFavorite, handleSeeDetails }) => {

    return (
        <Card isFooterBlurred className="col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-6 h-[300px]" >
            <FavoriteButton
                handleAddFavorite={handleAddFavorite}
                handleRemoveFavorite={handleRemoveFavorite}
                shouldDisplayHeart={shouldDisplayHeart}
            />
            <Image
                removeWrapper
                alt={altImage}
                className="z-0 w-full h-full object-cover"
                src={srcImage}
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                    <Image
                        alt={altImage}
                        className="rounded-full w-10 h-10 bg-black"
                        src={srcImage}
                    />
                    <p className="text-white/90 font-medium text-md">{name}</p>
                </div>
                <Button radius="full" size="sm" onClick={handleSeeDetails}>Ver información</Button>
            </CardFooter>
        </Card >
    )
}

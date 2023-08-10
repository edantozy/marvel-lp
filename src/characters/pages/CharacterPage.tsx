import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Card, CardBody, Image, Tab, Tabs } from "@nextui-org/react";
import { MainLayout } from "../../layouts/MainLayout"
import { useFetchCharacter } from "../../hooks";
import { NotFoundPage } from "../../ui/pages";
import { FavoriteButton } from "../../ui/components";
import { IMiniCharacter } from "../../fake-auth";
import { startAddFavoriteCharacter, startRemoveFavoriteCharacter } from "../../store/auth/thunks";
import { RootState, useAppDispatch } from "../../store/store";


export const CharacterPage = () => {
    const { id } = useParams<{ id: string }>();
    const { character, error } = useFetchCharacter(id || '');
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const { loginInfo, status } = useSelector((state: RootState) => state.auth)

    if (error) {
        return <NotFoundPage />
    }

    const handleCardPress = (url: string) => {
        const id = url.split('/').pop();
        navigate(`/comics/${id}`);

    }

    const handleAddFavorite = (char: IMiniCharacter) => {
        dispatch(startAddFavoriteCharacter(char))
    }

    const handleRemoveFavorite = (char: IMiniCharacter) => {
        dispatch(startRemoveFavoriteCharacter(char.id))
    }

    return (
        <MainLayout>
            <>
                <h1 className="text-4xl font-bold text-center p-8">{character?.name}</h1>
                <div className="f-full flex items-center flex-col">
                    <div className="max-w-lg">
                        <Image
                            className="flex items-center justify-center"
                            src={`${character?.thumbnail.path}.${character?.thumbnail.extension}`}
                            alt={character?.name}
                        />
                    </div>
                    {
                        status === 'authenticated' && (
                            <div className="flex w-full items-center justify-center">
                                <p className="p-5">
                                    Añadir a favoritos
                                </p>
                                <div className="flex bg-purple-900 p-5 items-center justify-center rounded-full w-5 h-5">
                                    <FavoriteButton
                                        absolute={false}
                                        handleAddFavorite={() => handleAddFavorite(character as IMiniCharacter)}
                                        handleRemoveFavorite={() => handleRemoveFavorite(character as IMiniCharacter)}
                                        shouldDisplayHeart={loginInfo?.favorites?.characters?.find((fav) => fav.id === character?.id)
                                            ? true : false}
                                    />
                                </div>
                            </div>
                        )
                    }
                    <div className="flex flex-col items-center justify-center p-8">
                        <p className="text-white/90 font-medium text-lg">{character?.description}</p>
                        <p className="text-white/90 font-medium text-md">Última actualización: <label className="text-sky-200">{character?.modified}</label></p>
                    </div>
                </div>
                <Tabs aria-label="Options" color="primary" className="flex items-center justify-center w-full">
                    <Tab key="comics" title="Comics">
                        <div className="col-span-12 lg:col-span-9 md:col-span-8 sm:col-span-6">
                            <h2 className="text-2xl font-bold text-center p-8">Comics</h2>
                            <div className="grid grid-cols-12 gap-4">
                                {character?.comics.items.map(comic => (
                                    <div key={comic.resourceURI} className="col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-6">
                                        <Card className="min-h-[100px] w-full" isPressable onPress={() => handleCardPress(comic?.resourceURI)}>
                                            <CardBody>
                                                <p className="text-white/90 font-medium text-md">{comic.name}</p>
                                            </CardBody>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Tab>
                    <Tab key="series" title="Series">
                        <div className="col-span-12 lg:col-span-9 md:col-span-8 sm:col-span-6">
                            <h2 className="text-2xl font-bold text-center p-8">Series</h2>
                            <div className="grid grid-cols-12 gap-4">
                                {character?.series.items.map(serie => (
                                    <div key={serie.resourceURI} className="col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-6">
                                        <Card className="min-h-[100px]">
                                            <CardBody>
                                                <p className="text-white/90 font-medium text-md">{serie.name}</p>
                                            </CardBody>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Tab>
                    <Tab key="stories" title="Historias">
                        <div className="col-span-12 lg:col-span-9 md:col-span-8 sm:col-span-6">
                            <h2 className="text-2xl font-bold text-center p-8">Historias</h2>
                            <div className="grid grid-cols-12 gap-4">
                                {character?.stories.items.map(story => (
                                    <div key={story.resourceURI} className="col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-6">
                                        <Card className="min-h-[100px]">
                                            <CardBody>
                                                <p className="text-white/90 font-medium text-md">{story.name}</p>
                                            </CardBody>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Tab>
                    <Tab key="events" title="Eventos">
                        <div className="col-span-12 lg:col-span-9 md:col-span-8 sm:col-span-6">
                            <h2 className="text-2xl font-bold text-center p-8">Eventos</h2>
                            <div className="grid grid-cols-12 gap-4">
                                {character?.events.items.map(event => (
                                    <div className="col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-6">
                                        <Card key={event.resourceURI} className="min-h-[100px]">
                                            <CardBody>
                                                <p className="text-white/90 font-medium text-md">{event.name}</p>
                                            </CardBody>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </>
        </MainLayout>
    )
}

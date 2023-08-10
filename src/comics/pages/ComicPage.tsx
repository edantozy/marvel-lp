import { MainLayout } from "../../layouts/MainLayout"
import { useFetchComic } from "../../hooks";
import { useParams } from "react-router-dom";
import { NotFoundPage } from "../../ui/pages";
import { Image, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { FavoriteButton } from "../../ui/components";
import { RootState, useAppDispatch } from "../../store/store";
import { startAddFavoriteComic, startRemoveFavoriteComic } from "../../store/auth/thunks";
import { IMiniComic } from "../../fake-auth";
import { useSelector } from "react-redux";


export const ComicPage = () => {
    const { id } = useParams<{ id: string }>();
    const { comic, error } = useFetchComic(id || '');
    const { loginInfo, status } = useSelector((state: RootState) => state.auth)
    const dispatch = useAppDispatch()

    if (error) {
        return <NotFoundPage />
    }

    const handleAddFavorite = (comic: IMiniComic) => {
        dispatch(startAddFavoriteComic(comic))
    }

    const handleRemoveFavorite = (comic: IMiniComic) => {
        dispatch(startRemoveFavoriteComic(comic.id))
    }

    return (
        <MainLayout>
            <>
                <h1 className="text-4xl font-bold text-center p-8">{comic?.title}</h1>
                <div className="grid grid-cols-12 gap-4">
                    <div className="f-full flex items-center flex-col justify-center col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-6">
                        <div className="max-w-lg">
                            <Image
                                className="flex items-center justify-center"
                                src={`${comic?.thumbnail.path}.${comic?.thumbnail.extension}`}
                                alt={comic?.title}
                            />
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-9 md:col-span-8 sm:col-span-6">
                        {
                            status === 'authenticated' && (
                                <div className="flex w-full items-center">
                                    <p className="p-5">
                                        Añadir a favoritos
                                    </p>
                                    <div className="flex bg-purple-900 p-5 items-center justify-center rounded-full w-5 h-5">
                                        <FavoriteButton
                                            absolute={false}
                                            handleAddFavorite={() => handleAddFavorite(comic as IMiniComic)}
                                            handleRemoveFavorite={() => handleRemoveFavorite(comic as IMiniComic)}
                                            shouldDisplayHeart={loginInfo?.favorites?.comics?.find((fav) => fav.id === comic?.id)
                                                ? true : false}
                                        />
                                    </div>
                                </div>
                            )
                        }
                        <Table hideHeader aria-label="Example static collection table">
                            <TableHeader>
                                <TableColumn>NAME</TableColumn>
                                <TableColumn>VALUE</TableColumn>
                            </TableHeader>
                            <TableBody>
                                <TableRow key="1">
                                    <TableCell>Título</TableCell>
                                    <TableCell>{comic?.title}</TableCell>
                                </TableRow>
                                <TableRow key="2">
                                    <TableCell>Descripción</TableCell>
                                    <TableCell>{comic?.description}</TableCell>
                                </TableRow>
                                <TableRow key="3">
                                    <TableCell>ISBN</TableCell>
                                    <TableCell>{comic?.isbn}</TableCell>
                                </TableRow>
                                <TableRow key="4">
                                    <TableCell>UPC</TableCell>
                                    <TableCell>{comic?.upc}</TableCell>
                                </TableRow>
                                <TableRow key="5">
                                    <TableCell>Diamond Code</TableCell>
                                    <TableCell>{comic?.diamondCode}</TableCell>
                                </TableRow>
                                <TableRow key="6">
                                    <TableCell>EAN</TableCell>
                                    <TableCell>{comic?.ean}</TableCell>
                                </TableRow>
                                <TableRow key="7">
                                    <TableCell>ISSN</TableCell>
                                    <TableCell>{comic?.issn}</TableCell>
                                </TableRow>
                                <TableRow key="8">
                                    <TableCell>Formato</TableCell>
                                    <TableCell>{comic?.format}</TableCell>
                                </TableRow>
                                <TableRow key="9">
                                    <TableCell>Última actualización</TableCell>
                                    <TableCell>{comic?.modified}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </>
        </MainLayout>
    )
}

import { Navigate, Route, Routes } from 'react-router-dom'
import { Spacer, Spinner } from '@nextui-org/react'
import { Navbar } from '../ui/components'
import { NotFoundPage } from '../ui/pages'
import { CharacterPage, CharactersPage } from '../characters/pages'
import { ComicPage, ComicsPage } from '../comics/pages'
import { useCheckAuth } from '../hooks/useCheckAuth'
import { ProfilePage } from '../profile/pages'
import { FavoritesPage } from '../favorites/pages'

export const AppRouter = () => {
    const status = useCheckAuth();

    if (status === "checking") {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Spinner color="primary" />
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div>
                <Routes>
                    <Route path="/" element={<Navigate to="/characters" />} />
                    <Route path="characters" element={<CharactersPage />} />
                    <Route path="characters/:id" element={<CharacterPage />} />
                    <Route path="comics" element={<ComicsPage />} />
                    <Route path="comics/:id" element={<ComicPage />} />
                    {
                        status === 'authenticated' ? (
                            <>
                                <Route path="profile" element={<ProfilePage />} />
                                <Route path="favorites" element={<FavoritesPage />} />
                            </>
                        ): (
                            <>
                                <Route path="profile" element={<Navigate to="/characters" />} />
                                <Route path="favorites" element={<Navigate to="/characters" />} />
                            </>
                        )
                    }
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
            <Spacer y={2} />
        </>
    )
}

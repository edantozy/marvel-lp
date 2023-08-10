import { useState } from "react"
import { Button, Input, Pagination } from "@nextui-org/react"
import { useFetchComics } from "../../hooks"
import { ComicCard, ComicSkeletonCard } from "."
import { useLocalStorage } from "../../hooks/useLocalStorage"

export const ComicsList = () => {
    const [inputValue, setInputValue] = useLocalStorage('comics-search', "");
    const { comics, loading, setOffset, total, setSearch } = useFetchComics(inputValue)

    const [page, setPage] = useState(1 as number)

    const handlePaginationChange = (page: number) => {
        setPage(page)
        setOffset((page - 1) * 12)
    }

    const handleSearch = () => {
        setOffset(0)
        setPage(1)
        setSearch(inputValue)
    }

    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    const handleClearSearch = () => {
        setSearch('')
        setInputValue('')
        setPage(1)
        handlePaginationChange(1)
    }

    return (
        <div>
            <div className="p-2 flex items-end  max-w-[600px] mx-auto">
                <Input
                    value={inputValue}
                    onChange={
                        (e) => setInputValue(e.target.value)
                    }
                    size="sm"
                    type="text"
                    label="Búsqueda por nombre"
                    onKeyDown={handleEnterPress}
                />
                <Button className="ml-2 h-12" onClick={handleSearch} color="primary">Buscar</Button>
                <Button className="ml-2 h-12" onClick={handleClearSearch}>Limpiar</Button>
            </div>
            <div className="p-8 flex justify-center">
                <Pagination page={page} total={Math.ceil(total / 12)} initialPage={1} onChange={handlePaginationChange} />
            </div>
            <div className="gap-2 grid grid-cols-12 grid-rows-2 px-8">
                {
                    loading ? Array(12).fill(0).map((_, i) => (
                        <ComicSkeletonCard key={i} />
                    )) : comics.length === 0 ? <p>No hay personajes</p> :
                        comics.map(comic => (
                            <ComicCard key={comic.id} comic={comic} />
                        ))
                }
            </div>
            <div className="p-8 flex justify-center">
                <Pagination page={page} total={Math.ceil(total / 12)} initialPage={1} onChange={handlePaginationChange} />
            </div>
        </div>
    )
}

import { MainLayout } from "../../layouts/MainLayout"
import { CharactersList } from "../components"

export const CharactersPage = () => {
  return (
    <MainLayout>
      <h1 className="text-4xl font-bold text-center p-8">Personajes</h1>
      <CharactersList />
    </MainLayout>
  )
}

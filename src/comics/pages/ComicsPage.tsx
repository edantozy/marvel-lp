import { MainLayout } from "../../layouts/MainLayout"
import { ComicsList } from "../components"

export const ComicsPage = () => {
  return (
    <MainLayout>
      <h1 className="text-4xl font-bold text-center p-8">Comics</h1>
      <ComicsList />
    </MainLayout>
  )
}

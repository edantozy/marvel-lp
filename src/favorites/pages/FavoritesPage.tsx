import { useSelector } from "react-redux"
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react"
import { MainLayout } from "../../layouts/MainLayout"
import { RootState } from "../../store/store"
import { CharacterCard } from "../../characters/components"
import { ComicCard } from "../../comics/components"

export const FavoritesPage = () => {
  const { loginInfo } = useSelector((state: RootState) => state.auth)
  return (
    <MainLayout>
      <h1 className="text-4xl font-bold text-center p-8">Favoritos</h1>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" color="primary">
          <Tab key="characters" title="Personajes">
            <Card>
              <CardBody>
                {
                  loginInfo?.favorites?.characters?.length === 0 ? (
                    <Card>No tienes personajes favoritos</Card>
                  ) : (
                    <div className="gap-2 grid grid-cols-12 grid-rows-2 px-8">
                      {loginInfo?.favorites?.characters?.map((character) => (
                        <CharacterCard key={character.id} character={character} />
                      ))}
                    </div>
                  )
                }
              </CardBody>
            </Card>
          </Tab>
          <Tab key="comics" title="Comics">
            <Card>
              <CardBody>
                {
                  loginInfo?.favorites?.comics?.length === 0 ? (
                    <Card>No tienes comics favoritos</Card>
                  ) : (
                    <div className="gap-2 grid grid-cols-12 grid-rows-2 px-8">
                      {loginInfo?.favorites?.comics?.map((comic) => (
                        <ComicCard key={comic.id} comic={comic} />
                      ))}
                    </div>
                  )
                }
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </MainLayout>
  )
}

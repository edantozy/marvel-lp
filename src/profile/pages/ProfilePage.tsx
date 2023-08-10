import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { MainLayout } from "../../layouts/MainLayout"
import { RootState } from "../../store/store"
import { useSelector } from "react-redux"

export const ProfilePage = () => {
    const { loginInfo } = useSelector((state: RootState) => state.auth)

    return (
        <MainLayout>
            <h1 className="text-4xl font-bold text-center p-8">Perfil</h1>
            <Table hideHeader aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>VALUE</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell>Nombre</TableCell>
                        <TableCell>{loginInfo?.name}</TableCell>
                    </TableRow>
                    <TableRow key="2">
                        <TableCell>Email</TableCell>
                        <TableCell>{loginInfo?.email}</TableCell>
                    </TableRow>
                    <TableRow key="3">
                        <TableCell>Fecha de nacimiento</TableCell>
                        <TableCell>{loginInfo.date_of_birth}</TableCell>
                    </TableRow>
                    <TableRow key="4">
                        <TableCell>Fecha de creación</TableCell>
                        <TableCell>{loginInfo.created_at}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </MainLayout>
    )
}

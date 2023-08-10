import { Link } from "@nextui-org/react"
import { MainLayout } from "../../layouts/MainLayout"

export const NotFoundPage = () => {
    return (
        <MainLayout>
            {/* TailwindCSS center vertical elements */}
            <div className="flex flex-col justify-center items-center" style={{ minHeight: '90vh' }}>
                <h1 className="text-9xl font-bold text-amber-400" style={{ textAlign: 'center' }}>404</h1>
                <h2 style={{ textAlign: 'center' }}>Parece que la página a la que intentas acceder no existe</h2>
                <Link href="/" style={{ display: 'block', textAlign: 'center' }}>Ir a la página de inicio</Link>
            </div>
        </MainLayout>
    )
}

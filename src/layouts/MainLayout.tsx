import { FC } from "react";

interface IProps {
    children: React.ReactNode;
}

export const MainLayout: FC<IProps> = ({ children }) => {
    return (
        <div className="container mx-auto px-4">
            {children}
        </div>
    )
}

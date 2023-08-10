import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from '@nextui-org/react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store/store'
import { useNavigate } from 'react-router-dom'
import { startLogout } from '../../store/auth/thunks'

export const UserAuthenticated = () => {
    const { loginInfo } = useSelector((state: RootState) => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleSeeProfile = () => {
        navigate('/profile')
    }

    const handleLogOut = () => {
        dispatch(startLogout())
    }

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <User
                    className="cursor-pointer"
                    name={loginInfo?.name}
                    description={loginInfo?.email}
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="see-profile" onPress={handleSeeProfile} >
                    Ver perfil
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onPress={handleLogOut}>
                    Cerrar sesión
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

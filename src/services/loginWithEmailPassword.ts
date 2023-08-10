import { IUser } from '../fake-auth'
import data from '../fake-auth/data.json'

export async function loginWithEmailPassword(email: string, password: string) {
    const user = data.find((user: IUser) => user.email === email && user.password === password)

    if (!user) {
        return {
            success: false,
            errorMessage: 'Usuario o contraseña incorrectos'
        }
    }
    return {
        success: true,
        data: user
    }
}
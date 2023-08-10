import { FC } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import { useAppDispatch } from "../../store/store";
import { startLoginWithEmailPassword } from "../../store/auth/thunks";

interface IProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

interface IFields {
    email: string;
    password: string;
}

export const LoginModal: FC<IProps> = ({ isOpen, onOpenChange }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFields>();
    const dispatch = useAppDispatch();
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validateEmail = (value: string) => {
        if (emailRegex.test(value)) {
            return true;
        } else {
            return "El email no es válido";
        }
    };

    const onsubmit = handleSubmit((data) => {
        dispatch(startLoginWithEmailPassword({
            email: data.email,
            password: data.password
        }));
    });

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Ingresa tus datos para iniciar sesión</ModalHeader>
                        <ModalBody>
                            <hr className="border-gray-300" />
                            <div className="flex flex-col gap-2">
                                <form className="flex flex-col gap-2" onSubmit={onsubmit}>
                                    <p className="text-gray-800">Correo electrónico</p>
                                    <input
                                        type="text"
                                        placeholder="Correo electrónico"
                                        className="border-2 border-gray-300 rounded-md p-2"
                                        {...register("email", {
                                            required: "El correo electrónico es requerido",
                                            validate: validateEmail
                                        })}
                                    />
                                    <label className="text-red-500">{errors.email?.message}</label>
                                    <p className="text-gray-800">Contraseña</p>
                                    <input
                                        type="password"
                                        placeholder="Contraseña"
                                        className="border-2 border-gray-300 rounded-md p-2"
                                        {...register("password", { required: "La contraseña es requerida" })}
                                    />
                                    <label className="text-red-500">{errors.password?.message}</label>
                                    <Button type="submit" color="primary">Iniciar sesión</Button>
                                </form>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" onPress={onClose}>
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

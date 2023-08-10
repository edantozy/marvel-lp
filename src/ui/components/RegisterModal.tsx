import { FC } from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"

interface IProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export const RegisterModal: FC<IProps> = ({ isOpen, onOpenChange }) => {

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Crea una nueva cuenta</ModalHeader>
                        <ModalBody>
                            <hr className="border-gray-300" />
                            <div className="flex flex-col gap-2">
                                <form className="flex flex-col gap-2">
                                    <p className="text-gray-800">Nombre completo</p>
                                    <input type="text" placeholder="Nombre" className="border-2 border-gray-300 rounded-md p-2" />
                                    <p className="text-gray-800">Fecha de nacimiento</p>
                                    <input type="date" placeholder="Fecha de nacimiento" className="border-2 border-gray-300 rounded-md p-2" />
                                    <p className="text-gray-800">Correo electrónico</p>
                                    <input type="text" placeholder="Correo electrónico" className="border-2 border-gray-300 rounded-md p-2" />
                                    <p className="text-gray-800">Contraseña</p>
                                    <input type="password" placeholder="Contraseña" className="border-2 border-gray-300 rounded-md p-2" />
                                    <Button color="primary">Registrarse</Button>
                                </form>
                            </div>
                            <p className="text-gray-800 text-center">Al registrarte, aceptas nuestras Condiciones de uso y Política de privacidad.</p>
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

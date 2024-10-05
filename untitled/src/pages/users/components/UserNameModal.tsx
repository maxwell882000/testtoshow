import {
    Button, Checkbox,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Stack,
    useDisclosure,
    Text
} from "@chakra-ui/react";
import React, {useState} from "react";
import {useUnit} from "effector-react";
import {$collectUserActivityChanged} from "../../../states/auth/events.ts";
import {UserDto} from "../../../dtos/user/userDto.ts";

interface UserNameModalProps {
    user: UserDto;
}

function UserNameModal({user}: UserNameModalProps) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const setUserActivityChanged = useUnit($collectUserActivityChanged);
    const [isChecked, setIsChecked] = useState<boolean>(user.isActive);

    const onSubmit = () => {
        setUserActivityChanged({...user, isActive: isChecked});
        onClose();
    };

    return (
        <>
            <Button variant="link" colorScheme="teal" onClick={onOpen}>
                {user.userName}
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Change {user?.userName} activity status</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Stack spacing={4}>
                            <Checkbox defaultChecked={user?.isActive} onChange={(value) => {
                                setIsChecked(value.target.checked);
                            }}> Active</Checkbox>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onSubmit} colorScheme="teal" size="lg" w="full">
                            Ok
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default UserNameModal

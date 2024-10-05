import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from "@chakra-ui/react";
import { useUnit } from "effector-react";
import { $isLogOutLoading, $logOut } from "../../../states/auth/stores.ts";
import { $closeLogOut } from "../../../states/auth/events.ts";
import { $logOutFx } from "../../../states/auth/effects.ts";

function LogOut() {
  const [logOut, closeLogOut, logOutFx, logOutLoading] = useUnit([$logOut, $closeLogOut, $logOutFx, $isLogOutLoading]);
  return <Modal isOpen={logOut} onClose={closeLogOut} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Log Out</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>Would you like to log out?</Text>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="red" mr={3} onClick={logOutFx} isLoading={logOutLoading}>
          Yes
        </Button>
        <Button variant="ghost" onClick={closeLogOut}>
          No
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>;
}

export default LogOut;

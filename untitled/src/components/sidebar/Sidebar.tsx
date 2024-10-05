import {Box, Button, Text, VStack} from "@chakra-ui/react";
import {FaCog, FaSignOutAlt, FaTachometerAlt, FaUser, FaUserAlt} from "react-icons/fa";
import {useUnit} from "effector-react";
import {$pageChanged} from "../../states/routing/events.ts";
import {Pages} from "../../dtos/routing/page.ts";
import {$logOutFx} from "../../states/auth/effects.ts";
import LogOut from "./modal/LogOut.tsx";
import {$askLogOut} from "../../states/auth/events.ts";

interface Props {
    isOpen: boolean;
}

function Sidebar({isOpen}: Props) {
    const [pageChanged, askLogOut] = useUnit([$pageChanged, $askLogOut]);
    const items = [
        {
            text: "Users",
            action: () => pageChanged(Pages.USERS),
            icon: <FaUserAlt/>
        },
        {
            text: "Welcome",
            action: () => pageChanged(Pages.WELCOME),
            icon: <FaTachometerAlt/>
        },
        {
            text: "Log out",
            icon: <FaSignOutAlt/>,
            action: () => askLogOut()
        }
    ];
    return <Box
        as="aside"
        className={`bg-white text-gray-800 p-4 shadow-lg transition-transform duration-300 ease-in-out fixed top-0 left-0 h-full ${isOpen ? "translate-x-0" : "-translate-x-full"} w-64`}
        zIndex="1000"
    >
        <LogOut/>
        <VStack spacing={6} align="start">
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                Menu
            </Text>

            {items.map((item) => (<Button
                onClick={item.action}
                key={`side-bar-${item.text}`}
                variant="solid"
                colorScheme="teal"
                justifyContent={"flex-start"}
                leftIcon={item.icon}
                width="full"
                borderRadius="md"
                boxShadow="sm"
                _hover={{bg: "teal.500", transform: "scale(1.05)", boxShadow: "md"}}
                _active={{bg: "teal.600", boxShadow: "lg"}}
                transition="all 0.2s"
            >
                {item.text}
            </Button>))}
        </VStack>
    </Box>;
}

export default Sidebar;

import {
    Box, Button, Flex, Heading, IconButton, useDisclosure, VStack, Text
} from "@chakra-ui/react";
import {HamburgerIcon} from "@chakra-ui/icons";
import {FaTachometerAlt, FaUser, FaCog, FaSignOutAlt} from "react-icons/fa"; // Import icons from React Icons
import {ReactNode} from "react";
import Sidebar from "../sidebar/Sidebar.tsx";
import {$isSideBarOpen} from "../../states/common/stores.ts";
import {useUnit} from "effector-react";
import {$sideBarToggle} from "../../states/common/events.ts";

interface Props {
    children: ReactNode;
}

function Layout({children}: Props) {
    const [isSideBarOpen, sideBarToggle] = useUnit([$isSideBarOpen, $sideBarToggle]);

    return (
        <Flex direction="column" minH="100vh">
            {/* Header */}
            <Box className="bg-white shadow-md p-4">
                <Flex justify="space-between" align="center">
                    <Heading size="lg">My App</Heading>
                    <IconButton
                        icon={<HamburgerIcon/>}
                        onClick={sideBarToggle}
                        aria-label="Toggle Sidebar"
                        variant="outline"
                    />
                </Flex>
            </Box>

            {/* Main Content */}
            <Flex flex="1" position="relative">
                {/* Sidebar */}
                <Sidebar isOpen={isSideBarOpen}/>

                {/* Content Area */}
                <Box
                    className={`flex-1 p-4 bg-gray-50 transition-all duration-300 ease-in-out ${isSideBarOpen ? "ml-64" : "ml-0"}`}
                >
                    {children}
                </Box>
            </Flex>
        </Flex>
    );
}

export default Layout;

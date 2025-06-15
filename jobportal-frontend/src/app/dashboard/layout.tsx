// Already functional
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Flex as="section" minH="100vh" bg="gray.50">
            <Sidebar />
            <Box as="main" flex="1" p={{ base: 4, md: 6, lg: 8 }} ml={{ base: 0, md: '60' }}>
                {children}
            </Box>
        </Flex>
    );
}

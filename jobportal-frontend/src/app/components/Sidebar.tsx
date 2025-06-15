'use client';

import {
    Box,
    VStack,
    Link as ChakraLink,
    Icon,
    Text,
    Heading,
    Divider,
    Button,
    Spinner,
    useToast,
} from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiHome, FiBriefcase, FiFileText, FiUsers, FiLogOut, FiUser } from 'react-icons/fi';
import NextLink from 'next/link';
import api from '@/lib/axios';

interface UserResponse {
    id: number;
    email: string;
    role: string;
    userType: 'EMPLOYER' | 'JOB_SEEKER';
    name: string;
}

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const toast = useToast();

    const [user, setUser] = useState<UserResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast({
                title: 'Unauthorized',
                description: 'Please log in to access the dashboard.',
                status: 'warning',
            });
            router.push('/login');
            return;
        }

        const fetchUser = async () => {
            try {
                const res = await api.get('/users/me');
                setUser(res.data);
            } catch (error) {
                toast({
                    title: 'Session expired',
                    description: 'Please log in again.',
                    status: 'error',
                });
                localStorage.removeItem('token');
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router, toast]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast({ title: 'Logged out', status: 'info' });
        router.push('/login');
    };

    const commonNavItems = [
        { href: '/dashboard', label: 'Overview', icon: FiHome },
        { href: '/dashboard/profile/me', label: 'My Profile', icon: FiUser },
    ];

    const employerNav = [
        { href: '/dashboard/jobs', label: 'Jobs', icon: FiBriefcase },
        { href: '/dashboard/applications', label: 'Applications', icon: FiFileText },
        // { href: '/dashboard/users', label: 'Manage Users', icon: FiUsers },
    ];

    const jobSeekerNav = [
        { href: '/dashboard/jobs', label: 'Browse Jobs', icon: FiBriefcase },
        { href: '/dashboard/applications', label: 'My Applications', icon: FiFileText },
    ];

    const navItems = user?.userType === 'EMPLOYER'
        ? [...commonNavItems, ...employerNav]
        : [...commonNavItems, ...jobSeekerNav];

    if (loading) {
        return (
            <Box
                w="250px"
                minH="100vh"
                p={4}
                bg="gray.800"
                color="white"
                position="fixed"
            >
                <Spinner size="lg" />
            </Box>
        );
    }

    return (
        <Box
            as="nav"
            pos="fixed"
            left="0"
            h="100vh"
            w="250px"
            p={4}
            bg="gray.800"
            color="white"
            borderRight="1px solid"
            borderColor="gray.700"
        >
            <VStack align="stretch" spacing={4} h="full">
                <Box>
                    <Heading size="md" onClick={() => router.push('/dashboard')} cursor="pointer">
                        JavaCake
                    </Heading>
                </Box>

                <Divider />

                <VStack align="stretch" spacing={2} flex="1">
                    {navItems.map((item) => {
                        const isActive =
                            pathname === item.href ||
                            (item.href !== '/dashboard' && pathname?.startsWith(item.href));

                        return (
                            <ChakraLink
                                as={NextLink}
                                key={item.href}
                                href={item.href}
                                display="flex"
                                alignItems="center"
                                px={3}
                                py={2}
                                borderRadius="md"
                                fontWeight="medium"
                                bg={isActive ? 'gray.700' : 'transparent'}
                                _hover={{ bg: 'gray.600' }}
                            >
                                <Icon as={item.icon} mr={3} />
                                {item.label}
                            </ChakraLink>
                        );
                    })}
                </VStack>

                <Divider />

                <Box>
                    <Button
                        onClick={handleLogout}
                        leftIcon={<FiLogOut />}
                        variant="outline"
                        colorScheme="red"
                        size="sm"
                        width="full"
                    >
                        Logout
                    </Button>
                    <Text mt={2} fontSize="xs" color="gray.400">
                        Logged in as {user?.email}
                    </Text>
                </Box>
            </VStack>
        </Box>
    );
}

'use client';

import { Box, Heading, Text, VStack, Spinner, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

interface UserResponse {
    id: number;
    name: string;
    email: string;
    role: string;
    userType: 'EMPLOYER' | 'JOB_SEEKER';
}

export default function MyProfilePage() {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const toast = useToast();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast({ title: 'Unauthorized', status: 'warning' });
            router.push('/login');
            return;
        }

        const fetchUser = async () => {
            try {
                const res = await api.get('/users/me');
                setUser(res.data);
            } catch {
                toast({ title: 'Error fetching user data', status: 'error' });
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router, toast]);

    if (loading) {
        return (
            <Box p={6}>
                <Spinner />
            </Box>
        );
    }

    if (!user) return null;

    return (
        <Box p={6}>
            <Heading mb={4}>My Profile</Heading>
            <VStack spacing={2} align="start">
                <Text><strong>Name:</strong> {user.name}</Text>
                <Text><strong>Email:</strong> {user.email}</Text>
                <Text><strong>Role:</strong> {user.role}</Text>
                <Text><strong>User Type:</strong> {user.userType}</Text>
            </VStack>
        </Box>
    );
}

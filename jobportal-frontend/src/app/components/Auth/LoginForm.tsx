'use client';

import { Button, Input, VStack, useToast } from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/dashboard'); // or check userType first
        }
    }, []);


    const handleSubmit = async () => {
        try {
            const res = await api.post('/auth/login', { email, password });
            const token = res.data.token;

            localStorage.setItem('token', token); // Persist token
            toast({
                title: 'Login successful',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            router.push('/dashboard');
        } catch (err: any) {
            toast({
                title: 'Login failed',
                description:
                    err.response?.data || 'Invalid credentials or server error.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    };

    return (
        <VStack spacing={4}>
            <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button colorScheme="blue" onClick={handleSubmit} width="full">
                Login
            </Button>
        </VStack>
    );
}

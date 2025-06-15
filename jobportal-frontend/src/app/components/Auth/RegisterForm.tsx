'use client';

import {
    Button,
    Input,
    VStack,
    useToast,
    Select,
    Heading,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [userType, setUserType] = useState<'JOB_SEEKER' | 'EMPLOYER'>('JOB_SEEKER');

    const toast = useToast();
    const router = useRouter();

    // ✅ Redirect if already logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) router.push('/dashboard');
    }, []);

    const handleSubmit = async () => {
        try {
            const res = await api.post('/users/register', {
                email,
                password,
                fullName,
                userType,
            });

            const { token } = res.data;

            if (token) {
                localStorage.setItem('token', token);
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }

            toast({ title: 'Registration successful!', status: 'success' });

            if (userType === 'EMPLOYER') {
                router.push('/dashboard');
            } else {
                router.push('/dashboard');
            }
        } catch (err) {
            console.error(err);
            toast({
                title: 'Registration failed',
                description: 'Please check your info and try again.',
                status: 'error',
            });
        }
    };

    return (
        <VStack spacing={4}>
            <Heading size="md">Create Your Account</Heading>
            <Input placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Select value={userType} onChange={(e) => setUserType(e.target.value as 'JOB_SEEKER' | 'EMPLOYER')}>
                <option value="JOB_SEEKER">Job Seeker</option>
                <option value="EMPLOYER">Employer</option>
            </Select>
            <Button colorScheme="blue" onClick={handleSubmit}>Register</Button>
        </VStack>
    );
}

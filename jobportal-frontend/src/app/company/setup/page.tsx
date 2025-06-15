'use client';

import {
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    useToast,
    Heading,
    Box
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

export default function CompanySetupPage() {
    const [name, setName] = useState('');
    const [website, setWebsite] = useState('');
    const [industry, setIndustry] = useState('');
    const toast = useToast();
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            const res = await api.post('/companies', {
                name,
                website,
                industry
            });

            toast({ title: 'Company profile created!', status: 'success' });
            router.push('/dashboard');
        } catch (err) {
            toast({
                title: 'Setup failed',
                description: 'Something went wrong. Try again.',
                status: 'error'
            });
        }
    };

    return (
        <Box p={8}>
            <Heading mb={4}>Set Up Your Company Profile</Heading>
            <VStack spacing={4}>
                <FormControl isRequired>
                    <FormLabel>Company Name</FormLabel>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel>Website</FormLabel>
                    <Input value={website} onChange={(e) => setWebsite(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel>Industry</FormLabel>
                    <Input value={industry} onChange={(e) => setIndustry(e.target.value)} />
                </FormControl>
                <Button colorScheme="blue" onClick={handleSubmit}>
                    Create Company
                </Button>
            </VStack>
        </Box>
    );
}

'use client';

import { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Checkbox,
    useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios'

export default function PostJobPage() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        location: '',
        remote: false,
        salaryRange: '',
    });

    const toast = useToast();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // ✅ Avoid page reload

        console.log('📦 Submitting form:', form); // ✅ Confirm payload

        try {
            const res = await api.post('/jobs', form, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('✅ Job posted. Server response:', res.data);

            toast({
                title: 'Job posted successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            router.push('/jobs');
        } catch (err: any) {
            console.error('❌ Failed to post job:', err.response || err);

            toast({
                title: 'Failed to post job.',
                description: err?.response?.data?.message || 'An error occurred.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit} maxW="600px" mx="auto" mt={10}>
            <FormControl mb={4}>
                <FormLabel>Title</FormLabel>
                <Input name="title" value={form.title} onChange={handleChange} required />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel>Description</FormLabel>
                <Textarea name="description" value={form.description} onChange={handleChange} required />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel>Location</FormLabel>
                <Input name="location" value={form.location} onChange={handleChange} required />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel>Salary Range</FormLabel>
                <Input name="salaryRange" value={form.salaryRange} onChange={handleChange} />
            </FormControl>
            <FormControl mb={6}>
                <Checkbox name="remote" isChecked={form.remote} onChange={handleChange}>
                    Remote
                </Checkbox>
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">
                Post Job
            </Button>
        </Box>
    );
}

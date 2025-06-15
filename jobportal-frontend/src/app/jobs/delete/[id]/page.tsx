'use client';
import { Box, Button, Text, useToast } from '@chakra-ui/react';
import { useRouter, usePathname } from 'next/navigation';
import api from '@/lib/axios';

export default function DeleteJobPage() {
    const router = useRouter();
    const toast = useToast();
    const pathname = usePathname().split('/');
    const jobId = pathname[pathname.length - 1];

    const handleDelete = async () => {
        try {
            await api.delete(`/jobs/${jobId}`);
            toast({ title:'Job deleted', status:'info' });
            router.push('/employer/jobs');
        } catch {
            toast({ title:'Delete failed', status:'error' });
        }
    };

    return (
        <Box maxW="500px" mx="auto" mt={10} textAlign="center">
            <Text mb={6}>Are you sure?</Text>
            <Button colorScheme="red" onClick={handleDelete} mr={4}>Yes, Delete</Button>
            <Button onClick={() => router.back()}>Cancel</Button>
        </Box>
    );
}

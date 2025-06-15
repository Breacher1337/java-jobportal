'use client';

import {
    Box,
    Input,
    Textarea,
    Button,
    Checkbox,
    VStack,
    useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';

export default function PostJobPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [remote, setRemote] = useState(false);
    const [salaryRange, setSalaryRange] = useState('');
    const toast = useToast();
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            await api.post('/jobs', {
                title,
                description,
                location,
                remote,
                salaryRange,
            });
            toast({ title: 'Job posted', status: 'success' });
            router.push('/dashboard/jobs');
        } catch (err) {
            toast({ title: 'Failed to post job', status: 'error' });
        }
    };

    return (
        <Box p={8}>
            <VStack spacing={4} align="stretch">
                <Input placeholder="Job Title" value={title} onChange={e => setTitle(e.target.value)} />
                <Textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                <Input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
                <Checkbox isChecked={remote} onChange={e => setRemote(e.target.checked)}>Remote</Checkbox>
                <Input placeholder="Salary Range" value={salaryRange} onChange={e => setSalaryRange(e.target.value)} />
                <Button colorScheme="blue" onClick={handleSubmit}>Post Job</Button>
            </VStack>
        </Box>
    );
}

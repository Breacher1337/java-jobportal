'use client';
import api from '@/lib/axios';
import { useState, useEffect } from 'react';
import {useToast, Button, Heading, Text, Box} from '@chakra-ui/react';

export default function JobDetailPage({ params }) {
    const [job, setJob] = useState<any>(null);
    const toast = useToast();

    useEffect(() => {
        api.get(`/jobs/${params.id}`).then(r => setJob(r.data));
    }, [params.id]);

    const handleApply = async () => {
        try {
            await api.post(`/applications/${params.id}`);
            toast({ title: 'Application sent!', status: 'success' });
        } catch (err: any) {
            toast({ title: err.response?.data?.message || 'Failed', status: 'error' });
        }
    };

    if (!job) return <Text>Loading...</Text>;

    return (
        <Box p={8}>
            <Heading>{job.title}</Heading>
            <Text>{job.description}</Text>
            <Button mt={4} onClick={handleApply}>Apply Now</Button>
        </Box>
    );
}

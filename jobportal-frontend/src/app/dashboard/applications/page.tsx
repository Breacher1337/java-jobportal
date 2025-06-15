'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import {
    Box,
    Heading,
    VStack,
    Text,
    Spinner,
    Divider,
    Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function ApplicationsPage() {
    const [apps, setApps] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        api.get('/applications')
            .then(res => setApps(res.data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Spinner size="xl" />;

    return (
        <Box p={8}>
            <Heading mb={4}>My Applications</Heading>
            <VStack spacing={4} align="stretch">
                {apps.map(app => (
                    <Box key={app.jobId} borderWidth="1px" borderRadius="md" p={4}>
                        <Text fontSize="lg" fontWeight="bold">{app.jobTitle}</Text>
                        <Text>Company: {app.companyName}</Text>
                        <Text>Status: {app.status}</Text>
                        <Text>Applied: {new Date(app.appliedAt).toLocaleDateString()}</Text>
                        <Button mt={2} size="sm" onClick={() => router.push(`/jobs/${app.jobId}`)}>
                            View Job
                        </Button>
                    </Box>
                ))}
            </VStack>
            {apps.length === 0 && <Text>No applications yet.</Text>}

            <Button onClick={() => router.push("/dashboard")} colorScheme="teal" mb={4}>
                ← Back to Dashboard
            </Button>
        </Box>
    );
}

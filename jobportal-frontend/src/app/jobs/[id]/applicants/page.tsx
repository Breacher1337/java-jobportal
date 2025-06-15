'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/axios';
import {
    Box,
    Heading,
    Text,
    VStack,
    Spinner,
    Divider,
} from '@chakra-ui/react';

export default function ApplicantsPage() {
    const { id } = useParams();
    const [applicants, setApplicants] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/jobs/${id}/applicants`)
            .then(res => setApplicants(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    return (
        <Box p={8}>
            <Heading mb={4}>Applicants for Job</Heading>
            {loading ? (
                <Spinner />
            ) : (
                <VStack spacing={4} align="stretch">
                    {applicants.length === 0 ? (
                        <Text>No applicants yet.</Text>
                    ) : (
                        applicants.map((applicant: any) => (
                            <Box key={applicant.id} borderWidth="1px" p={4} borderRadius="md">
                                <Text fontWeight="bold">{applicant.applicantName}</Text>
                                <Text>Status: {applicant.status}</Text>
                                <Text>Applied at: {new Date(applicant.appliedAt).toLocaleString()}</Text>
                            </Box>
                        ))
                    )}
                </VStack>
            )}
        </Box>
    );
}

'use client';
import { Box, Heading, VStack, SimpleGrid, Button, HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import JobCard from './JobCard';
import api from '@/lib/axios';

interface Job {
    id: number;
    title: string;
    companyName: string;
    location: string;
    createdAt: string;
}

export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchJobs = async () => {
            const res = await api.get(`/jobs`, {
                params: {
                    page,
                    size: 6,
                },
            });
            setJobs(res.data.content);
            setTotalPages(res.data.totalPages);
        };
        fetchJobs();
    }, [page]);

    return (
        <VStack spacing={6} align="start">
            <Heading>Job Opportunities</Heading>

            {/* Commented out filtering UI for now */}
            {/* <HStack spacing={4}>
                <Input placeholder="Search by title or company" />
                <Input placeholder="Location" />
                <Button>Search</Button>
            </HStack> */}

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                {jobs.map(job => (
                    <JobCard key={job.id} {...job} />
                ))}
            </SimpleGrid>

            <HStack>
                <Button isDisabled={page === 0} onClick={() => setPage(p => p - 1)}>Previous</Button>
                <Button isDisabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>Next</Button>
            </HStack>
        </VStack>
    );
}

'use client';

import {
    Box, Heading, Text, VStack, HStack, Icon, Button,
    useColorModeValue, Center, Spinner, useToast, Divider,
} from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiMapPin, FiBriefcase, FiDollarSign, FiClock } from 'react-icons/fi';
import { FaBuilding } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import api from '@/lib/axios';

type JobDetails = {
    id: number;
    title: string;
    description: string;
    location: string;
    remote: boolean;
    salaryRange: string;
    createdAt: string;
};

export default function JobDetailsPage() {
    const { id } = useParams();
    const toast = useToast();
    const router = useRouter();

    const [job, setJob] = useState<JobDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [hasApplied, setHasApplied] = useState(false);
    const [checkingApplication, setCheckingApplication] = useState(true);

    const cardBg = useColorModeValue('white', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.400');

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await api.get(`/jobs/${id}`);
                setJob(res.data);
            } catch (err) {
                toast({
                    title: 'Error loading job',
                    description: 'Could not load job details.',
                    status: 'error',
                });
            } finally {
                setLoading(false);
            }
        };

        const checkApplication = async () => {
            try {
                const apps = await api.get('/applications');
                const alreadyApplied = apps.data.some((app: any) => app.jobId === Number(id));
                setHasApplied(alreadyApplied);
            } catch (err) {
                toast({
                    title: 'Failed to check applications',
                    description: 'You might need to log in.',
                    status: 'warning',
                });
            } finally {
                setCheckingApplication(false);
            }
        };

        fetchJob();
        checkApplication();
    }, [id, toast]);

    const handleApply = async () => {
        try {
            const res = await api.post(`/applications/${id}`);
            toast({
                title: 'Application submitted',
                description: 'You have successfully applied to this job.',
                status: 'success',
            });
            setHasApplied(true);
        } catch (err: any) {
            toast({
                title: 'Failed to apply',
                description: err.response?.data?.message || 'You may have already applied.',
                status: 'error',
            });
        }
    };

    if (loading) {
        return <Center h="80vh"><Spinner size="xl" /><Text mt={3}>Loading job details...</Text></Center>;
    }

    if (!job) {
        return <Center h="80vh"><VStack><Heading size="md" color="red.500">Error</Heading><Text>Could not load job.</Text></VStack></Center>;
    }

    return (
        <Box bg={cardBg} p={6} borderRadius="lg" shadow="md" maxW="4xl" mx="auto">
            <VStack align="start" spacing={5}>
                <Heading as="h1" size="lg">{job.title}</Heading>
                <HStack spacing={4} fontSize="sm" color={textColor}>
                    <HStack><Icon as={FaBuilding} /><Text>Unknown Company</Text></HStack>
                    <HStack><Icon as={FiMapPin} /><Text>{job.location}</Text></HStack>
                    <HStack><Icon as={FiBriefcase} /><Text>{job.remote ? 'Remote' : 'On-site'}</Text></HStack>
                    {job.salaryRange && (
                        <HStack><Icon as={FiDollarSign} /><Text>{job.salaryRange}</Text></HStack>
                    )}
                </HStack>
                <Text fontSize="xs" color={textColor}>
                    <Icon as={FiClock} mr={1} /> Posted {formatDistanceToNow(new Date(job.createdAt))} ago
                </Text>

                <Divider borderColor="gray.300" />

                <Box>
                    <Heading size="sm" mb={2}>Job Description</Heading>
                    <Text whiteSpace="pre-wrap" fontSize="md" color={textColor}>{job.description}</Text>
                </Box>

                <Divider />

                <Box alignSelf="end">
                    {checkingApplication ? (
                        <Spinner size="sm" />
                    ) : hasApplied ? (
                        <Text color="green.400" fontWeight="bold">You already applied to this job.</Text>
                    ) : (
                        <Button colorScheme="teal" onClick={handleApply}>Apply Now</Button>
                    )}
                </Box>
            </VStack>
        </Box>
    );
}

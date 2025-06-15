'use client';

import {
    Box, Heading, Text, Spinner, VStack, Button, useToast,
    SimpleGrid, Card, CardHeader, CardBody, Stat, StatLabel,
    StatNumber, StatHelpText, StatArrow, Icon, useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { FiUsers, FiBriefcase } from 'react-icons/fi';

interface UserResponse {
    id: number;
    email: string;
    role: string;
    userType: 'EMPLOYER' | 'JOB_SEEKER';
    name: string;
}

export default function DashboardPage() {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [jobCount, setJobCount] = useState<number | null>(null);
    const [userCount, setUserCount] = useState<number | null>(null);

    const router = useRouter();
    const toast = useToast();

    const cardBg = useColorModeValue('white', 'gray.700');
    const cardTextColor = useColorModeValue('gray.600', 'gray.300');

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast({
                title: "Unauthorized",
                description: "Please log in to access your dashboard.",
                status: "warning",
            });
            router.push("/login");
            return;
        }

        const fetchDashboardData = async () => {
            try {
                const [userRes, jobCountRes, userCountRes] = await Promise.all([
                    api.get("/users/me"),
                    api.get("/jobs/count"),
                    api.get("/users/count"),
                ]);

                setUser(userRes.data);
                setJobCount(jobCountRes.data);
                setUserCount(userCountRes.data);
            } catch (err) {
                toast({
                    title: "Session expired",
                    description: "Please log in again.",
                    status: "error",
                });
                localStorage.removeItem("token");
                router.push("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [router, toast]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        toast({ title: "Logged out", status: "info" });
        router.push("/login");
    };

    const renderEmployerActions = () => (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Card bg={cardBg}>
                <CardHeader fontWeight="bold">Post a Job</CardHeader>
                <CardBody>
                    <Button onClick={() => router.push("/dashboard/jobs/create")} colorScheme="teal">
                        Go
                    </Button>
                </CardBody>
            </Card>
            <Card bg={cardBg}>
                <CardHeader fontWeight="bold">View Your Jobs</CardHeader>
                <CardBody>
                    <Button onClick={() => router.push("/dashboard/jobs")} colorScheme="blue">
                        Go
                    </Button>
                </CardBody>
            </Card>
        </SimpleGrid>
    );

    const renderJobSeekerActions = () => (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Card bg={cardBg}>
                <CardHeader fontWeight="bold">Browse Jobs</CardHeader>
                <CardBody>
                    <Button onClick={() => router.push("/dashboard/jobs")} colorScheme="teal">
                        Go
                    </Button>
                </CardBody>
            </Card>
            <Card bg={cardBg}>
                <CardHeader fontWeight="bold">Your Applications</CardHeader>
                <CardBody>
                    <Button onClick={() => router.push("/dashboard/applications")} colorScheme="blue">
                        Go
                    </Button>
                </CardBody>
            </Card>
        </SimpleGrid>
    );

    if (loading) return <Spinner size="xl" mt={10} />;

    return (
        <VStack spacing={8} align="stretch">
            <Box>
                <Heading as="h1" size="xl" mb={2}>
                    Hello, {user?.name}!
                </Heading>
                <Text color={cardTextColor} fontSize="lg">
                    As a{user?.userType === 'EMPLOYER' ? 'n employer' : ' job seeker'}, here's a quick overview.
                </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <Stat p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg={cardBg}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <StatLabel fontWeight="medium" color={cardTextColor}>Active Job Postings</StatLabel>
                        <Icon as={FiBriefcase} w={6} h={6} color="blue.500" />
                    </Box>
                    <StatNumber fontSize="3xl" fontWeight="bold" color={useColorModeValue('gray.800', 'white')}>
                        {jobCount ?? "–"}
                    </StatNumber>
                </Stat>

                <Stat p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg={cardBg}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <StatLabel fontWeight="medium" color={cardTextColor}>Total Users</StatLabel>
                        <Icon as={FiUsers} w={6} h={6} color="green.500" />
                    </Box>
                    <StatNumber fontSize="3xl" fontWeight="bold" color={useColorModeValue('gray.800', 'white')}>
                        {userCount ?? "–"}
                    </StatNumber>
                </Stat>
            </SimpleGrid>

            <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg={cardBg}>
                <Heading size="lg" mb={4}>Your Quick Actions</Heading>
                {user?.userType === 'EMPLOYER' && renderEmployerActions()}
                {user?.userType === 'JOB_SEEKER' && renderJobSeekerActions()}
            </Box>

            <VStack align="start" spacing={1} mt={10} fontSize="sm">
                <Text color="gray.500">Logged in as: <strong>{user?.email}</strong></Text>
                <Text color="gray.500">Role: <strong>{user?.role}</strong></Text>
                <Button onClick={handleLogout} colorScheme="red" mt={2} size="sm">
                    Logout
                </Button>
            </VStack>
        </VStack>
    );
}

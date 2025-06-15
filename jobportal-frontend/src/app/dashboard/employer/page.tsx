'use client';

import api from '@/lib/axios';
import { useEffect, useState } from 'react';
import {
    Heading,
    Box,
    VStack,
    Button,
    Text,
    useToast,
    Input,
    Textarea,
    Switch,
    Stack
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function EmployerDash() {
    const [jobs, setJobs] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const toast = useToast();
    const router = useRouter();

    useEffect(() => {
        api.get('/employer/jobs').then(r => setJobs(r.data));
    }, []);

    const del = async (id: number) => {
        await api.delete(`/jobs/${id}`);
        setJobs(jobs => jobs.filter(job => job.id !== id));
        toast({ title: 'Deleted', status: 'info' });
    };

    const save = async (job: any) => {
        try {
            const { data } = await api.put(`/jobs/${job.id}`, job);
            setJobs(jobs =>
                jobs.map(j => (j.id === job.id ? data : j))
            );
            setEditingId(null);
            toast({ title: 'Updated successfully', status: 'success' });
        } catch (e) {
            toast({ title: 'Failed to update job', status: 'error' });
        }
    };

    const handleChange = (id: number, key: string, value: any) => {
        setJobs(jobs =>
            jobs.map(job =>
                job.id === id ? { ...job, [key]: value } : job
            )
        );
    };

    return (
        <Box p={8}>
            <Heading>Your Job Postings</Heading>
            <Button mt={4} onClick={() => router.push('/post-jobs')}>
                Post New Job
            </Button>
            <VStack mt={4} spacing={4}>
                {jobs.map(job => (
                    <Box key={job.id} borderWidth="1px" p={4} w="100%">
                        {editingId === job.id ? (
                            <>
                                <Input
                                    value={job.title}
                                    onChange={e => handleChange(job.id, 'title', e.target.value)}
                                    placeholder="Job Title"
                                />
                                <Textarea
                                    mt={2}
                                    value={job.description}
                                    onChange={e => handleChange(job.id, 'description', e.target.value)}
                                    placeholder="Description"
                                />
                                <Input
                                    mt={2}
                                    value={job.location}
                                    onChange={e => handleChange(job.id, 'location', e.target.value)}
                                    placeholder="Location"
                                />
                                <Input
                                    mt={2}
                                    value={job.salaryRange}
                                    onChange={e => handleChange(job.id, 'salaryRange', e.target.value)}
                                    placeholder="Salary Range"
                                />
                                <Stack direction="row" align="center" mt={2}>
                                    <Text>Remote?</Text>
                                    <Switch
                                        isChecked={job.remote}
                                        onChange={e => handleChange(job.id, 'remote', e.target.checked)}
                                    />
                                </Stack>
                                <Stack direction="row" spacing={2} mt={4}>
                                    <Button colorScheme="green" size="sm" onClick={() => save(job)}>
                                        Save
                                    </Button>
                                    <Button size="sm" onClick={() => setEditingId(null)}>
                                        Cancel
                                    </Button>
                                </Stack>
                            </>
                        ) : (
                            <>
                                <Text fontWeight="bold">{job.title}</Text>
                                <Text>{job.description}</Text>
                                <Text>Location: {job.location}</Text>
                                <Text>Salary: {job.salaryRange}</Text>
                                <Text>Remote: {job.remote ? 'Yes' : 'No'}</Text>
                                <Stack direction="row" spacing={2} mt={2}>
                                    <Button
                                        size="sm"
                                        onClick={() => setEditingId(job.id)}
                                        colorScheme="blue"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={() => del(job.id)}
                                        colorScheme="red"
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={() => router.push(`/jobs/${job.id}/applicants`)}
                                    >
                                        Applicants
                                    </Button>
                                </Stack>
                            </>
                        )}
                    </Box>
                ))}
            </VStack>
        </Box>
    );
}

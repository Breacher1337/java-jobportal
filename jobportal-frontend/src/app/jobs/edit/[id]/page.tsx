'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Box, Input, Textarea, Checkbox, Button, useToast } from '@chakra-ui/react';
import api from '@/lib/axios';

export default function EditJobPage() {
    const router = useRouter();
    const toast = useToast();
    const pathname = usePathname().split('/');
    const jobId = pathname[pathname.length - 1];

    const [form, setForm] = useState({ title:'', description:'', location:'', salaryRange:'', remote:false });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/jobs/${jobId}`)
            .then(res => {
                setForm({
                    title: res.data.title,
                    description: res.data.description,
                    location: res.data.location,
                    salaryRange: res.data.salaryRange,
                    remote: res.data.remote,
                });
            })
            .catch(() => {
                toast({ title:'Error loading job', status:'error' });
                router.push('/employer/jobs');
            })
            .finally(() => setLoading(false));
    }, [jobId]);

    const handleSubmit = async () => {
        try {
            await api.put(`/jobs/${jobId}`, form);
            toast({ title:'Job updated', status:'success' });
            router.push('/employer/jobs');
        } catch {
            toast({ title:'Update failed', status:'error' });
        }
    };

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type==='checkbox'?checked:value }));
    };

    if (loading) return <Box>Loading...</Box>;
    return (
        <Box maxW="600px" mx="auto" mt={10}>
            <Input name="title" value={form.title} onChange={handleChange} mb={4}/>
            <Textarea name="description" value={form.description} onChange={handleChange} mb={4}/>
            <Input name="location" value={form.location} onChange={handleChange} mb={4}/>
            <Input name="salaryRange" value={form.salaryRange} onChange={handleChange} mb={4}/>
            <Checkbox name="remote" isChecked={form.remote} onChange={handleChange} mb={4}>Remote</Checkbox>
            <Button colorScheme="blue" onClick={handleSubmit}>Update Job</Button>
        </Box>
    );
}

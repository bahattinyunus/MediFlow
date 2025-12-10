"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Users, AlertCircle, FileText, ArrowUpRight, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Patient {
    id: string;
    fullName: string;
    status: string;
    lastDiagnosis: string;
    prescriptions: { status: string }[];
}

export default function Portal() {
    const { data: patients, isLoading } = useQuery({
        queryKey: ['patients'],
        queryFn: async () => {
            // Allow fallback to standard demo data if API is not reachable (e.g. backend not running)
            try {
                const res = await fetch('http://localhost:3001/api/patients');
                if (!res.ok) throw new Error('API Failed');
                return await res.json() as Patient[];
            } catch (err) {
                console.warn("API Error, using fallback:", err);
                return [
                    { id: '1', fullName: 'Ahmet Yılmaz', status: 'Stable', lastDiagnosis: 'Hypertension (I10)', prescriptions: [{ status: 'Delivered' }] },
                    { id: '2', fullName: 'Ayşe Kaya', status: 'Critical', lastDiagnosis: 'Acute Bronchitis (J20)', prescriptions: [{ status: 'Pending' }] },
                    { id: '3', fullName: 'Mehmet Demir', status: 'Stable', lastDiagnosis: 'Type 2 Diabetes (E11)', prescriptions: [{ status: 'Preparing' }] },
                ];
            }
        }
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8 text-white min-h-screen">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <p className="text-zinc-400">Welcome back, Dr. Aydin. Here's your daily overview.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button className="bg-blue-600 hover:bg-blue-500">
                        <FileText className="mr-2 h-4 w-4" /> New Prescription
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Patients"
                    value={patients?.length?.toString() || "0"}
                    description="+180 from last month"
                    icon={<Users className="h-4 w-4 text-zinc-400" />}
                />
                <StatsCard
                    title="Active Prescriptions"
                    value="1,203"
                    description="+12% since last hour"
                    icon={<Activity className="h-4 w-4 text-zinc-400" />}
                />
                <StatsCard
                    title="Critical Alerts"
                    value={patients?.filter(p => p.status === 'Critical').length.toString() || "0"}
                    description="Requires immediate attention"
                    icon={<AlertCircle className="h-4 w-4 text-red-500" />}
                />
                <StatsCard
                    title="AI Diagnoses"
                    value="573"
                    description="98.2% Accuracy verified"
                    icon={<Activity className="h-4 w-4 text-blue-500" />}
                />
            </div>

            {/* Patient List */}
            <Card className="bg-[#111827] border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-white">Recent Patients</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-zinc-800 hover:bg-transparent">
                                <TableHead className="text-zinc-400">Patient Name</TableHead>
                                <TableHead className="text-zinc-400">Status</TableHead>
                                <TableHead className="text-zinc-400">Last Diagnosis</TableHead>
                                <TableHead className="text-zinc-400">Prescription Status</TableHead>
                                <TableHead className="text-right text-zinc-400">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {patients?.map((patient) => (
                                <TableRow key={patient.id} className="border-zinc-800 hover:bg-zinc-900/50">
                                    <TableCell className="font-medium text-white">{patient.fullName}</TableCell>
                                    <TableCell>
                                        <Badge variant={patient.status === 'Critical' ? 'destructive' : 'default'} className={patient.status === 'Stable' ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' : ''}>
                                            {patient.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-zinc-300">{patient.lastDiagnosis}</TableCell>
                                    <TableCell className="text-zinc-300">
                                        {patient.prescriptions?.[0]?.status || 'None'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                                            View <ArrowUpRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

function StatsCard({ title, value, description, icon }: { title: string, value: string, description: string, icon: React.ReactNode }) {
    return (
        <Card className="bg-[#111827] border-zinc-800 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-zinc-500">
                    {description}
                </p>
            </CardContent>
        </Card>
    )
}

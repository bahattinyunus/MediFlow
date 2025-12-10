const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// GET /api/patients
router.get('/', async (req, res) => {
    try {
        const patients = await prisma.patient.findMany({
            include: { prescriptions: true },
            orderBy: { updatedAt: 'desc' }
        });
        res.json(patients);
    } catch (error) {
        console.error("Database error, returning mock data:", error.message);
        // Fallback Mock Data for Demo Purposes if DB fails
        res.json([
            { id: '1', fullName: 'Ahmet Yılmaz', status: 'Stable', lastDiagnosis: 'Hypertension (I10)', prescriptions: [{ status: 'Delivered' }] },
            { id: '2', fullName: 'Ayşe Kaya', status: 'Critical', lastDiagnosis: 'Acute Bronchitis (J20)', prescriptions: [{ status: 'Pending' }] },
            { id: '3', fullName: 'Mehmet Demir', status: 'Stable', lastDiagnosis: 'Type 2 Diabetes (E11)', prescriptions: [{ status: 'Preparing' }] },
            { id: '4', fullName: 'Zeynep Çelik', status: 'Review', lastDiagnosis: 'Migraine (G43)', prescriptions: [{ status: 'Approved' }] }
        ]);
    }
});

// GET /api/patients/:id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await prisma.patient.findUnique({
            where: { id },
            include: { prescriptions: true }
        });
        if (!patient) return res.status(404).json({ error: 'Patient not found' });
        res.json(patient);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch patient' });
    }
});

module.exports = router;

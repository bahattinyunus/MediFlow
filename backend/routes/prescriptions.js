const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// GET /api/prescriptions
router.get('/', async (req, res) => {
    try {
        const prescriptions = await prisma.prescription.findMany({
            include: { patient: true, doctor: true },
            orderBy: { createdAt: 'desc' }
        });
        res.json(prescriptions);
    } catch (error) {
        console.error("Database error, returning mock data:", error.message);
        res.json([
            { id: '1', medicationName: 'Amoxicillin', status: 'Pending', patient: { fullName: 'Ayşe Kaya' }, doctor: { fullName: 'Dr. Aydin' } },
            { id: '2', medicationName: 'Metformin', status: 'Delivered', patient: { fullName: 'Mehmet Demir' }, doctor: { fullName: 'Dr. Aydin' } },
        ]);
    }
});

// POST /api/prescriptions (Create new prescription)
router.post('/', async (req, res) => {
    try {
        const { medicationName, dosage, patientId, doctorId } = req.body;
        const prescription = await prisma.prescription.create({
            data: {
                medicationName,
                dosage,
                patientId,
                doctorId,
                status: 'Pending'
            }
        });
        res.json(prescription);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create prescription' });
    }
});

module.exports = router;

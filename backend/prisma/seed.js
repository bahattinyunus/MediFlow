const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    const doctorAydin = await prisma.doctor.create({
        data: {
            fullName: 'Dr. Aydin',
            specialty: 'Internal Medicine',
        },
    });

    const patients = [
        {
            fullName: 'Ahmet Yılmaz',
            age: 45,
            gender: 'Male',
            status: 'Stable',
            lastDiagnosis: 'Hypertension (I10)',
        },
        {
            fullName: 'Ayşe Kaya',
            age: 32,
            gender: 'Female',
            status: 'Critical',
            lastDiagnosis: 'Acute Bronchitis (J20)',
        },
        {
            fullName: 'Mehmet Demir',
            age: 58,
            gender: 'Male',
            status: 'Stable',
            lastDiagnosis: 'Type 2 Diabetes (E11)',
        },
        {
            fullName: 'Zeynep Çelik',
            age: 29,
            gender: 'Female',
            status: 'Review',
            lastDiagnosis: 'Migraine (G43)',
        }
    ];

    for (const p of patients) {
        const patient = await prisma.patient.create({
            data: p,
        });

        // Create a prescription for each
        await prisma.prescription.create({
            data: {
                medicationName: 'Amoxicillin 500mg',
                dosage: 'Twice a day',
                status: p.status === 'Critical' ? 'Pending' : 'Delivered',
                patientId: patient.id,
                doctorId: doctorAydin.id,
            },
        });
        console.log(`Created patient with id: ${patient.id}`);
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

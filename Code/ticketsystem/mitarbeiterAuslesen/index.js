const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// MongoDB-Verbindung (ohne veraltete Optionen)
mongoose
    .connect('mongodb+srv://admin:TxCOKizlfdVuIwj8@cluster0.7yj62.mongodb.net/ticketsystem')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Middleware
router.use(express.json());

// Mitarbeiter-Schema und -Modell
const employeeSchema = new mongoose.Schema(
    {
        vorname: { type: String, required: true },
        nachname: { type: String, required: true },
        beitrittsdatum: { type: Date, required: true },
        skilllevel: { type: Number, required: true, min: 1, max: 5 },
        _id: { type: String, unique: true, required: true },
    },
    { collection: 'mitarbeiter' } // Kollektion explizit festlegen
);

const Employee = mongoose.model('Employee', employeeSchema);

// Route: Alle Mitarbeiter abrufen
router.get('/mitarbeiter', async (req, res) => {
    try {
        const employees = await Employee.find();

        if (employees.length === 0) {
            return res.status(404).json({ message: 'Keine Mitarbeiter gefunden.' });
        }

        res.status(200).json({
            success: true,
            employees,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Fehler beim Abrufen der Mitarbeiter.',
            error: err.message,
        });
    }
});

module.exports = router;
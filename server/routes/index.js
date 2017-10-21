const express = require('express');


const students = require('./students');
const instructors = require('./instructors')

const router = express.Router();

router.use('/instructors', instructors);
router.use('/api/students', students);




module.exports = router;
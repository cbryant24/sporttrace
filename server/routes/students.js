const models = require('../models');
const express = require('express');
// const test = require('./test');
const bodyParser = require('body-parser');

const router = express.Router();
let Students = models.students;
let Grades = models.grades;
debugger

router.use(bodyParser.json())


router.post('/', function(req, res){
    // Students.findAll().then( (table) => {
    //     let all_studs = {
    //         success: true,
    //         data: table
    //     }
    //     console.log(typeof JSON.stringify(table));
    //     res.status(200)        
    //     res.send(all_studs)
    // })
    console.log('this is the body req parsed', req.body);
    Students
    .findOrCreate({where: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        student_id: req.body.student_id,
        }
    })
    .spread( (student, created) => {
        console.log('this is saying if its been created yet', created)
        if(created) return res.send({student, created})
        res.send(student)
    }) 
    // res.send(JSON.stringify(table));
})



module.exports = router;
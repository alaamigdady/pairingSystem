const Student = require('../db/model/studentModel.js');
const Pairs = require('../db/model/pairsModel.js');


exports.createStudent =  (req, res ,next) => {
    const student = new Student(req.body);
    student.save()
    .then(item => {
     res.send("student saved to database");
 })
    .catch(err => {
        next(err)
    });
};


exports.retrieveAllStudents = (req, res,next) => {
    Student.find({})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            next(err)
        })
 };


exports.deleteStudent =  (req, res, next) => {

        const studentName = req.query.studentName;
        console.log(studentName)
        Student.deleteOne({studentName:studentName})
        .then(()=>{
            res.send('removed')
        })
        .catch(err => {
            next(err)
        })
};


exports.updateStudent =  (req, res, next) => {
   const newValue = req.body;
   console.log(newValue)
   const studentName = req.query.studentName;
        

    Student.findOneAndUpdate({studentName:studentName},newValue)
    .then( previousValue => {
        Student.findOne({ studentName:studentName })
        .then(updated => {
            res.send(updated);
        })
        .catch(err => {
            next(err);
        });
    })
    .catch(err => {
        next(err)
    })
};



exports.createTable = async (req, res ,next) => {

    const students =  await Student.find({})
        .then(async data => {
            return data
        });

    if(students.length === 0){
        res.send('there is no students added yet , start adding one')
    } else{
        const pairs = createPairs(students)
        res.send(pairs)
    }

};

exports.saveTable =  (req, res ,next) => {
    const pairs = new Pairs(req.body);
    savePairs(pairs.pairs)
    pairs.save()
    .then(item => {
     res.send("pairs saved to database");
 })
    .catch(err => {
        next(err)
    });
};


exports.retrieveAllTables = (req, res,next) => {
    Pairs.find({})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            next(err)
        })
 };





createPairs = (students) =>{
    let pair =[];

    if (students.length % 2 === 1){
        let flag = true;
        let random = Math.floor((Math.random() * students.length));

        while(flag){
            if(students[random].pairs.indexOf('solo') === -1){
                pair.push({student1:students[random].studentName , student2 :'solo'});
                students.splice(random , 1);
                flag = false;
                break

            }
            random = Math.floor((Math.random() * students.length));
        }
    }

    let newStudents = shuffle(students);
    while(newStudents.length !== 0){
        while(newStudents[0].pairs.indexOf(newStudents[1].studentName) === -1 )  {
            pair.push({student1:students[0].studentName , student2:students[1].studentName});
            newStudents.splice(0,2)
            if(newStudents.length === 0) break
        }
    newStudents = shuffle(newStudents)   

    }
 return pair
}



 shuffle = (array) =>{
    let length = array.length;
    let temp;
    let index;

    while (length > 0) {
        index = Math.floor(Math.random() * length);
        length--;
        temp = array[length];
        array[length] = array[index];
        array[index] = temp;
    }
    return array;
}




savePairs = async (array) =>{

    for (let i = array.length - 1; i >= 0; i--) {
         if(array[i].student2 === 'solo'){
            let pairs =  await Student.find({studentName:array[i].student1})
            .then(async data => {
            return data[0].pairs
            });
            pairs.push('solo');
            Student.findOneAndUpdate({studentName:array[i].student1},{$set:{pairs : pairs}})
            .then(()=>{
                console.log('hi')
            })

        }

        let pairs1 =  await Student.find({studentName:array[i].student1})
            .then(async data => {
            return data[0].pairs
            });
        pairs1.push(array[i].student2);
        Student.findOneAndUpdate({studentName:array[i].student1},{$set:{pairs : pairs1}})
        .then(()=>{
                console.log('hi')
        })


        let pairs2 =  await Student.find({studentName:array[i].student2})
            .then(async data => {
            return data[0].pairs
            }); 

        pairs2.push(array[i].student1);
        Student.findOneAndUpdate({studentName:array[i].student2},{$set:{pairs : pairs2}})
        .then(()=>{
                console.log('hi')
            })
    }
}















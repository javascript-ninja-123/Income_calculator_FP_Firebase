let john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
};

//function constructor
function Person(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    this.calculate = function() {
        return 2016 - this.yearOfBirth
    }
}
Person.prototype.jobGuess = function() {
    if (this.job === 'teacher') {
        return 'Jackpot!!!!'
    }
}

let johnMan = new Person('john', 1998, 'teacher');

console.log(johnMan.calculate())
console.log(johnMan.jobGuess())

console.log(johnMan.hasOwnProperty('job'))
console.log(johnMan.hasOwnProperty('lastname'))
console.log(johnMan instanceof Person)


var personProto = {
    calculateAge: function() {
        return 2016 - this.yearOfBirth
    }
}

var man = Object.create(personProto, {
    name: { value: 'Jane' },
    yearOfBirth: { value: 1969 },
    job: { value: 'designer' }
})

console.log(man)


var a = 23;
var b = a;
a = 46;
console.log(a, b)

var obj1 = {
    name: 'John',
    age: 26
}

var obj2 = obj1;

obj1.age = 30;
console.log(obj1.age);
console.log(obj2.age)



//function 
var age = 27;
var obj = {
    name: 'Jonas',
    city: 'Lisbon'
}

function change(a, b) {
    a = 30;
    b.city = 'San Francisco'
}

change(age, obj);
console.log(age);
console.log(obj.city)





function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) {
            return `${name}, Can you please explain
            what UX design is?`
        }
    } else if (job === 'teacher') {
        return function(name) {
            return `${name}, what subject do you
            teach?`
        }
    } else {
        return function(name) {
            return `${name}, what do you do?`
        }
    }
}

let designerQuestion = interviewQuestion('designer')
console.log(designerQuestion('sung'))



function game() {
    var score = Math.floor(Math.random() * 100)
}

(function() {
    var score = Math.floor(Math.random() * 100)
    console.log(score > 60)
})()



function retirement(age) {
    let a = 'Years left until retirement';
    return function(yearOfBirth) {
        let currentAge = 2016 - yearOfBirth;
        return `${age - currentAge}${a}`
    }
}

console.log(retirement(65)(1979))

var retirementGremany = retirement(65);
var retirementEurope = retirement(70);


function interviewClousure(job) {
    var question;
    switch (job) {
        case 'designer':
            question = `can you explain what UX design is?`
            break;
        case 'teacher':
            question = 'What do you teach?'
            break;
        default:
            question = 'what is your job?'
            break;
    }
    return function(name) {
        return `${name}, ${question}`
    }
}



let designer = interviewClousure('designer');
console.log(designer('sung'))




let superMan22 = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay) {
        if (style === 'formal') {
            return `Good ${timeOfDay} Ladies and Gentleman I am ${this.name} and my job is ${this.job} and I am ${this.age} od now.`
        } else if (style === 'friendly') {
            return `what is up?  ${timeOfDay} I am ${this.name} and my job is ${this.job} and I am ${this.age} od now.`
        } else {
            return 'do it again'
        }
    }
}
console.log(superMan22.presentation())

let manman = superMan22.presentation('formal', 'afternoon')
console.log(manman)


var emily = {
    name: 'Emily',
    age: 36,
    job: 'Desinger'
}

let newEmily = superMan22.presentation.call(emily, 'friendly', 'afternoon')
console.log(newEmily)


let newEmily2 = superMan22.presentation.apply(emily, ['friendly', 'morning']);
console.log(newEmily2)

var johnFriendly = superMan22.presentation.bind(emily, 'friendly');

console.log(johnFriendly('night'));



var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    let arrayRes = [];
    arr.forEach(value => {
        arrayRes.push(fn(value))
    })
    return arrayRes;
};

function calculateAge(el) {
    return 2017 - el;
}

function isFullAge(limit, el) {
    let array = [];
    array.push(el)
    let man = array.filter(value => {
        return value >= limit;
    })
    return man
}

let manArray = arrayCalc(years, calculateAge)
console.log(manArray)
let manArray2 = arrayCalc(years, isFullAge)
let newMan = _.flatten(manArray2);
console.log(newMan)


var ages = arrayCalc(years, calculateAge)
console.log(ages)
var ageLimitJapan = arrayCalc(ages, isFullAge.bind(this, 20))
console.log(_.flatten(ageLimitJapan))
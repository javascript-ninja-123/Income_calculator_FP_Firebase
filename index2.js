//DOM
const selection = document.querySelector('.selection'),
    date = document.querySelector('.date'),
    description = document.querySelector('#description'),
    value = document.querySelector('#value'),
    button = document.querySelector('.btn'),
    incomeList = document.querySelector('.incomeList'),
    expenseList = document.querySelector('.expenseList'),
    money = document.querySelector('.Money'),
    income = document.querySelector('.income'),
    expense = document.querySelector('.expense')
    //firebase 
const rootRef = firebase.database().ref(),
    addRef = rootRef.child('add'),
    deductionRef = rootRef.child('deduction'),
    totalRef = rootRef.child('total'),
    incometotalRef = totalRef.child('incomeTotal'),
    expensetotalRef = totalRef.child('expenseTotal'),
    totalofIncomeExpenseRef = totalRef.child('totalMoney');
//firebase function
const incomeUpdate = firstUpdate(addRef),
    expenseUpdate = firstUpdate(deductionRef),
    incomeBoard = updateScoreBoard(incometotalRef),
    expenseBoard = updateScoreBoard(expensetotalRef)

//run this first
function onReady() {
    date.innerHTML = moment().format('ll');
    incomeUpdate(incomeList);
    expenseUpdate(expenseList);
    incomeBoard(income);
    expenseBoard(expense)

}

//load everything first
function firstUpdate(ref) {
    return function(list) {
        ref.once('value')
            .then(snap => {
                let snapshot = snap.val();
                return Object.values(snapshot);
            })
            .then(array => {
                array.forEach(value => {
                    let li = `<li>${value.description} -- $${value.number}</li>`
                    list.insertAdjacentHTML('beforeend', li)
                })
            })
    }
}
//update board
function updateScoreBoard(ref) {
    return function(ele) {
        ref.once('value', snap => {
            let snapshot = snap.val();
            ele.innerHTML = `$${snapshot}`
        })
    }
}

//total Money

totalRef.on('value', snap => {
    let snapshot = snap.val();
    let number = snapshot.incomeTotal - snapshot.expenseTotal
    money.innerHTML = `$${number}`;
})



//Do math = total Income / total expense / money
const total = {
        transaction: function(ref) {
            return function(ele, eleRef) {
                ref.once('value')
                    .then(snap => {
                        let snapshot = snap.val(),
                            array = Object.values(snapshot),
                            number = 0;
                        array.forEach(value => {
                            number += value.number;
                        })
                        ele.innerHTML = `$${number}`;
                        return number;
                    })
                    .then(number => {
                        eleRef.set(number)
                    })
            }
        }
    }
    //update list
function updateList(ref, list, ele, eleRef) {
    description.value = '';
    value.value = ''
    selection.value = 'choose'
    ref.orderByKey().limitToLast(1).once('child_added')
        .then(snap => {
            let snapshot = snap.val();
            let li = `<li>${snapshot.description} -- $${snapshot.number}</li>`
            list.insertAdjacentHTML('beforeend', li)
            const gettingMoeny = total.transaction(ref);
            gettingMoeny(ele, eleRef);
        })
}

//push data to Firebase
function pushData(ref, data) {
    return function(list, ele, eleRef) {
        ref.push(data)
            .then(() => {
                updateList(ref, list, ele, eleRef);
            })
    }
}



//eventListener
button.addEventListener('click', e => {
    e.preventDefault();
    let numberValue = Number(value.value)
    let data = {
        description: description.value,
        number: numberValue
    }
    if (selection.value === 'addition') {
        const addPush = pushData(addRef, data);
        addPush(incomeList, income, incometotalRef)
    } else if (selection.value === 'deduction') {
        const addPush = pushData(deductionRef, data);
        addPush(expenseList, expense, expensetotalRef)
    }
})

window.onload = onReady;
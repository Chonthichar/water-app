'use strict';

//log in password
const person1 = {
    founder: 'Chonhichar Soythong',
    drinking: [],
    pin: 111,
};

const person2 = {
    founder: 'Warunee Soythong',
    drinking: [],
    pin: 111,
}

const person3 = {
    founder: 'Visitor Welcome',
    drinking: [],
    pin: 111,
}


const person = [person1, person2, person3];

//const element
const welcomeText = document.querySelector('.greeting');
const login = document.querySelector('.login');
const updateMain = document.querySelector('.update')
const balanceLabel = document.querySelector('.balances-total')

// const summaryValueInText = document.getElementsByClassName('.summary--value--in');
// unable to use get element by class name because can't put textContent in
const summaryValueInText = document.querySelector('.summary--value--in');
const summaryValueOutText = document.querySelector('.summary--value--out');
const summaryValueMl = document.querySelector('.summary--value--ml');
const btnLogIn = document.querySelector('.login--btn');
const loginInputUser = document.querySelector('.login--input--user');
const loginInputPin = document.querySelector('.login--input--pin');
const wholePageToShow = document.querySelector('.page');
const buttonAdd = document.querySelector('.icon-btn--add-btn');
const buttonRemove = document.querySelector('.icon-btn--remove-btn');
const buttonClose = document.querySelector('.form--btn--close');
const inputCloseUser = document.querySelector('.form--input--user');
const inputClosePin = document.querySelector('.form--input--pin');
const balanceDate = document.querySelector('.balances-date');
const timeLogout = document.querySelector('.time');


// 1. use for each to add number // use string and insert html
// 2. bug: this part was takeout from the app but unable to delete because others function will be gone.
const drinkingRecord = function (drinking) {
    drinking.forEach(function (drink, i) {

        const activity = drink > 0 ? 'add' : 'remove';

        const html = `<div class ="update__row">
            <div class ="update--type update--type-acount${activity}">${i + 1}${activity}</div>
            <div class ="update--value">${drink} 🥛</div>
        </div>`
        updateMain.insertAdjacentHTML('afterbegin', html); //use after begin to let new child element appear above
    })
}

//Have to link with add button -- inorder to shows and check in console // abs to shows the absolute number
const description = person1.drinking.map((drink, i, arr) =>
    `movement ${i + 1}: You ${drink > 0 ? 'add' : 'withdraw'} ${Math.abs(drink)}`
);
console.log(description);


//1.log in username by loop over the array and add to new array and join in array as a string. Inorder to use the username for login.
//2. no value display
//3. join to take the value out from string
//4. practice to transfer to arrow function
const createUserName = function (per) {
    per.forEach(function (pe) {
        pe.userName = pe.founder  //change founder to username only for login
            .toLowerCase()
            .split(' ')
            .map(word => word[0])
            .join('');
    })
}
createUserName(person);

//Event handler
let currentPerson; // put it outside the function to use it for the others function like when we add water

//add balance on current balance everytime when drink water
// reduce the first argument always call accumulator (acc) like showing that we automatically want to return
// and have initial value of accumulator in the first loop generation. ALWAYS have both

//1. current balance match with water that adding in
//2. current balance match with water that was removed
const printBalance = function (cur) {
    cur.currentBalance = cur.drinking.reduce((cur, drink) => cur + drink, 0);

    buttonAdd.addEventListener('click', function (e) {
        e.preventDefault();
        cur.currentBalance = isNaN(cur.currentBalance) ? 0 : cur.currentBalance;
        cur.currentBalance++;
        balanceLabel.textContent = `${cur.currentBalance}`;
    })
    buttonRemove.addEventListener('click', function (e) {
        e.preventDefault();
        if (cur.currentBalance > 0) {
            cur.currentBalance--;
            balanceLabel.textContent = `${cur.currentBalance}`;
        }
    });
};

//API date using internationalizing dates
const now = new Date();
const time = {hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'};
const local = navigator.language; //display whatever language you have in your vrowser
console.log(local);
balanceDate.textContent = new Intl.DateTimeFormat(local, time).format(now);

//1.another way to add date and time
//set current day
// const now = new Date();
// balanceDate.textContent = now;
// const day = `${now.getDate()}`.padStart(2, 0);
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// const year = now.getFullYear();
// const hour = now.getHours();
// const min = now.getMinutes();
// balanceDate.textContent = `${day}/ ${month}/ ${year}, ${hour}: ${min}`;
//day month year use international time according that local time


//maximum value -- use accumulate (acc) to track the maximum number
const max = person1.drinking.reduce((acc, drink) => {
    if (acc > drink)
        return acc;
    else
        return drink;
}, person1.drinking[0]);


//summarize number of water that was drink using chaining
//1. adding in number everytime when clicked.
//2. remove glass of water 1 time each everytime when click
//3. calculate the total ml of that current glass connect with current glass.
const glassWaterSum = function (drinking) {
    let addIn = drinking.filter(drink => drink > 0).reduce((cur, drink) => cur + drink, 0);
    buttonAdd.addEventListener('click', function (e) {
        e.preventDefault();
        // addIn = isNaN(addIn) ? 0 : addIn;
        // addIn++;
        addIn = addIn + 1;
        summaryValueInText.textContent = `${addIn}🥛`
    });

    let removeOut = drinking.filter(drink => drink < 0).reduce((cur, drink) => cur + drink, 0);
    buttonRemove.addEventListener('click', function (e) {
        if (addIn > 0) {
            e.preventDefault()
            // removeOut++;
            removeOut++;
            summaryValueOutText.textContent = `${removeOut} 🥛`
            // console.log(removeOut)
        }
    });

    let amountMl = drinking.filter(drink => drink > 0).map(ml => (ml * 240)).reduce((cur, ml) => cur + ml, 0);
    buttonAdd.addEventListener('click', function (e) {
        e.preventDefault();
        if (addIn > 0) {
            amountMl = (parseInt(amountMl)) + 240;
            summaryValueMl.textContent = `${amountMl} Ml 🥛`;
        }
    });
    let num = drinking.filter(drink => drink < 0).reduce((cur, ml) => cur + ml, 0);
    buttonRemove.addEventListener('click', function (e) {
        e.preventDefault();
        if (removeOut > 0) {
            num = amountMl -= 240
            summaryValueMl.textContent = `${num} Ml 🥛`;
        }
    });
    //
    // // buttonRemove.removeEventListener('click', function (e){
    // //     e.preventDefault();
    // //     if (num === 0){
    // //         summaryValueMl.textContent = `${num}`;
    //    }
    // })
}

//to log out by adding correct username and pin;
buttonClose.addEventListener('click', function (e) {
    e.preventDefault();
    // console.log('delete');
    if (inputCloseUser.value === currentPerson.userName && Number(inputClosePin.value) === currentPerson.pin) {

        const index = person.findIndex(cur => cur.founder === currentPerson.userName); //get into current entire array
        console.log(index);

        //delete account
        person.splice(index, 1);
        //    Hide UI
        wholePageToShow.style.opacity = 0;
    }
    inputCloseUser.value = inputClosePin.value = '';
});

//problem: 1.fix the problem when log out from chon account then log in to waru account - time continue keep running - how to stop time
const startLogOutTimer = function () {
    //set time for 1 minutes
    let time = 120;
    //call the timer every second
    const timer = setInterval(function () {

        const minutes = String(Math.trunc(time / 60)).padStart(2, 0); //math to get rid of minimal number/ padstart to set location of time
        const second = String(time % 60).padStart(2, 0) //100 %60
        //in each call print the remaining time to UI
        timeLogout.textContent = `${minutes}:${second}`;

        //decrease 1 s
        time--;
        //when 0 seconds stop timer and logout user
        if (time === 0) {
            clearInterval(timer);
            welcomeText.textContent = 'Log In';
            wholePageToShow.style.opacity = 0;
        }
    }, 1000)
    return timer;
}

let timer, set;


// const clearIn = function () {
//     let set = setInterval(function () {
//         if (inputCloseUser.value === currentPerson.userName && Number(inputClosePin.value) === currentPerson.pin) {
//             summaryValueInText.textContent === 0 && summaryValueOutText.textContent === 0 && balanceLabel.textContent === 0;
//         }
//         return set;
//     })
// }

//1. event handler when click on login button
//2. call function start log out ui in this function
btnLogIn.addEventListener('click', function (e) {
    e.preventDefault(); //prevent form from upload when clicking
    currentPerson = person.find(drink => drink.userName === loginInputUser.value);
    //console.log(currentPerson);
    if (currentPerson?.pin === Number(loginInputPin.value)) { // ? to make text shows undefined when wrong pin
        //display ul and message
        //  display message i use .split to select that account that was loged in to shows the name by select [0]
        welcomeText.textContent = `welcome back, ${currentPerson.founder.split(' ')[0]}`;
        wholePageToShow.style.opacity = 100;

        loginInputUser.value = loginInputPin.value = ''; //take the code out from input box
        loginInputPin.blur(); //get rid ot cursor
        //display movement
        drinkingRecord(currentPerson.drinking)
        //display balance
        printBalance(currentPerson);
        //display summary
        glassWaterSum(currentPerson.drinking);

        //logout timing
        if (timer) clearInterval(timer);
        timer = startLogOutTimer();

        // //login
        // if (set) clearInterval(set());
        // set = clearIn();
    }
});


//.....................................................................................................................

//use fin method to retrieve each element of array -- find method return only the first elememt while --filter method return all element
//Goal of find method is to find exactly one element
//---PRACTICE PART---

const findMethod = person1.drinking.find(drink => drink < 0);
console.log(findMethod);

const find = person.find(pr => pr.founder === 'Chonhichar Soythong');
console.log(find);


//balance of water
const glassWater = 1;
const totalIn = person1.drinking.filter(drink => drink > 0).reduce((cur, drink) => cur + drink, 0);
console.log(totalIn);


// const name = 'Warunee Soythong';

// const userName = name.toLowerCase().split(' ').map(function (word){
//     return word[0];
// }).join('');

//specify the condition
const add = person1.drinking.filter(function (drink) {
    return drink > 0;
})
console.log(person1.drinking);
console.log(add);

// balance the glass of water that have been drink
//way no.1
const balance = person1.drinking.reduce(function (drink, cur, i, arr) {
    console.log(`sum ${i}: ${drink}`);
    return drink + cur;
}, 0)
console.log(balance);

//way no.2
const baArrow = person1.drinking.reduce((drink, cur) => drink + cur, 0);
console.log(baArrow);

//way no3
let sumN = 0;
for (const drink of person1.drinking) sumN += drink;
console.log(sumN);












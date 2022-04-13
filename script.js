import {db, collection, query, getDocs, doc, addDoc, onSnapshot} from './app.js';

const transactionsUl = document.querySelector("#transactions");
const receitas = document.querySelector("#money-plus");
const despesas = document.querySelector("#money-minus");
const balance = document.querySelector("#balance");
const form = document.querySelector("#form");
const transactionNameDisplay = document.querySelector("#text");
const transactionAmountDisplay = document.querySelector("#amount");
//const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))

let transactions = []//localStorage.getItem('transactions') !== null ? localStorageTransactions : []

async function getTransactions(db) {
    
    /*const transactionsArray = [];
    const q = query(collection(db, "transactions"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {        
        querySnapshot.forEach((doc) => {
            transactionsArray.push(doc.data().name);
        });        
        console.log("Transactions name: ", transactionsArray.join(", "));        
    });    */
    
    const transactionsCol = collection(db, 'transactions');
    const transactionSnapshot = await getDocs(transactionsCol);    
    return transactionSnapshot.docs.map(doc => doc.data());
}

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id !== ID)
    //updateTransactionIntoLocalStorage();
    init();
}

const addTransactionIntoDOM = ({amount, name, id}) => {
    const operator = amount < 0 ? '-' : '+';
    const CSSClass = amount < 0 ? 'minus' : 'plus';
    const amountWithoutOperator = Math.abs(amount);    
    const li = document.createElement('li')
    li.classList.add(CSSClass);
    li.addEventListener('click', e => {
        transactionNameDisplay.value = name
        transactionAmountDisplay.value =amount
    })
    li.innerHTML = `
        ${name} <span> ${operator} R$ ${amountWithoutOperator} </span>                 
        <button class="delete-btn" onClick=removeTransaction(${id})>
            x
        </button>
    `
    transactionsUl.prepend(li);
}

const addTransactionToFirestore = async (name, amount) => {    
    
    const docRef = await addDoc(collection(db, "transactions"), {
        name: name,
        amount: Number(amount)
    });
    console.log("Document written with ID:", docRef.id);  
  
}

// const updateTransactionIntoLocalStorage = () => {
//     localStorage.setItem('transactions', JSON.stringify(transactions))
// }

const addToTransactionsArray = (name, amount) => {
    const transaction = {
        id: generateID(), 
        name:name, 
        amount:Number(amount)
    }

    transactions.push(transaction);
}

const cleanInputs = () => {
    transactionNameDisplay.value = ''
    transactionAmountDisplay.value = ''
}

const handleFormSubmit = event => {
    event.preventDefault()
    const transactionName = transactionNameDisplay.value.trim();
    const transactionAmount = transactionAmountDisplay.value.trim();
    const isSomeInputEmpty = (transactionName === '' || transactionAmount === '' )

    if(isSomeInputEmpty){
        alert('Favor preecher os campos')
        return
    }

    addTransactionToFirestore(transactionName, transactionAmount);
    //addToTransactionsArray(transactionName, transactionAmount);
    

    init();
    //updateTransactionIntoLocalStorage();
    cleanInputs();
}

const getExpenses = amount => {
    return Math.abs(amount
        .filter(value => value < 0)
        .reduce((acc, el) => acc + el, 0)).toFixed(2)
}

const getIncomes = amount => {
    return amount
        .filter(value => value > 0)
        .reduce((acc, el) => acc + el, 0).toFixed(2)
}

const getTotal = amount => amount.reduce((acc, el) => acc + el, 0).toFixed(2)

const updateBalanceTransactions = transactions => {
    const amount = transactions.map(({amount}) => amount)
    const income = getIncomes(amount)
    const outcome = getExpenses(amount)
    const total = getTotal(amount)
    receitas.textContent = `R$ ${income}`;    
    despesas.textContent = `R$ ${(outcome)}`;    
    balance.innerHTML = `R$ ${(total)}`    
}

const init = async () => {    
    transactionsUl.innerHTML = ''
    
    transactions = await getTransactions(db)    
    transactions.forEach( item => {        
        addTransactionIntoDOM(item)
    })    
    updateBalanceTransactions(transactions)
}

init();

const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', handleFormSubmit)
// transactionsUl.addEventListener('click', e => {
//     transactionNameDisplay.value = e.target.id
// })

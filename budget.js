// Declaring global varibles 
const data = [];
let total_expense = 0;
let initial_input = 0;
let total_balance = 0;
// Declaring class for creating objects per particular expense
class Expense{
    constructor(Expense_name,Expense_price){
        this.Expense_name = Expense_name;
        this.Expense_price = Expense_price;
    }
}
// Setting budget and display value of budget
function set_budget(){
    initial_input = Number(document.getElementById('initial_input').value);
    if(initial_input == " "){
        alert("PLEASE ENTER INPUT");
    }
    else{
        document.getElementById('initial_input_display').textContent = initial_input;
        total_balance = initial_input - total_expense;
        document.getElementById('total_balance_display').textContent = total_balance;
    }
}
// Adding extra amount in initial budget
function update_budget(){
    initial_input += Number(document.getElementById('update_input').value);
    document.getElementById('initial_input').value = initial_input;
    total_balance = initial_input - total_expense;
    document.getElementById('total_expense_display').textContent = total_expense;
    document.getElementById('total_balance_display').textContent = total_balance;
    document.getElementById('initial_input_display').textContent = initial_input;
    document.getElementById('update_input').value = "";
}
// Displays all expense
function show_(){
    let tbl = "";
    let local_data = JSON.parse(localStorage.getItem("DATA"));
    if(local_data !== null){
        local_data.map((val_,index_,array_)=>{
        tbl+= `
            <tr>
            <td>${val_.Expense_name}</td>
            <td>${val_.Expense_price}</td>
            </tr>    
        `
    })
    document.getElementById('record_show').innerHTML = tbl;
    document.getElementById('table_').style.display = "block";
    }
}
// Adding new expense in previous data if not exist then initializing array
function add_data(){
    let title_input = document.getElementById('title_input').value;
    let price_input = Number(document.getElementById('price_input').value);
    // if any of input is empty then data will not be added
    if(title_input == " " || price_input == " "){
        alert("not valid");
    }
    // else data will be checked and then added
    else{
        // If new expense is greater than balance it will not be added and one error will be shown
        if(price_input > total_balance){
            document.getElementById('message_').style.display = "block"
            setTimeout(function (){document.getElementById('message_').style.display = "none"},3000);    
            total_expense = total_expense;
            total_balance = total_balance;
            document.getElementById('total_expense_display').textContent = total_expense;
            document.getElementById('total_balance_display').textContent = total_balance;
        }
        else{
            total_expense += price_input;
            total_balance = initial_input - total_expense;
            document.getElementById('total_expense_display').textContent = total_expense;
            document.getElementById('total_balance_display').textContent = total_balance;
            let expense_obj = new Expense(title_input,price_input);
            data.push(expense_obj);
            localStorage.setItem("DATA",JSON.stringify(data));
        }
    }
    document.getElementById('title_input').value = "";
    document.getElementById('price_input').value = "";
    // Display data instantly
    show_();
}
function clear_(){
    // Clear value of budget
    document.getElementById('initial_input_display').innerHTML = "0";
    document.getElementById('initial_input').value = "";
}
function clear_history(){
    document.getElementById('table_').style.display = "none";
    localStorage.removeItem("DATA");
    // Method 2 for clear localstorage data// localStorage.clear();
}       
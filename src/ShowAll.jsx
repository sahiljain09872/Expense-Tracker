import React , {useState , useEffect} from 'react'
import { getCategories , getExpenses , getTotal } from './App'

import "./ShowAll.css"

export default function ShowAll({deleteExpense}){
    let totalExpense = getTotal();
    let ShowCategories = getCategories();
    let ShowExpenses = getExpenses();

    // create a state that will be changed whenever the delete button will be clicked
    let [state , setState] = useState(false);
    // so Now we have the expenses and the categories

    let [category , setCategory] = useState("All");
    let [categoryTotal , setCategoryTotal] = useState(0);

    useEffect(() => {
      setCategoryTotal(0);

      ShowExpenses.forEach(expense => {
        if(expense.category === category || category === "All"){
          setCategoryTotal(categoryTotal => categoryTotal+(parseInt(expense.price)))
        }
      })
    } , [category , ShowExpenses])

    function handleChange(e){
        setCategory(category => e.target.value);
    }

    function ExpenseItem({ expense , index }) {
        return (
          <div className='expense'>
            <h3>{expense.name}</h3>
            <span>{expense.price}</span>
            <span>{expense.category}</span>
            <span>{expense.date}</span>
            <span>
              {index >= 0 ? <button className='removeExpense' onClick={() => {
                deleteExpense(index);
                setState(state => !state);
                }}><i className="fa-solid fa-xmark"></i></button> : <span>  </span>}
            </span>
          </div>
        );
      }



    return (
        <div className='expensesAll'>

          {/* header of this sections */}
          <div className='categoryDropDown'>
            <span><h4 style={{color:"red"}}>Total Expense : {totalExpense}</h4></span>
            <select name="category" id="category" onChange={handleChange}>
                <option key="All" value="All">All</option>
              {/* add an option for every category */}
              {
                Array.from(ShowCategories).map(value => (
                  <option key={value} value={value}>{value}</option>
                ))
              }
            </select>
          </div>  

           


          {/* Now list down all the expenses */}

          <div className="list">
            <ExpenseItem key="headingList" expense={{name : "Spent On" , price : "Price" , category:"Type" , date:"Date"}} index={-1}/>
            {
                ShowExpenses.map(( expense , index) => (
                     // Now return a form of expense here
                    (category === expense.category || category === "All") ? <ExpenseItem key={`${expense.name}-${expense.date}-${index}`} expense={expense} index={index} /> : <></>
                ))
            }
          </div>



          <h4 style={{color:"red"}}>{category === "All" ? "Total Expense" : `Total Expense on ${category}`} : {categoryTotal}</h4>
        </div>
      );
      
}
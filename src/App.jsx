import React, { useState, useRef, useEffect } from "react";
import Form from "./Form.jsx";
import ShowAll from "./ShowAll.jsx";

import "./App.css";

export function getExpenses(){
  let expenses = localStorage.getItem("expenses");
  expenses = expenses ? JSON.parse(expenses) : [];
  return expenses;
}

export function getCategories(){
  let categories = localStorage.getItem("categories");
  categories = categories ? new Set(JSON.parse(categories)) : new Set();
  return categories;
}

export function getTotal(){
  let total = localStorage.getItem("total");
  let value = total ? parseInt(total) : 0;
  return value;
}

export default function App() {
  // let [expenses, setExpenses] = useState([]);
  let [ShowForm, setShowForm] = useState(false);
  let [totalExpense , setTotalExpense] = useState(0);

  function hideForm(){
    // this will set the ShowForm to false again
    setShowForm(false);
  }

  function addExpense(expense) {
    let expenses = getExpenses();
    expenses = [...expenses, expense];
    localStorage.setItem("expenses", JSON.stringify(expenses));
    // setExpenses([...expenses, expense]); // Correctly creates a new array with the new expense

    let categories = getCategories();
    categories.add(expense.category);
    localStorage.setItem("categories", JSON.stringify([...categories]));

    let total = getTotal();
    total += parseInt(expense.price);
    localStorage.setItem("total" , total.toString());

    setShowForm(false);
    setTotalExpense(totalExpense => totalExpense += expense.price);

  }

  function deleteExpense(index){
    let expenses = getExpenses();
    // remove the expense with index
    let total = getTotal();
    total -= parseInt(expenses[index].price);
    localStorage.setItem("total" , total.toString())
    expenses.splice(index , 1);

    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  return (
    <>
      {/* this will return the whole page */}

      {/* 1. heading */}
      <h1> Expensy </h1>
      {/* 2. Form to add new expense */}
      <button
        id="newButton"
        onClick={() => {
          setShowForm(true);
        }}
      >
        {" "}
        Add New Expense{" "}
      </button>
      <br />
      {ShowForm && <Form addExpense={addExpense} hideForm={hideForm}/>}
      {/* 3. show all expenses */}

      <ShowAll deleteExpense={deleteExpense}/>
      {/* 4. chart to show the statistics of your expenses */}
      {/* <Chart /> */}

    </>
  );
}

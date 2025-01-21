import "./Form.css";
import React , {useState , useEffect} from 'react'

let initialErrors = {
    name : true,
    category : true,
    price : true,
    date : true
}

let initialExpense = {
    name : "",
    category : "",
    price : 0,
    date : new Date()
}

export default function Form({addExpense , hideForm}){
    let [expense , setExpense] = useState(initialExpense);
    let [errors , setErrors] = useState(initialErrors);
    let [error , setError] = useState(true);

    function handleSubmit(e){
        e.preventDefault();
        addExpense(expense);
    }

    function handleChange(e){
        let {name , value} = e.target;
        if(value.trim() === ""){
            setErrors(errors => ({...errors , [name] : true}))
        }else{
            setErrors(errors => ({...errors , [name] : false}));
        }


        if(name === "price"){
            if(parseInt(value , 10) < 0){
                setErrors(errors => ({...errors , [name] : true}));
            }
            else{
                setErrors(errors => ({...errors , [name] : false}));
            }
        }

        if(name === "category"){
            value = value.toLowerCase().split(/[ ,;:-_]+/).join(" ");
        }

        if(name === "name"){
            value = value.charAt(0).toUpperCase() + value.slice(1);
        }


        setExpense((expense) => ({...expense , [name] : value}));
    }


    useEffect(() => {
        let hasError = Object.values(errors).some(error => error);
        setError(hasError);
    }, [errors]);

    const invalidStyle = {border:"2px solid red"};
    const validStyle = {border:"2px solid green"};

    
    return(<>

        <form action="#" className="form" onSubmit={handleSubmit}>
        <label>
            Name
            <input type="text" style={errors.name ? invalidStyle : validStyle} placeholder="expense Name" className="name"  name="name" onChange={handleChange}/>
        </label> <br />
        <label>
            Category
            <input type="text" style={errors.category ? invalidStyle : validStyle} placeholder="category" className="category"  name="category" onChange={handleChange}/>
        </label> <br />
        <label>
            Price
            <input type="number" style={errors.price ? invalidStyle : validStyle} className="expenseName"  name="price" onChange={handleChange}/>
        </label> <br />
        <label>
            Date
            <input type="date" style={errors.date ? invalidStyle : validStyle} className="expenseName"  name="date" onChange={handleChange}/>
        </label> <br />
        

        <div className="formButtons">
        <button id="addButton" disabled={error}>Add Expense</button> 
        <button id="hideButton" onClick={() => hideForm()}><i className="fa-solid fa-xmark"></i></button>
        </div>
        
        </form>
    </>)
}
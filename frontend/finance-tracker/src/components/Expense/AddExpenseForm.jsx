import React, { useState } from 'react'
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddExpenseForm = ({onAddExpense}) => {
    const [expense, setExpense] = useState({
        category: "",
        amount: "",
        date: "",
        icon: "",
    });

    const handleChange = (key, value) => setExpense({...expense, [key]: value});
  return (
    <div className="card max-w-lg mx-auto mt-6 p-6 bg-white rounded-2xl shadow-md border border-gray-200/50">
      <h2 className="text-xl font-semibold text-primary mb-6">Add Expense</h2>

      <EmojiPickerPopup 
            icon = {expense.icon}
            onSelects = {(selectedIcon) => handleChange("icon", selectedIcon) }
        />


        <Input 
            value= {expense.category}
            onChange={({target}) => handleChange('category', target.value)}
            label = "Expense Category"
            placeholder = "Food, rent, utilities, etc"
            type="text"
        />

        <Input 
            value= {expense.amount}
            onChange={({target}) => handleChange('amount', target.value)}
            label = "Amount"
            placeholder = ""
            type="Number"
        />

        <Input
            value= {expense.date}
            onChange={({target}) => handleChange('date', target.value)}
            label = "Date"
            placeholder = ""
            type="date"
        />

        <div className='flex justify-end mt-8'>
            <button
                type='button'
                className='add-btn add-btn-fill px-6 py-2 rounded-lg text-white bg-primary font-medium shadow hover:bg-primary-dark transition-colors duration-150'
                onClick={() => onAddExpense(expense)}
            >
                Add Expense
            </button>
        </div>
    </div>
  )
}

export default AddExpenseForm
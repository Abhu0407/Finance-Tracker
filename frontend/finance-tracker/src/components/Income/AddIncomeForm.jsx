import React, { useState } from 'react'
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddIncomeForm = ({onAddIncome}) => {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "",
    });

    const handleChange = (key, value) => setIncome({...income, [key]: value});
  return (
    <div className="card max-w-lg mx-auto mt-6 p-6 bg-white rounded-2xl shadow-md border border-gray-200/50">
      <h2 className="text-xl font-semibold text-primary mb-6">Add Income</h2>

      <EmojiPickerPopup 
            icon = {income.icon}
            onSelects = {(selectedIcon) => handleChange("icon", selectedIcon) }
        />


        <Input 
            value= {income.source}
            onChange={({target}) => handleChange('source', target.value)}
            label = "Income Source"
            placeholder = "Freelance, salary, etc"
            type="text"
        />

        <Input 
            value= {income.amount}
            onChange={({target}) => handleChange('amount', target.value)}
            label = "Amount"
            placeholder = ""
            type="Number"
        />

        <Input
            value= {income.date}
            onChange={({target}) => handleChange('date', target.value)}
            label = "Date"
            placeholder = ""
            type="date"
        />

        <div className='flex justify-end mt-8'>
            <button
                type='button'
                className='add-btn add-btn-fill px-6 py-2 rounded-lg text-white bg-primary font-medium shadow hover:bg-primary-dark transition-colors duration-150'
                onClick={() => onAddIncome(income)}
            >
                Add Income
            </button>
        </div>
    </div>
  )
}

export default AddIncomeForm
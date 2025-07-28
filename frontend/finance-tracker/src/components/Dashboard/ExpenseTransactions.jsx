import moment from 'moment'
import React from 'react'
import { LuArrowRight } from 'react-icons/lu';
import TransactinInfoCard from '../Cards/TransactinInfoCard';


const ExpenseTransactions = ({ transactions, onSeeMore, onDelete }) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Expenses</h5>

            <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowRight className='text-base' />
            </button>
        </div>

        <div className='mt-6'>
            {transactions?.slice(0,5)?.map((expense) => (
                <TransactinInfoCard
                    key= {expense._id}
                    title= {expense.category}
                    icon={expense.icon}
                    date = {moment(expense.date).format("Do MMM YYYY")}
                    amount = {expense.amount}
                    type="expense"
                    onDelete={() => onDelete(expense._id, 'Expense')}
                />
            ))}
        </div>
    </div>
  )
}

export default ExpenseTransactions
import React from 'react'
import { LuArrowRight } from 'react-icons/lu';
import moment from 'moment';
import TransactinInfoCard from '../Cards/TransactinInfoCard';

const RecentTransactions = ( { transactions, onSeeMore, onDelete }) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Recent Transactions</h5>

            <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowRight className='text-base' />
            </button>
        </div>

        <div className='mt-6'>
            {transactions && transactions.length > 0 ? (
                transactions.slice(0,5).map((item) => (
                    <TransactinInfoCard 
                        key ={item._id}
                        title = { item.type === 'Expense' ? item.category : item.source }
                        icon = {item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount={item.amount}
                        type={item.type === 'Expense' ? 'expense' : 'income'}
                        onDelete={() => onDelete(item._id, item.type)}
                    />
                ))
            ) : (
                <div className='text-center py-8 text-gray-500'>
                    <p>No recent transactions found</p>
                </div>
            )}
        </div>
    </div>
  )
}

export default RecentTransactions
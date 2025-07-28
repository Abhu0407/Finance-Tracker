import moment from 'moment'
import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactinInfoCard from '../Cards/TransactinInfoCard'

const IncomeList = ({ transactions, onDelete, onDownLoad, loading = false }) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Income Sources</h5>

            <button 
              className='card-btn' 
              onClick={onDownLoad}
              disabled={loading}
            >
                <LuDownload className='text-base' /> 
                {loading ? 'Downloading...' : 'Download'}
            </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2'>
            {transactions?.map((income) => (
                <TransactinInfoCard 
                    key ={income.id}
                    title = {income.source}
                    icon = {income.icon}
                    date = {moment(income.date).format("Do MMM YYYY")}
                    amount = {income.amount}
                    type="income"
                    onDelete={() => onDelete(income._id)}
                />
            ))}
        </div>
    </div>
  )
}

export default IncomeList
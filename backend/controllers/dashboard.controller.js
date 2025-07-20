import Income from "../models/income.model.js";
import Expense from "../models/expense.model.js";

import { isValidObjectId, Types } from "mongoose";

export const getDashboardData = async (req, res) => {
    try {
        const userId = req.user._id;
        const userObjectId = new Types.ObjectId(userId);

        // Fetch total income for the user
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        //console.log("totalIncome", { totalIncome, userId: isValidObjectId(userId) });

        // Fetch total expenses for the user
        const totalExpenses = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        // get income transaction in the last 60 days
        const incomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        // get total income in the last 60 days
        const totalIncomeLast60Days = incomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // get expense transaction in the last 30 days
        const expenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        // get total expense in the last 30 days
        const totalExpenseLast30Days = expenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // fetch last 5 transactions (income + expenxes)
        const lastTransactions = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "Income",
                })
            ),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "Expense",
                })
            ),
        ].sort((a, b) => b.date - a.date); // sort latest first


        // final response

        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpenses[0]?.total || 0),
            totalIncome : totalIncome[0]?.total || 0 ,
            totalExpense : totalExpenses[0]?.total || 0 ,
            last30DaysExpense : { total : totalExpenseLast30Days, transactions: expenseTransactions },
            last60DaysIncome : { total : totalIncomeLast60Days, transactions: incomeTransactions },
            recentTransaction: lastTransactions,
        });
    } catch (error) {
        console.log("Error in getDashboardData controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
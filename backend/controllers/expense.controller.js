import User from "../models/user.model.js";
import Expense from "../models/expense.model.js";
import xlsx from "xlsx";

// add Expense source
export const addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;

        //validation: check if all fields are provided
        if ( !category || !amount || !date ) {
            return res.status(400).json({ message: "Please provide all fields" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        
        res.status(200).json(newExpense);

    } catch (error) {
        console.log("Error in add Expense controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// get all Expense source
export const getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch (error) {
        console.log("Error in getAllExpense controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// delete a perticular Expense source
export const deleteExpense = async (req, res) => {
    
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.log("Error in delete Expense controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//download all Expense in Excel sheet
export const downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        // prepare data for excel sheet
        const data = expense.map((item) => ({
            category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book.new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "expense");
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_details.xlsx');

    } catch (error) {
        console.log("Error in Downloding controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
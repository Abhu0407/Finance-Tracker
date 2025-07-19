import User from "../models/user.model.js";
import Income from "../models/income.model.js";
import xlsx from "xlsx";

// add income source
export const addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body;

        //validation: check if all fields are provided
        if ( !source || !amount || !date ) {
            return res.status(400).json({ message: "Please provide all fields" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        
        res.status(200).json(newIncome);

    } catch (error) {
        console.log("Error in addIncome controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// get all income source
export const getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.json(income);
    } catch (error) {
        console.log("Error in getAllIncome controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// delete a perticular income source
export const deleteIncome = async (req, res) => {
    
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        console.log("Error in delete Income controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//download all income in Excel sheet
export const downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        // prepare data for excel sheet
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book.new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx');

    } catch (error) {
        console.log("Error in Downloding controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
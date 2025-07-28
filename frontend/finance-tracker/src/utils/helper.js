import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^s@]+$/;

    return regex.test(email);
};

export const getInitials = (name) => {
    if(!name) return '';

    const words = name.split(' ');
    let initial = "";

    for(let i=0;i<Math.min(words.length, 2);i++){
        initial += words[i][0];
    }

    return initial.toUpperCase();
};

export const addThousandsSeparator = (num) => {
    if(num==null || isNaN(num)) return '';

    const [ integerPart, fractionalPart ] = num.toString().split('.');

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g,",");

    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
    if (!Array.isArray(data)) return [];
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
    return sortedData.map((item) => ({
        month: item?.date ? moment(item.date).format("Do MMM") : "Unknown",
        amount: Number(item?.amount) || 0,
        category: item?.category || "Unknown",
    }));
};

export const prepareIncomeBarChartData = (data = []) => {
    if (!Array.isArray(data)) return [];
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
    return sortedData.map((item) => ({
        month: item?.date ? moment(item.date).format("Do MMM") : "Unknown",
        amount: Number(item?.amount) || 0,
        source: item?.source || "Unknown",
    }));
};

export const prepareExpenseLineChartData = (data= []) => {
    if (!Array.isArray(data)) return [];
    const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date));

    return sortedData.map((item) => ({
        month: item?.date ? moment(item.date).format("Do MMM") : "Unknown",
        amount: Number(item?.amount) || 0,
        category: item?.category || "Unknown",
    }));
}
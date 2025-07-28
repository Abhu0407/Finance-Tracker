import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverview from '../../components/Income/IncomeOverview';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPaths';
import Model from '../../components/Model';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';

function Income() {
  useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    date: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false); // 🔄 renamed for correctness

  // Fetch all income details
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATH.INCOME.GET_ALL_INCOME);

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log('Something went wrong. Please try again later.', error);
    } finally {
      setLoading(false);
    }
  };

  // Placeholder: Handle add income
  const handleAddIncome = async (income) => {
    const { source , amount, date, icon } = income;

    // validation check
    if(!source.trim()){
      toast.error("Source is required.");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <=0 ){
      toast.error("Amount should be a valid number greater then 0");
      return;
    }

    if(!date){
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATH.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();

    } catch (error) {
      console.error("Error adding income: ", error.response?.data?.message || error.message);

    }
  };

  // Placeholder: Delete income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATH.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error deleting income: ",
        error.response?.data?.message || error.message
      );
    }
  };

  // Handle download
  const handleDownloadIncomeDetails = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATH.INCOME.DOWNLOAD_INCOME, {
        responseType: "blob"
      });

      // Check if response is valid
      if (response.data && response.data.size > 0) {
        // create a URL for the blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "income_details.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success("Income details downloaded successfully!");
      } else {
        toast.error("No data available to download");
      }
    } catch (error) {
      console.error("Error downloading Income details: ", error.message);
      toast.error("Error downloading Income details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch income data on mount
  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions= {incomeData}
            onDelete = {(id) => {
              setOpenDeleteAlert({ show: true, data: id})
            }}
            onDownLoad = {handleDownloadIncomeDetails}
            loading={loading}
          />
        </div>

        <Model
          isOpen= {openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Model>
        
        <Model
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert 
            content= "Are you sure you want to delete this income detail?"
            onDelete = {() => deleteIncome(openDeleteAlert.data)}
          />
        </Model>

      </div>
    </DashboardLayout>
  );
}

export default Income;

import React from "react";
import DashboardLayout from '../../components/layouts/DashboardLayout';

const About = () => {
  return (
    <DashboardLayout activeMenu="About">
      <div className="card max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-md border border-gray-200/50">
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4">About Finance Tracker</h1>
      <p className="text-gray-700 text-base mb-4">
        Welcome to <span className="font-semibold text-primary">Finance Tracker</span>! Our platform is dedicated to helping you manage your finances efficiently and effectively. Track your income, expenses, and savings all in one place with easy-to-use tools and insightful analytics.
      </p>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Key Features</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>Track income and expenses</li>
          <li>Visualize your spending habits</li>
          <li>Set savings goals</li>
          <li>Generate financial reports</li>
          <li>Secure and private</li>
        </ul>
      </div>
      <p className="text-gray-700">
        Whether you're budgeting for personal use or managing your family accounts, <span className="font-semibold text-primary">Finance Tracker</span> provides a secure and user-friendly experience to support your financial goals.
      </p>
      <div className="mt-6 text-center">
        <span className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-medium shadow">Thank you for choosing Finance Tracker!</span>
      </div>
      </div>
    </DashboardLayout>
  );
};

export default About;

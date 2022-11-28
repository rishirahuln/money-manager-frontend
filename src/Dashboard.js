import React, { useEffect, useState } from "react";
import Card from "./Card";
import IncomeHist from "./IncomeHist";
import ExpenditureHist from "./ExpenditureHist";
import {
  getMonthlyIncome,
  getOverallIncome,
  getWeeklyIncome,
  getYearlyIncome,
} from "./api/income";
import {
  getMonthlyExpense,
  getOverallExpense,
  getWeeklyExpense,
  getYearlyExpense,
} from "./api/expense";

function Dashboard() {
  const [weeklyIncome, setWeeklyIncome] = useState([]);
  const [weeklyExpense, setWeeklyExpense] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState([]);
  const [monthlyExpense, setMonthlyExpense] = useState([]);
  const [yearlyIncome, setYearlyIncome] = useState([]);
  const [yearlyExpense, setYearlyExpense] = useState([]);
  const [overallIncome, setOverallIncome] = useState([]);
  const [overallExpense, setOverallExpense] = useState([]);

  const reports = [
    {
      period: "Weekly",
      income: weeklyIncome,
      expenditure: weeklyExpense,
    },
    {
      period: "Monthly",
      income: monthlyIncome,
      expenditure: monthlyExpense,
    },
    {
      period: "Yearly",
      income: yearlyIncome,
      expenditure: yearlyExpense,
    },
    {
      period: "Overall",
      income: overallIncome,
      expenditure: overallExpense,
    },
  ];

  useEffect(() => {
    fetchWeeklyIncome();
    fetchWeeklyExpense();
    fetchMonthlyIncome();
    fetchMonthlyExpense();
    fetchYearlyIncome();
    fetchYearlyExpense();
    fetchOverallIncome();
    fetchOverallExpense();
  }, []);

  async function fetchWeeklyIncome() {
    try {
      let weeklyIncomeData = await getWeeklyIncome();
      setWeeklyIncome(weeklyIncomeData.data[0].total);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchWeeklyExpense() {
    try {
      let weeklyExpenseData = await getWeeklyExpense();
      setWeeklyExpense(weeklyExpenseData.data[0].total);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchMonthlyIncome() {
    try {
      let monthlyIncomeData = await getMonthlyIncome();
      setMonthlyIncome(monthlyIncomeData.data[0].total);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchMonthlyExpense() {
    try {
      let monthlyExpenseData = await getMonthlyExpense();
      setMonthlyExpense(monthlyExpenseData.data[0].total);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchYearlyIncome() {
    try {
      let yearlyIncomeData = await getYearlyIncome();
      setYearlyIncome(yearlyIncomeData.data[0].total);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchYearlyExpense() {
    try {
      let yearlyExpenseData = await getYearlyExpense();
      setYearlyExpense(yearlyExpenseData.data[0].total);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchOverallIncome() {
    try {
      let overallIncomeData = await getOverallIncome();
      setOverallIncome(overallIncomeData.data[0].total);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchOverallExpense() {
    try {
      let overallExpenseData = await getOverallExpense();
      setOverallExpense(overallExpenseData.data[0].total);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
      </div>
      <div className="row">
        {reports.map((report, index) => {
          return <Card key={index} report={report} />;
        })}
        <IncomeHist />
        <ExpenditureHist />
      </div>
    </div>
  );
}

export default Dashboard;

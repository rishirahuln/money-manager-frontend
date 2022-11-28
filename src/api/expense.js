import axios from "axios";
import { config } from "../config";

export function addExpense(expenseData) {
  return axios.post(`${config.api}/transaction/expense/add`, expenseData, {
    headers: {
      Authorization: localStorage.getItem(`${config.storage_key}`),
    },
  });
}

export function listExpense() {
  return axios.get(`${config.api}/transaction/expense`, {
    headers: {
      Authorization: localStorage.getItem(`${config.storage_key}`),
    },
  });
}

export function getExpense(expenseId) {
  return axios.get(`${config.api}/transaction/expense/${expenseId}`, {
    headers: {
      Authorization: localStorage.getItem(`${config.storage_key}`),
    },
  });
}

export function updateExpense(expenseId, editedExpense) {
  return axios.put(
    `${config.api}/transaction/expense/${expenseId}`,
    editedExpense,
    {
      headers: {
        Authorization: localStorage.getItem(`${config.storage_key}`),
      },
    }
  );
}

export function getWeeklyExpense() {
  return axios.get(`${config.api}/transaction/weekly-expense`, {
    headers: {
      Authorization: localStorage.getItem(`${config.storage_key}`),
    },
  });
}

export function getMonthlyExpense() {
  return axios.get(`${config.api}/transaction/monthly-expense`, {
    headers: {
      Authorization: localStorage.getItem(`${config.storage_key}`),
    },
  });
}

export function getYearlyExpense() {
  return axios.get(`${config.api}/transaction/yearly-expense`, {
    headers: {
      Authorization: localStorage.getItem(`${config.storage_key}`),
    },
  });
}

export function getOverallExpense() {
  return axios.get(`${config.api}/transaction/overall-expense`, {
    headers: {
      Authorization: localStorage.getItem(`${config.storage_key}`),
    },
  });
}
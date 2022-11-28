import axios from "axios";
import { config } from "../config";

export function addIncome(incomeData) {
  return axios.post(`${config.api}/transaction/income/add`, incomeData, {
    headers: {
      Authorization: localStorage.getItem(`${config.storage_key}`),
    },
  });
}

export function listIncome() {
  return axios.get(`${config.api}/transaction/income`, {
    headers: {
      Authorization: localStorage.getItem(`${config.storage_key}`),
    },
  });
}

export function getIncome(incomeId) {
  return axios.get(`${config.api}/transaction/income/${incomeId}`, {
    headers: {
      Authorization: localStorage.getItem(`${config.storage_key}`),
    },
  });
}

export function updateIncome(incomeId, editedIncome) {
  return axios.put(
    `${config.api}/transaction/income/${incomeId}`,
    editedIncome,
    {
      headers: {
        Authorization: localStorage.getItem(`${config.storage_key}`),
      },
    }
  );
}

export function getWeeklyIncome() {
  return axios.get(`${config.api}/transaction/weekly-income`, {
    headers: {
      Authorization: localStorage.getItem(`${config.storage_key}`),
    },
  });
}

export function getMonthlyIncome() {
  return axios.get(`${config.api}/transaction/monthly-income`, {
    headers: {
      Authorization: localStorage.getItem(`${config.storage_key}`),
    },
  });
}

export function getYearlyIncome() {
  return axios.get(`${config.api}/transaction/yearly-income`, {
    headers: {
      Authorization: localStorage.getItem(`${config.storage_key}`),
    },
  });
}

export function getOverallIncome() {
  return axios.get(`${config.api}/transaction/overall-income`, {
    headers: {
      Authorization: localStorage.getItem(`${config.storage_key}`),
    },
  });
}
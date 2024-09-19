import axios from "axios";

export const BASE_URL = "https://dev6.dansmultipro.com";

export const getListJobs = async ({desc, loc, fullTime}) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/recruitment/positions.json?description=${desc}&location=${loc}&full_time=${fullTime}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log('test response', response)
    return response;
  } catch (error) {
    return error;
  }
};

export const getJobDetail = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/recruitment/positions/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

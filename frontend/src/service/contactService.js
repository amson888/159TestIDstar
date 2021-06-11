import axios from "axios";

const contactService = {
  baseUrl: process.env.REACT_APP_API_BASE_URL,
  get: async function (id = undefined) {
    if (id)
      return (await axios.get(`${this.baseUrl}/contact/${id}`)).data.data;
    
    return (await axios.get(`${this.baseUrl}/contact`)).data.data;
  },
  put: async function ({id, firstName, lastName, photo, age}) {
    return (await axios.put(`${this.baseUrl}/contact/${id}`, {firstName, lastName, photo, age})).data;
  },
  post: async function ({firstName, lastName, photo, age}) {
    return (await axios.post(`${this.baseUrl}/contact`, {firstName, lastName, photo, age})).data;
  },
  delete: async function (id) {
    return (await axios.delete(`${this.baseUrl}/contact/${id}`)).data;
  }
};

export default contactService;
import axios from "axios";

export const ApiAuth = (token) => {
  return (
    axios.create({
      baseURL: 'http://localhost:1337/',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  )
}
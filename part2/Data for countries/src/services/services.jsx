import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getData = () => {
  return axios
    .get(baseUrl)
    .then(response => {
      console.log('request fulfilled')
      return response.data
    })
    .catch(error => {
      console.log('request failed:', error)
      throw error
    })
}

export default { getData }
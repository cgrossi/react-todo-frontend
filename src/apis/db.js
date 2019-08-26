import axios from 'axios'

export default axios.create({
  baseURL: 'https://todo-api-6543.herokuapp.com/api'
})
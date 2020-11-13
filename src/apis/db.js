import axios from 'axios'

export default axios.create({
  baseURL: 'https://rocky-cliffs-54570.herokuapp.com/api'
})
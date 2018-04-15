const axios = require('axios');
const API_KEY = require('../config.js');

class Movies {

	getLatests() {
		console.log("fetch data ...")
		return axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US`)
		.then( (res) => {
			console.log(res.data)
		})
    }

}

module.exports = Movies;
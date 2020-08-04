const axios = require('axios')

exports.Search = async function Search(key) {
    let config = {
        method: 'get',
        url: `https://api.jikan.moe/v3/search/anime?q=${key}`,
    }
    let response = await axios(config)
    return response.data.results
}

exports.Details = async function Details(id) {
    let config = {
        method: 'get',
        url: `https://api.jikan.moe/v3/anime/${id}`,
    }
    let response = await axios(config)
    return response.data
}
// BASE URL https://api.themoviedb.org/3/

//      /movie/now_playing?api_key=deec13ad83de48e47dcb58df8a9bb2c7&language=pt-BR

import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
})
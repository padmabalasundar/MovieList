// Api calls handler

import axios from 'axios';
import {API_KEY,BASE_URL} from '../config/constants' 

//API call to search for a movie based on the input text
export const fetchMovies = async (search, movies) => {
    console.log('api_handler.js fetching movies with search item:', search);
    
    if (!search) { // Search text not available - Default search  - trending list for the day
        const response = await axios.get(`${BASE_URL}trending/all/day?api_key=${API_KEY}`);
      return [...movies, ...response.data.results];
    } else { //Search text available
      const response = await axios.get(
        `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${search}`
      );
      return [...response.data.results];
    }
};
  
//API call to fetch the Crew details of the selected movie
export const fetchCredits =async (id) => {
  try{
    const response = await axios.get(`${BASE_URL}movie/${id}/credits?api_key=${API_KEY}`, {
      append_to_response: 'genere,budget',
    })
    console.log("api_handler.js fetching credits  response :",response.data.crew);

    //Fetch the director details
    const director = response.data.crew.find(
      (dir) => dir.known_for_department === 'Directing'
    );
    const credits = response.data;
    return { director: director, credits: credits };
  }
  catch(error){
    console.log("api_handler.js Error while fetching crew details",error)
    return { director: '', credits: null };
  }
    
    
};
  
//API call to fetch the Budget and Genre details of the selected movie
export const fetchDetails =async (id) => {
    const response = await axios.get(`${BASE_URL}movie/${id}?api_key=${API_KEY}`)
      console.log("api_handler.js fetching details  response :",response.data);
  
      //Fetch the genre details
      let genre = []
      response.data.genres.forEach(element => {
        genre.push(element.name)
      })
     
      return { genre: genre, budget: response.data.budget };
    
};
  
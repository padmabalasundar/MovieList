import React, {useEffect, useState } from 'react'; 
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import ProgressBar from './ProgressBar';
import {fetchDetails} from '../api_handlers/api_handler'
import {checkEmptyArray} from '../util/util'

const screen = Dimensions.get('window');


const InfoCard = ({ movie, director }) => {

  const [details, setDetails] = useState(null);

  useEffect(()=>{
    fetchDetails(movie.id).then((data)=>{
      console.log("DetailsScreen.js details",data)
      setDetails(data)
      
  })
  },[])

  const renderGenre =() =>{
    console.log("genre",details.genre)
    return (
      details.genre.map((item,index) => {
        return (
         <View key={item+index}><Text style={styles.genreText}>{item}  </Text></View> 
        )
      })
    )
  }

  return (
    <View style={styles.infoCard}>
      <Image
        source={{
          uri: `http://image.tmdb.org/t/p/w780${movie?.poster_path}`,
        }}
        style={styles.poster}
      />
      <View style={styles.textInfo}>
        
        <Text style={{ color: 'white', fontWeight: 'bold' }}>PLOT</Text>
        <Text style={{ color: 'white', fontSize: 11 }}>
          {movie.overview}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Rating </Text>
          <ProgressBar vote_average={movie.vote_average} />
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {movie.vote_average} / 10
          </Text>
        </View>
        {
          director && 
          <>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Director</Text>
          <Text style={{ color: 'white', fontSize: 10 }}>{director?.name}</Text>
          </>
        }
       
        <>
        {
         details!==null && details!==undefined && details.budget !== 0 &&
          <>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Budget</Text>
          <Text style={{ color: 'white', fontSize: 10 }}>{details.budget/1000000} Million USD</Text>
          </>
        }
         {
         details !==null && details!==undefined && !checkEmptyArray(details.genre) &&
          <>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Genre</Text>
          <Text style={{ color: 'white', fontSize: 10 }}>{renderGenre()}</Text>
          </>
        }
        </>
      </View>
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  infoCard: {
  bottom: 10,
   left: 10,
   right: 10,
  top: 10,
   paddingRight: 10,
    backgroundColor: 'rgba(21,21,21,0.5)',
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  poster: {
    width: screen.width * 0.3,
  },
  textInfo: {
    left: 10,
    right: 10,
    flex: 1,
    justifyContent: 'space-evenly',
    marginRight:9
  },
  genreText: {
      color: 'white',
      fontSize: 11,
      fontWeight: '300',
  }
});

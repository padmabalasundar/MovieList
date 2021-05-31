import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import LoadingScreen from '../components/LoadingScreen'
import { fetchMovies } from "../api_handlers/api_handler";

const screen = Dimensions.get('screen');

const HomeScreen = ({ navigation }) => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchNow, setSearchNow] = useState(false);

    //fetch movie and store them in movies state

    useEffect(() => {
        setLoading(true);
        fetchMovies(searchTerm, movies).then((data) => {
            console.log("data", data)
            setMovies(data);
            setLoading(false);
        });
    }, [searchNow]);

    return loading ? (
        <LoadingScreen />
    ) : (
        <View style={styles.container}>
            {/* ------------------ Banner of the First movie in the List ------------- */}
            <View>
                <Image
                    source={{
                        uri: `http://image.tmdb.org/t/p/w780${movies[0]?.backdrop_path}`,
                    }}
                    style={styles.banner}
                />
                <View style={styles.bannerInfoCard}>
                    <Text style={styles.bannerTitle}>
                        {movies[0]?.original_title.substr(0, 50)}
                    </Text>
                    <Text style={styles.bannerOverview}>
                        {movies[0]?.overview.substr(0, 200) + '...'}
                    </Text>
                </View>
            </View>

            {/* ---------------- Search Box--------------  */}
            <View>
                <View style={styles.inputCard}>
                    <TextInput
                        style={styles.input}
                        placeholder={'Movie to search...'}
                        value={searchTerm}
                        onChangeText={(text) => setSearchTerm(text)}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setSearchNow(!searchNow);
                        }}>
                        <Icon
                            name={searchTerm ? 'magnify' : 'refresh'}
                            size={20}
                            color="black"
                            style={{ alignSelf: 'center', marginHorizontal: 20 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* ------------------- Movie List--------------------- */}

            <View style={styles.movieListCard}>
                <FlatList
                    data={movies}
                    numColumns={2}
                    keyExtractor={(item,index) => index}
                    renderItem={({ item,index}) => {
                        return (
                            <Card style={styles.movieCard}>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('Details', { movie: item })
                                    }>
                                    <Image
                                        source={{
                                            uri: `http://image.tmdb.org/t/p/w780${item.poster_path}`,
                                        }}
                                        style={{ width: wp('48%'), height: wp('48%')}}
                                    />
                                </TouchableOpacity>
                            </Card>
                        );
                    }}
                />
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    banner: { width: screen.width, height: 200 },
    bannerInfoCard: {
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 10,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(21,21,21,0.5)',
    },
    bannerTitle: {
        color: 'white',
        fontSize: 20,
        letterSpacing: 1.2,
    },
    bannerOverview: {
        color: 'grey',
        fontSize: 13,
        letterSpacing: 1.2,
    },
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#212121',
    },
    inputCard: {
        position: 'absolute',
        top:-hp('2%'),
        margin: 20,
        left: 10,
        right: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 5,
        zIndex: 100,
    },
    input: {
        padding: 10,
        flex: 1,
    },
    movieCard: {
        height: wp('50%'),
       overflow: 'hidden',
        borderWidth: 5,
        borderRadius: 5,
    },
    movieListCard: {
        top: hp('8%'),
    },
});

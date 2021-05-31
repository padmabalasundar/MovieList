import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import ProfileThumb from '../components/ProfileThumb';
import BackButton from '../components/BackButton';
import InfoCard from '../components/InfoCard';
import LoadingScreen from '../components/LoadingScreen'
import { fetchCredits } from '../api_handlers/api_handler';
import { checkEmptyArray } from '../util/util';
const screen = Dimensions.get('window');

export default function DetailsScreen({ navigation, route }) {
    const [credits, setCredits] = useState(null);
    const [loading, setLoading] = useState(true);
    const [director, setDirector] = useState('');
    const { movie } = route.params;

    useEffect(() => {
        setLoading(true);
        fetchCredits(movie.id).then((data) => {
            setCredits(data.credits);
            setDirector(data.director);
            setLoading(false);
        });
    }, []);

    return loading ? (
        <LoadingScreen />
    ) : (
        <View style={styles.container}>

            <View>
                <BackButton navigation={navigation} />
                <Image
                    source={{
                        uri: `http://image.tmdb.org/t/p/w780${movie?.backdrop_path}`,
                    }}
                    style={styles.banner}
                />
                <View><Text style={styles.titleText}>{movie.original_title}</Text></View>
            </View>
            <View>
                <InfoCard movie={movie} director={director} />
            </View>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, justifyContent: "space-around" }}
            >
                {
                    credits &&
                    <View style={styles.credit}>
                        {
                            !checkEmptyArray(credits.cast) && // Display Cast details only if available
                            <>
                                <Text style={styles.title}>CAST</Text>

                                <FlatList
                                    data={credits.cast}
                                    keyExtractor={(item,index) => index}
                                    renderItem={({ item }) => <ProfileThumb item={item} />}
                                    horizontal
                                />

                            </>
                        }
                        {!checkEmptyArray(credits.crew) && // Display Crew details only if available
                            <>
                                <Text style={styles.title}>CREW</Text>

                                <FlatList
                                    data={credits.crew}
                                    keyExtractor={(item,index) => index}
                                    renderItem={({ item }) => <ProfileThumb item={item} />}
                                    horizontal
                                />

                            </>
                        }
                    </View>
                }

            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    banner: { width: screen.width, height: 200 },

    credit: {
        flex: 1,
        padding: 10,
        height: 350
    },

    container: {
        flex: 1,
        paddingTop: screen.statusBarHeight,
        backgroundColor: '#212121'
    },
    titleText: {
        position: "absolute",
        top: -60,
        left: 10,
        color: 'white',
        fontSize: 20,
        letterSpacing: 1.5,
        fontWeight: 'bold',
    },
    title: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

import React from 'react'
import {View, Text,StyleSheet} from 'react-native'
import BackButton from '../components/BackButton';

 const HelloWorld = ({ navigation, route }) => {
    return(
        <View style={styles.container}>
            <Text>Hello World!!</Text>
            <Text>Have a Great Day !!!</Text>
            <BackButton navigation={navigation} />
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        flex:1 ,
        alignItems:"center",
        justifyContent:"center"
    }
})
export default HelloWorld;


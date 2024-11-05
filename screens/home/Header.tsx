import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = () => {
    return (

        <View style={styles.container}>
            <View style={{ marginLeft: 20 }}>
                <Text style={styles.text}>Hello,</Text>
                <Text style={styles.text}>Tuan Anh</Text>
            </View>
            <Image source={require('../../image/img_tuananh.jpg')}
                style={styles.img} />
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', marginTop: 20
    },
    text: {
        fontSize: 30, fontWeight: 'bold', color: '#7C56DC'
    },
    img: {
        objectFit: 'contain',
        width: 80,
        height: 80,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 25,
        left: 150
    }
})
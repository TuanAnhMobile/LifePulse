import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const VideoDetail = ({ route, navigation }) => {
    const { videoId, videoTitle } = route.params;
    const videoUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                    style={styles.backButton}>
                    <Image source={require('../../icon/back.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>{videoTitle}</Text>
            </View>

            <View style={styles.videoContainer}>
                <WebView
                    source={{ uri: videoUrl }}
                    style={styles.webview}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                />
            </View>

            <View style={{padding:20}}>
                 <Text style={{color:'white',fontSize:20}}>
                 Yoga là một môn tập luyện cổ xưa bao gồm các tư thế thể chất, sự tập trung và hít thở sâu.
                  Triết lý tổng thể của yoga là kết nối tâm trí, cơ thể và tinh thần.
                   Một buổi tập yoga thường xuyên có thể giúp tăng sức bền, sức mạnh, sự bình tĩnh, linh hoạt và hạnh phúc
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#242B34'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    backButton: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#55547A',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#7C56DC',
        marginLeft:20
    },
    videoContainer: {
        width: "100%",
        height: 250,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'white',
        marginTop: 20
    },
    webview: {
        width: Dimensions.get('window').width,
        height: '100%',
    },
});

export default VideoDetail;

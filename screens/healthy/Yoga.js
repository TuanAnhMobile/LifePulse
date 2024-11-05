import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';

const Yoga = ({ navigation }) => {
    const mainVideoId = "g_tea8ZNk5A"; // ID video YouTube chính
    const mainVideoUrl = `https://www.youtube.com/embed/${mainVideoId}`;

    // Danh sách các video liên quan
    const relatedVideos = [
        { id: 'mFxVoF-tbOk', title: 'Bài tập Yoga nâng cao' },
        { id: 'iSS4asEmIfE', title: 'Yoga cho người mới bắt đầu' },
        { id: 'd_yc8006Y3M', title: 'Yoga thư giãn' },
        // Thêm các video liên quan khác
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Main') }}
                    style={styles.backButton}>
                    <Image source={require('../../icon/back.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Yoga</Text>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Main') }}
                    style={styles.backButton}>
                    <Image source={require('../../icon/ic_heart.png')} />
                </TouchableOpacity>
            </View>

            <View style={styles.videoContainer}>
                <WebView
                    source={{ uri: mainVideoUrl }}
                    style={styles.webview}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.description}>Video hướng dẫn tập Yoga cơ bản cho người mới bắt đầu. Hãy cùng tập luyện để cải thiện sức khỏe và tinh thần.</Text>

                <Text style={styles.relatedTitle}>Video liên quan</Text>
                <View style={styles.relatedVideos}>
                    {relatedVideos.map((video, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.relatedVideo}
                            onPress={() => navigation.navigate('Detail', { videoId: video.id, videoTitle: video.title })}
                        >
                            <Text style={styles.relatedVideoTitle}>{video.title}</Text>
                            <WebView
                                source={{ uri: `https://www.youtube.com/embed/${video.id}` }}
                                style={styles.relatedWebview}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                            />
                        </TouchableOpacity>
                        
                        
                    ))}
                </View>
            </ScrollView>
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
        justifyContent: 'space-between',
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
        fontSize: 30,
        fontWeight: 'bold',
        color: '#7C56DC',
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
    scrollContent: {
        padding: 20,
    },
    description: {
        color: 'white',
        fontSize: 16,
        marginBottom: 20
    },
    relatedTitle: {
        color: '#7C56DC',
        fontSize: 24,
        marginBottom: 10
    },
    relatedVideos: {
        flexDirection: 'column',
    },
    relatedVideo: {
        marginBottom: 20,
    },
    relatedWebview: {
        width: Dimensions.get('window').width - 40,
        height: 200,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
    },
    relatedVideoTitle: {
        color: 'white',
        fontSize: 16,
        marginBottom: 10
    }
});

export default Yoga;

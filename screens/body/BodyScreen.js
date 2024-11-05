import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const BodyScreen = ({ navigation }) => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const user = auth().currentUser;
        if (user) {
            setUserId(user.uid);
        } else {
            Alert.alert('Error', 'User is not authenticated');
        }
    }, []);

    const handleAddBody = async () => {
        try {
            await firestore().collection('user').doc(userId).update({
                height: height,
                weight: weight,
                gender: gender,
                profileCompleted: true  
          //khi ng dùng hoàn thành nhập đủ các thông tin sẽ là true và cập nhật Database
         //và trong những lần tiếp theo khi trạng thái đã là true rồi sẽ điều hướng thẳng đến màn hình chính 
            });
            Alert.alert('Success', 'Body information updated successfully!');
            navigation.navigate('Main');
        } catch (error) {
            Alert.alert('Error', 'Failed to update body information');
            console.error('Error updating document: ', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <View style={styles.magin}>
                    <TextInput
                        placeholder='Height (m)'
                        style={styles.textinput}
                        value={height}
                        onChangeText={setHeight}
                    />
                </View>

                <View style={styles.magin}>
                    <TextInput
                        placeholder='Weight (kg)'
                        style={styles.textinput}
                        value={weight}
                        onChangeText={setWeight}
                    />
                </View>

                <View style={styles.magin}>
                    <TextInput
                        placeholder='Gender'
                        style={styles.textinput}
                        value={gender}
                        onChangeText={setGender}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleAddBody}>
                    <Text style={{ alignSelf: 'center', color: 'white' }}>
                        OK
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BodyScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#37386E',
        justifyContent: 'center'
    },
    form: {
        borderRadius: 30,
        backgroundColor: '#55547A',
        margin: 10,
        padding: 20,
        height: 380,
        bottom: 10,
        width: 360,
        alignSelf: 'center'
    },
    textinput: {
        backgroundColor: '#181A26',
        borderRadius: 15,
        paddingLeft: 5,
        color: 'white'
    },
    magin: {
        margin: 15
    },
    button: {
        backgroundColor: '#5854C2',
        borderRadius: 15,
        padding: 10,
        top: 20
    }
});

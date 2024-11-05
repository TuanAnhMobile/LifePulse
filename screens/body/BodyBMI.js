import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LottieView from 'lottie-react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const BodyBMI = ({navigation}) => {
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [BMI, setBMI] = useState(null);
  const [recommendation, setRecommendation] = useState('');
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      const unsubscribe = firestore()
        .collection('user')
        .doc(user.uid)
        .onSnapshot(doc => {
          if (doc.exists) {
            const data = doc.data();
            const height = parseFloat(data.height);
            const weight = parseFloat(data.weight);
            const gender = data.gender;
            setHeight(height);
            setWeight(weight);
            setGender(gender);

            if (!isNaN(height) && !isNaN(weight) && height > 0) {
              calculateBMI(height, weight);
            } else {
              console.log('Invalid height or weight');
            }
          }
        });
      return () => unsubscribe();
    }
  }, []);

  const calculateBMI = (height, weight) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    setBMI(bmi.toFixed(2));
    generateRecommendation(bmi);
  };

  const generateRecommendation = bmi => {
    if (bmi < 18.5) {
      setRecommendation('Bạn đang dưới cân. Bạn nên bổ sung những món ăn này:');
      setFoodList([
        {name: 'Thịt bò', image: require('../../food/thitbo.jpg')},
        {name: 'Chuối', image: require('../../food/chuoi.jpg')},
        {name: 'Sữa', image: require('../../food/sua.jpg')},
        {name: 'Các loại hạt', image: require('../../food/ngucoc.jpg')},
        {name: 'Trứng', image: require('../../food/trung.jpg')},
      ]);
    } else if (bmi >= 18.5 && bmi < 24.9) {
      setRecommendation(
        'Bạn có cân nặng bình thường. Bạn nên tiếp tục duy trì những món ăn này:',
      );
      setFoodList([
        {name: 'Rau xanh', image: require('../../food/rauxanh.jpg')},
        {name: 'Trái cây', image: require('../../food/traicay.jpg')},
        {name: 'Thịt gà', image: require('../../food/thitga.jpg')},
        {name: 'Cá', image: require('../../food/ca.jpg')},
        {name: 'Ngũ cốc', image: require('../../food/ngucoc.jpg')},
      ]);
    } else if (bmi >= 25 && bmi < 29.9) {
      setRecommendation('Bạn đang thừa cân. Bạn nên bổ sung những món ăn này:');
      setFoodList([
        {name: 'Rau', image: require('../../food/rauxanh.jpg')},
        {name: 'Trái cây', image: require('../../food/traicay.jpg')},
        {name: 'Thịt nạc', image: require('../../food/thitnac.jpg')},
        {name: 'Cá', image: require('../../food/ca.jpg')},
        {name: 'Ngũ cốc nguyên hạt', image: require('../../food/ngucoc.jpg')},
      ]);
    } else {
      setRecommendation('Bạn bị béo phì. Bạn nên bổ sung những món ăn này:');
      setFoodList([
        {name: 'Rau xanh', image: require('../../food/rauxanh.jpg')},
        {name: 'Trái cây', image: require('../../food/traicay.jpg')},
        {name: 'Thịt gà không da', image: require('../../food/thitga.jpg')},
        {name: 'Cá', image: require('../../food/ca.jpg')},
        {name: 'Ngũ cốc nguyên hạt', image: require('../../food/ngucoc.jpg')},
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Main');
          }}>
          <Image
            source={require('../../icon/back.png')}
            style={{marginLeft: 20, marginTop: 20}}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Full Body</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <View>
          <LottieView
            style={styles.lottie}
            source={require('../../animations/body.json')}
            autoPlay
            loop
          />
        </View>
        <View style={{top: 50, right: 80}}>
          <Text style={styles.infoText}>Giới tính: {gender}</Text>
          <Text style={styles.infoText}>Chiều cao: {height} cm</Text>
          <Text style={styles.infoText}>Cân nặng: {weight} kg</Text>
          {BMI && <Text style={styles.infoText}>BMI: {BMI}</Text>}
        </View>
      </View>

      <ScrollView style={styles.recommendationContainer}>
        <Text style={styles.recommendationText}>{recommendation}</Text>
        <FlatList
          data={foodList}
          renderItem={({item}) => (
            <View style={styles.foodItem}>
              <Image source={item.image} style={styles.foodImage} />
              <Text style={styles.foodName}>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </View>
  );
};

export default BodyBMI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDCCDD',
  },
  lottie: {
    width: 280,
    height: 280,
    top: 20,
    right: 25,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#7C56DC',
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  infoText: {
    fontSize: 20,
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginTop: 20,
  },
  recommendationContainer: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  recommendationText: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  foodImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 15,
  },
  foodName: {
    fontSize: 18,
    color: 'black',
  },
});

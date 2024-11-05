import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const CONTENT_LIST = [
  {
    id: '1',
    title: 'Tư vấn tâm lí',
    image: require('../../icon/ic_tamli.png'),
    screen: 'UserMain', // Màn hình người dùng mặc định
  },
  {
    id: '2',
    title: 'Hoạt động tinh thần',
    image: require('../../icon/ic_tinhthan.png'),
    screen: 'Gratitude',
  },
  {
    id: '3',
    title: 'Ăn uống',
    image: require('../../icon/ic_eat.png'),
    screen: 'BodyBMI',
  },
  {
    id: '4',
    title: 'Hoạt động thể chất',
    image: require('../../icon/ic_thechat.png'),
    screen: 'Run',
  },
  {
    id: '5',
    title: 'Ngủ nghỉ',
    image: require('../../icon/ic_ngu.png'),
    screen: 'Heart',
  },
  {
    id: '6',
    title: 'Luyện tập',
    image: require('../../icon/ic_luyentap.png'),
    screen: 'Yoga',
  },
];

const Content = () => {
  const [role, setRole] = useState(null);
  const [bmi, setBmi] = useState(''); // State for BMI value
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRole = async () => {
      const user = auth().currentUser;
      if (user) {
        const userDoc = await firestore()
          .collection('user')
          .doc(user.uid)
          .get();
        if (userDoc.exists) {
          const data = userDoc.data();
          setRole(data.role); // Lưu vai trò của người dùng
          setBmi(data.bmi); // Set BMI value from Firestore
        }
      }
    };

    fetchRole();
  }, []);

  const handlePress = screen => {
    // Điều hướng đến màn hình người dùng mặc định nếu vai trò chưa được xác định
    if (role === 'expert' && screen === 'UserMain') {
      navigation.navigate('ExpertMain');
    } else {
      navigation.navigate(screen);
    }
  };

  return (
    <View style={styles.container}>
      {CONTENT_LIST.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.itemContainer}
          onPress={() => handlePress(item.screen)}>
          <Image
            source={item.image}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../../image/ic_logout.png')}
            style={{objectFit: 'contain', width: 40, height: 40}}
          />
          <Text style={{color: 'black', marginTop: 10, left: 5}}>
            Đăng xuất
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.bmiContainer}>
        <Text style={styles.bmiLabel}>BMI (Body Mass Index)</Text>
        <View style={styles.chartContainer}>
          <Image
            source={require('../../icon/ic_chart.png')}
            style={styles.chartImage}
          />
          <Text style={styles.bmiValue}> 21.22{bmi}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: 10,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 30,
    flex: 1, // Ensure the container stretches to fill its parent
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '48%', // Width of each item
  },
  image: {
    width: 35,
    height: 35,
  },
  text: {
    color: 'black',
    fontSize: 15,
    flex: 1,
    marginLeft: 10,
  },
  bmiContainer: {
    marginTop: 20,
  },
  bmiLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  chartContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartImage: {
    width: 150,
    height: 150,
  },
  bmiValue: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Content;

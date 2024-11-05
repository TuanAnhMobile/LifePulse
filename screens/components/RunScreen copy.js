import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ImageBackground,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import {request, PERMISSIONS} from 'react-native-permissions';
import {filter} from 'rxjs/operators';
import firestore from '@react-native-firebase/firestore';
import Slide from '../home/Slide';

const RunScreen = () => {
  const [steps, setSteps] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [lastAcceleration, setLastAcceleration] = useState({x: 0, y: 0, z: 0});
  const [goalReached, setGoalReached] = useState(false);
  const [stepGoal, setStepGoal] = useState(null); // Không có giá trị mặc định
  const [inputGoal, setInputGoal] = useState('');

  useEffect(() => {
    const requestPermission = async () => {
      if (Platform.OS === 'android') {
        const result = await request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION);
        if (result === 'granted') {
          startAccelerometer();
        }
      } else {
        startAccelerometer();
      }
    };

    requestPermission();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [subscription]);

  const startAccelerometer = () => {
    setUpdateIntervalForType(SensorTypes.accelerometer, 100); // 100ms

    const accelSubscription = accelerometer
      .pipe(
        filter(({x, y, z}) => {
          const acceleration = Math.sqrt(x * x + y * y + z * z);
          return acceleration > 10.0;
        }),
      )
      .subscribe(({x, y, z}) => {
        const deltaX = Math.abs(x - lastAcceleration.x);
        const deltaY = Math.abs(y - lastAcceleration.y);
        const deltaZ = Math.abs(z - lastAcceleration.z);

        if (deltaX > 1 || deltaY > 1 || deltaZ > 1) {
          setSteps(prevSteps => prevSteps + 1);
        }

        setLastAcceleration({x, y, z});
      });

    setSubscription(accelSubscription);
  };

  useEffect(() => {
    if (stepGoal !== null && steps >= stepGoal && !goalReached) {
      setGoalReached(true);
      saveStepsToFirestore(steps);
    }
  }, [steps]);

  const saveStepsToFirestore = async steps => {
    try {
      await firestore().collection('steps').add({
        date: new Date().toISOString(),
        steps: steps,
      });
      console.log('Lưu bước chân vào Firestore thành công!');
    } catch (error) {
      console.error('Lỗi khi lưu bước chân vào Firestore:', error);
    }
  };

  const handleSetGoal = () => {
    const goal = parseInt(inputGoal);
    if (!isNaN(goal) && goal > 0) {
      setStepGoal(goal);
      setGoalReached(false);
      setSteps(0);
    }
  };

  return (
    <ImageBackground
      source={require('../../image/bgr_run.jpg')}
      style={styles.container}>
      <View
        style={{
          flexDirection: 'column',
          borderColor: '#7C56DC',
          justifyContent: 'center',
          borderWidth: 10,
          width: 250,
          height: 250,
          borderRadius: 200,
        }}>
        <Text style={styles.stepsText}>Steps:</Text>
        <Text style={styles.stepsText}>{steps}</Text>
      </View>
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          margin: 10,
          padding: 20,
          height: 380,
          width: 360,
          alignSelf: 'center',
          borderRadius: 30,
          marginBottom: 100,
        }}>
        <TextInput
          style={styles.input}
          placeholder="Nhập số bước chân mục tiêu"
          keyboardType="numeric"
          value={inputGoal}
          onChangeText={setInputGoal}
        />
        <TouchableOpacity onPress={handleSetGoal} style={styles.btn}>
          <Text style={{textAlign: 'center', color: 'white'}}>
            Đặt mục tiêu
          </Text>
        </TouchableOpacity>

        {goalReached && (
          <View style={styles.goalContainer}>
            <Text style={styles.goalText}>
              Chúc mừng bạn đã đạt được mục tiêu của ngày hôm nay!
            </Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#242B34',
  },
  stepsText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  goalContainer: {
    position: 'absolute',
    bottom: 50,
    padding: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  goalText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#5854C2',
    padding: 15,
    borderRadius: 30,
    width: 150,
    alignSelf: 'center',
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
    color: 'white',
  },
});

export default RunScreen;

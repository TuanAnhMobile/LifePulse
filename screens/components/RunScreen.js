import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
} from 'react-native';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import {request, PERMISSIONS} from 'react-native-permissions';
import {filter} from 'rxjs/operators';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Run = ({navigation}) => {
  const [steps, setSteps] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [lastAcceleration, setLastAcceleration] = useState({x: 0, y: 0, z: 0});
  const [goalReached, setGoalReached] = useState(false);
  const [stepGoal, setStepGoal] = useState(null);
  const [inputGoal, setInputGoal] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [userId, setUserId] = useState(null);

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

    const user = auth().currentUser;
    if (user) {
      setUserId(user.uid);
    }

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
          return acceleration > 2.0;
        }),
      )
      .subscribe(({x, y, z}) => {
        if (isRunning) {
          const deltaX = Math.abs(x - lastAcceleration.x);
          const deltaY = Math.abs(y - lastAcceleration.y);
          const deltaZ = Math.abs(z - lastAcceleration.z);

          if (deltaX > 1 || deltaY > 1 || deltaZ > 1) {
            setSteps(prevSteps => prevSteps + 1);
          }

          setLastAcceleration({x, y, z});
        }
      });

    setSubscription(accelSubscription);
  };

  useEffect(() => {
    if (stepGoal !== null && steps >= stepGoal && !goalReached) {
      setGoalReached(true);
      setIsRunning(false);
      saveStepsToFirestore(steps);
      Alert.alert(
        'Chúc mừng!',
        'Bạn đã đạt được mục tiêu của mình! Bạn có muốn đặt mục tiêu mới không?',
        [
          {
            text: 'Có',
            onPress: () => {
              setStepGoal(null);
              setSteps(0);
              setGoalReached(false);
              setInputGoal('');
            },
          },
          {
            text: 'Không',
            onPress: () => {
              setStepGoal(null);
              setSteps(0);
              setGoalReached(false);
              setInputGoal('');
            },
          },
        ],
      );
    }
  }, [steps]);

  const saveStepsToFirestore = async steps => {
    const user = auth().currentUser;

    try {
      await firestore().collection('steps').add({
        userId: user.uid, // Thêm userId vào tài liệu Firestore
        date: new Date().toISOString(),
        steps: steps,
        goal: stepGoal,
      });
      console.log('Đã lưu số bước vào Firestore thành công!');
    } catch (error) {
      console.error('Lỗi khi lưu số bước vào Firestore:', error);
    }
  };

  const handleSetGoal = () => {
    const goal = parseInt(inputGoal);
    if (!isNaN(goal) && goal > 0) {
      setStepGoal(goal);
      setGoalReached(false);
      setSteps(0);
      Alert.alert('Thành công', 'Đặt mục tiêu thành công!');
    }
  };

  const handleStart = () => {
    if (stepGoal !== null) {
      setIsRunning(true);
    } else {
      Alert.alert(
        'Đặt mục tiêu trước',
        'Vui lòng đặt mục tiêu trước khi bắt đầu.',
      );
    }
  };

  const handleStop = () => {
    if (stepGoal !== null && isRunning && steps > 0) {
      if (steps < stepGoal) {
        Alert.alert('Rất tiếc', 'Bạn chưa đạt đủ mục tiêu.');
      }
      setIsRunning(false);
      saveStepsToFirestore(steps);
      setSteps(0); // Reset số bước về 0
      setStepGoal(null); // Reset mục tiêu về 0
    } else {
      Alert.alert(
        'Không thể dừng',
        'Vui lòng đảm bảo bạn đã đặt mục tiêu, bắt đầu và có số bước lớn hơn 0.',
      );
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
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TextInput
            style={styles.input}
            placeholder="Nhập mục tiêu số bước"
            keyboardType="numeric"
            value={inputGoal}
            onChangeText={setInputGoal}
          />
          <TouchableOpacity onPress={handleSetGoal}>
            <Image
              source={require('../../icon/ic_acp.png')}
              style={{
                height: 40,
                width: 40,
                objectFit: 'contain',
                marginTop: 5,
                left: 10,
              }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 100,
          }}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleStart}>
              <Image
                source={require('../../icon/ic_play_btn.png')}
                style={{width: 20, height: 20, objectFit: 'contain'}}
              />
            </TouchableOpacity>
            <Text style={{color: '#7C56DC', left: 20}}>Start</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleStop}>
              <Image
                source={require('../../icon/ic_stop.png')}
                style={{width: 20, height: 20, objectFit: 'contain'}}
              />
            </TouchableOpacity>
            <Text style={{color: '#7C56DC', left: 20}}>Pause</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D7D9A9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepsText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  goalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    margin: 10,
    padding: 20,
    height: 314,
    width: 360,
    alignSelf: 'center',
    borderRadius: 30,
    marginBottom: 39,
  },
  input: {
    height: 50,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff',
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: 20,
    padding: 10,
    width: 120,
    borderRadius: 10,
  },
  goalMessage: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
  goalMessageText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Run;

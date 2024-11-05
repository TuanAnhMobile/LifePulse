import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import {LineChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const HealthyScreen = () => {
  //Sử dụng state để quản lý thời gian, màu gradient, thời gian bắt đầu và kết thúc giấc ngủ, thời gian ngủ và dữ liệu ngủ:
  const [time, setTime] = useState(new Date());
  const [gradientColors, setGradientColors] = useState(['#021228', '#CE8079']);
  const [sleepStart, setSleepStart] = useState(null);
  const [sleepEnd, setSleepEnd] = useState(null);
  const [sleepDuration, setSleepDuration] = useState(null);
  const [sleepData, setSleepData] = useState({
    labels: [],
    datasets: [{data: []}],
  });

  useEffect(() => {
    //Cập nhật thời gian mỗi giây:
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    //Lấy dữ liệu ngủ từ Firestore
    const fetchData = async () => {
      const sleepRecords = await firestore().collection('sleepRecords').get();
      const data = sleepRecords.docs.map(doc => {
        const record = doc.data();
        return {
          start: record.start.toDate(),
          end: record.end.toDate(),
          duration: record.duration,
        };
      });

      const formattedData = formatChartData(data);
      setSleepData(formattedData);
    };

    fetchData();
  }, []); //// Dependency rỗng đảm bảo useEffect chỉ chạy một lần khi component được mount

  const formatChartData = data => {
    const chartData = {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    };

    data.forEach(record => {
      const date = record.start.toISOString().split('T')[0]; // Lấy phần ngày
      chartData.labels.push(date);
      chartData.datasets[0].data.push(record.duration / 3600000); // Chuyển đổi mili giây sang giờ
    });

    return chartData;
  };

  const formatTime = time => {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const startSleep = () => {
    const start = new Date();
    setSleepStart(start);
    setSleepEnd(null);
    setSleepDuration(null);
    setGradientColors(['#061C3C', '#021228']);
    console.log('Bắt đầu ngủ', start);
  };

  const endSleep = async () => {
    const end = new Date();
    setSleepEnd(end);

    if (sleepStart) {
      const durationMillis = end - sleepStart;
      setSleepDuration(durationMillis);

      await firestore().collection('sleepRecords').add({
        start: sleepStart,
        end: end,
        duration: durationMillis,
      });

      const newSleepData = [...sleepData.datasets[0].data];
      const newLabels = [...sleepData.labels];
      const date = sleepStart.toISOString().split('T')[0];
      newLabels.push(date);
      newSleepData.push(durationMillis / 3600000);

      setSleepData({
        labels: newLabels,
        datasets: [{data: newSleepData}],
      });
    }
    setGradientColors(['#021228', '#CE8079']);
    console.log('Kết thúc', end);
  };

  const formatDuration = milliseconds => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours} giờ ${minutes} phút ${seconds} giây`;
  };

  return (
    <LinearGradient
      colors={gradientColors}
      start={{x: 0, y: 1}}
      end={{x: 0, y: 0}}
      style={styles.gradient}>
      <View style={styles.cloudContainer}>
        <Image
          source={require('../../cloud/cloud3.png')}
          style={styles.cloudImage}
        />
        <Image
          source={require('../../cloud/cloud5.png')}
          style={styles.cloudImage}
        />
      </View>

      <View
        style={{
          marginLeft: 17,
          borderWidth: 2,
          borderColor: 'white',
          padding: 5,
          borderRadius: 15,
          bottom: 170,
          alignSelf: 'flex-start',
        }}>
        <Text style={styles.clockText}>{formatTime(time)}</Text>
      </View>
      {sleepData.labels.length > 0 && (
        <LineChart
          data={sleepData}
          width={screenWidth - 40}
          height={320}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
            bottom: 150,
          }}
        />
      )}
      <View style={{bottom: 150}}>
        {sleepDuration !== null && (
          <Text style={{color: 'white'}}>
            Thời gian ngủ của bạn: {formatDuration(sleepDuration)}
          </Text>
        )}
      </View>

      <View style={{flexDirection: 'row', bottom: 120}}>
        <TouchableOpacity style={styles.btn01} onPress={startSleep}>
          <Text style={{textAlign: 'center'}}>Bắt đầu ngủ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn02} onPress={endSleep}>
          <Text style={{textAlign: 'center'}}>Đã dậy</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default HealthyScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cloudContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    right: 100,
    bottom: 200,
  },
  cloudImage: {
    width: 281,
    height: 261,
  },
  clockText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  btn01: {
    backgroundColor: '#DE635C',
    width: 150,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    marginRight: 10,
  },
  btn02: {
    backgroundColor: '#DE635C',
    width: 150,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    marginLeft: 10,
  },
});

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const NoteScreen = ({navigation}) => {
  const [gratitudes, setGratitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = auth().currentUser.uid; // Lấy userId của người dùng hiện tại

  // Hàm để lấy dữ liệu từ Firestore và lắng nghe thay đổi
  const fetchGratitudes = () => {
    // Lắng nghe thay đổi trong bộ sưu tập 'Gratitudes'
    const unsubscribe = firestore()
      .collection('gratitudes')
      .where('userId', '==', userId) // Lọc dữ liệu theo userId
      .orderBy('createdAt', 'desc') //sxep thứ tự giảm dần
      .onSnapshot(snapshot => {
        const gratitudesList = snapshot.docs.map(doc => { 
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            // Kiểm tra xem createdAt có phải là đối tượng Timestamp không
            createdAt: data.createdAt ? data.createdAt.toDate() : null,
          };
        });
        setGratitudes(gratitudesList); //cập nhật dsach các lời biết ơn trong state
        setLoading(false); // dừng hiển thị khi dữ liệu đã được tải
      }, error => {
        console.error('Lỗi đây nè: ', error);
        setLoading(false); // Dừng hiển thị ActivityIndicator khi có lỗi
      });

    // Clean up function to unsubscribe from the listener
    return unsubscribe;
  };

  useEffect(() => {
    // Gọi hàm fetchGratitudes khi component được mount
    const unsubscribe = fetchGratitudes();

    // Clean up listener on component unmount
    return () => unsubscribe();
  }, [userId]);
  
  const handleDelete = (id) => {
    Alert.alert(
      "Thông báo",
      "Bạn chắc chắn muốn xoá nội dung không",
      [
        { text: "Huỷ", style: "cancel" },
        {
          text: "Đồng ý", onPress: async () => {
            try {
              await firestore().collection('gratitudes').doc(id).delete();
              console.log('Gratitude deleted!');
            } catch (error) {
              console.error('Error deleting gratitude: ', error);
            }
          }
        }
      ]
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#DDCCDD', padding: 20 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#7C56DC" />
      ) : (
        <FlatList
          data={gratitudes}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>

              <TouchableOpacity onPress={()=>navigation.navigate('EditGratitude',{item:{
                 ...item,
                 createdAt: item.createdAt ? item.createdAt.toISOString() : null,
              }})}>
              <Text style={styles.title}>{item.title}</Text>
              </TouchableOpacity>

              <Text style={styles.content}>{item.content}</Text>
              {/* Kiểm tra xem createdAt có giá trị không trước khi gọi toDate */}
              <Text style={styles.date}>
                {item.createdAt ? item.createdAt.toLocaleDateString() : 'No date available'}
              </Text>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#37386E',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#A9A9A9',
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#E57373',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default NoteScreen;

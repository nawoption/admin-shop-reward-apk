import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getAdminData} from '../../components/api';
import {useSelector} from 'react-redux';
import {globalStyle} from '../../components/globalStyle';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LoadingCard from '../../components/loading';
export default function Employee(props) {
  const userData = useSelector(state => state.auth);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    setLoading(true);
    const resData = await getAdminData(`/users/employee`, userData.token);
    if (resData.con) {
      setUsers(resData.result);
    } else console.log(resData);
    setLoading(false);
  };

  const UserCard = ({item}) => {
    return (
      <>
        <View style={styles.userContainer}>
          <Text style={styles.label}>Name : {item.name}</Text>
          <Text style={styles.label}>Phone : {item.phone}</Text>
          <Text style={styles.label}>Email : {item.email}</Text>
          <Text style={styles.label}>Points : {item.points}</Text>
          <Text style={styles.label}>Address : {item.address}</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('RoleManage', {post: item})
            }
            style={styles.btnHistory}>
            <Feather name="user-check" color="#000" size={30} />
            <Text>Appointment</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('UserRecord', {uid: item._id})
            }
            style={styles.btnHistory}>
            <MaterialIcons name="notes" color="#000" size={30} />
            <Text> History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('PointsManage', {post: item})
            }
            style={styles.btnHistory}>
            <FontAwesome5 name="coins" color="#000" size={30} />
            <Text>Points</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };
  if (loading) {
    return <LoadingCard />;
  }

  return (
    <View style={globalStyle.container}>
      <FlatList
        data={users}
        keyExtractor={(k, v) => v.toString()}
        renderItem={({item}) => <UserCard item={item} />}
        refreshing={loading}
        onRefresh={()=>getUser()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#fff',
    marginVertical: 2,
    padding: 10,
    marginTop:5
  },
  findBtn: {
    width: 70,
    height: 40,
    backgroundColor: '#448AFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  inputBox: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    marginBottom: 5,
    borderRadius: 10,
  },
  label: {
    color: '#000',
    marginVertical: 7,
  },
  btnHistory: {
    width: 90,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    margin: 5,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#fff',
    
  },
});

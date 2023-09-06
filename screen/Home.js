import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {globalStyle} from '../components/globalStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {getAdminData} from '../components/api';
export default function Home(props) {
  const userData = useSelector(state => state.auth);
  const role = userData.role ? userData.role.name : '';
  const goNavigate = screenName => {
    props.navigation.navigate(screenName);
  };
  const [users, setUsers] = useState(0);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    const resData = await getAdminData(`/users/count`, userData.token);
    console.log(resData);
    setUsers(resData.result);
  };
  return (
    <View style={globalStyle.container}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Users')}
          style={styles.btnHistory}>
          <MaterialCommunityIcons
            name="account-search"
            color="#000"
            size={30}
          />
          <Text style={styles.iconText}>Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('RewardOrder')}
          style={styles.btnHistory}>
          <MaterialCommunityIcons name="gift" color="#000" size={30} />
          <Text style={styles.iconText}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('RewardHistory')}
          style={styles.btnHistory}>
          <MaterialCommunityIcons name="gift" color="#000" size={30} />
          <Text style={styles.iconText}>Received</Text>
        </TouchableOpacity>
      </View>
      {role == 'admin' && (
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('StaffList')}
            style={styles.btnHistory}>
            <MaterialCommunityIcons
              name="account-search"
              color="#000"
              size={30}
            />
            <Text style={styles.iconText}>Staff</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('AnalyzePoints')}
            style={styles.btnHistory}>
            <MaterialCommunityIcons
              name="google-analytics"
              color="#000"
              size={30}
            />
            <Text style={styles.iconText}>Points</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('AnalyzeRecord')}
            style={styles.btnHistory}>
            <MaterialCommunityIcons name="transition" color="#000" size={30} />
            <Text style={styles.iconText}>Transactions</Text>
          </TouchableOpacity>
        </View>
      )}
      {role == 'admin' && (
        <View style={styles.row}>
          <View style={styles.btnHistory}>
            <Text style={styles.label}>Total Users</Text>
            <Text style={styles.userCount}>{users}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btnHistory: {
    width: 110,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  iconText: {
    color: '#0097A7',
    marginTop: 10,
  },
  label: {
    color: '#000',
    fontSize: 15,
  },
  userCount: {
    color: '#0097A7',
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

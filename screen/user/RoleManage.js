import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Alert
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {globalStyle} from '../../components/globalStyle';
import {useSelector} from 'react-redux';
import {getAdminData, postData, updateData} from '../../components/api';
import {Picker} from '@react-native-picker/picker';
import LoadingCard from '../../components/loading';

export default function RoleManage(props) {
  const item = props.route.params.post;
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(item.role._id);
  const userData = useSelector(state => state.auth);
  useEffect(() => {
    getRole();
  }, []);

  const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure to reset?",
      "",
      [
        {
          text: "Yes",
          onPress: () => {
            resetPassword()
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  const getRole = async () => {
    const resData = await getAdminData('/roles', userData.token);
    if (resData.con) {
      setRoles(resData.result);
    } else console.log(resData);
  };
  const changeRole = async () => {
    setLoading(true);
    let obj = {userId: item._id, roleId: selectedRole};
    const resData = await postData('/roles/change', obj, userData.token);
    if (resData.con) {
      ToastAndroid.show(resData.msg, ToastAndroid.SHORT);
    } else console.log(resData);
    setLoading(false);
  };
  const resetPassword = async () => {
    setLoading(true);
    let obj = {phone: item.phone, password: '123123123'};
    const resData = await updateData(
      '/users/forgetPassword',
      obj,
      userData.token,
    );
    if (resData.con) {
      ToastAndroid.show(resData.msg, ToastAndroid.SHORT);
    } else console.log(resData);
    setLoading(false);
  };
  if (loading) {
    return <LoadingCard />;
  }

  return (
    <View style={globalStyle.container}>
      <Text style={styles.title}>Appointment Member</Text>
      <Text style={styles.name}>Name : {item.name}</Text>
      <Text style={styles.name}>Phone : {item.phone}</Text>
      <Text style={styles.name}>Select Role : </Text>
      <Picker
        selectedValue={selectedRole}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setSelectedRole(itemValue)}>
        {roles.map(role => {
          return (
            <Picker.Item key={role._id} label={role.name} value={role._id} />
          );
        })}
      </Picker>
      <View>
        <TouchableOpacity onPress={() => changeRole()} style={styles.changeBtn}>
          <Text style={{color: '#fff', fontSize: 18}}>Update</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.forgetText}>
          If member forgot password , reset here
        </Text>
        <TouchableOpacity
          onPress={() => showConfirmDialog()}
          style={styles.changeBtn}>
          <Text style={{color: '#fff', fontSize: 18}}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
    color: '#000',
    marginTop: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  changeBtn: {
    width: 100,
    height: 40,
    backgroundColor: '#448AFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    alignSelf: 'flex-end',
  },
  forgetText: {
    fontSize: 16,
    color: '#448AFF',
    fontStyle: 'italic',
    marginTop: 10,
  },
});

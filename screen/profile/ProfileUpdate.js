import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {globalStyle} from '../../components/globalStyle';
import { updateData} from '../../components/api';
import LoadingCard from '../../components/loading';

export default function ProfileUpdate() {
  const userData = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);
  const data = {
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    address: userData.address,
  };
  const [user, setUser] = useState(data);
  const updateProfile = async () => {
    setLoading(true);
    const resData = await updateData('/users/update', user, userData.token);
    setLoading(false);
    ToastAndroid.show(resData.msg, ToastAndroid.SHORT);
  };
  if (loading) {
    return <LoadingCard />;
  }
  return (
    <View style={globalStyle.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.inputBox}
        value={user.name}
        onChangeText={name => setUser({...user, name})}
      />
      <View style={styles.space}></View>
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.inputBox}
        value={user.phone}
        editable={false}
        selectTextOnFocus={false}
      />
      <View style={styles.space}></View>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.inputBox}
        value={user.email}
        onChangeText={email => setUser({...user, email})}
      />
      <View style={styles.space}></View>
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.inputBox}
        value={user.address}
        onChangeText={address => setUser({...user, address})}
      />
      <TouchableOpacity onPress={() => updateProfile()} style={styles.btn}>
        <Text style={{color: '#fff', fontSize: 16}}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    fontSize:16
  },
  label: {
    color: '#333',
    fontSize: 12,
  },
  space: {
    height: 25,
  },
  btn: {
    width: 100,
    height: 40,
    backgroundColor: '#448AFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    alignSelf: 'flex-end',
    marginTop: 20,
  },
});

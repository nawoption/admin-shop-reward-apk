import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {globalStyle} from '../../components/globalStyle';
import {postData, updateData} from '../../components/api';
import {useSelector} from 'react-redux';
import LoadingCard from '../../components/loading';

export default function ChangePassword(props) {
  const [oldPassword, setOldPassword] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const userData = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);
  const updatePassword = async () => {
    if (password == null && confirmPassword == null) {
      return;
    }
    if (password == confirmPassword) {
      setLoading(true);
      let obj = {oldPassword, password};
      const resData = await updateData(
        '/users/changePassword',
        obj,
        userData.token,
      );
      setLoading(false);
      ToastAndroid.show(resData.msg, ToastAndroid.SHORT);
      if (resData.con) {
        props.navigation.goBack();
      }
    } else ToastAndroid.show("Password doesn't match", ToastAndroid.SHORT);
  };
  if (loading) {
    return <LoadingCard />;
  }
  return (
    <View style={globalStyle.container}>
      <TextInput
        style={styles.inputBox}
        placeholder="Enter old password"
        placeholderTextColor={'#000'}
        value={oldPassword}
        onChangeText={text => setOldPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.inputBox}
        placeholder="Enter new password"
        placeholderTextColor={'#000'}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.inputBox}
        placeholder="Enter confirm password"
        placeholderTextColor={'#000'}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity onPress={() => updatePassword()} style={styles.btn}>
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
    marginTop: 20,
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

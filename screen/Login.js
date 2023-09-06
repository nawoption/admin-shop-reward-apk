import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {Text, TouchableOpacity} from 'react-native';
import {StackActions} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {globalStyle} from '../components/globalStyle';
import {useDispatch} from 'react-redux';
import {storeUser} from '../redux/action';
import LoadingCard from '../components/loading';
import {auth} from '../components/api';

const RegisterForm = props => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const toRegister = () => {
    props.navigation.navigate('Register');
  };
  const handleLogin = async () => {
    if (phone == '' || password == '') {
      return true;
    }
    setLoading(true);
    let resData = await auth('/users/login', {phone, password});
    if (resData.con) {
      dispatch(storeUser(resData.result));
      props.navigation.dispatch(StackActions.replace('MyTabs'));
    } else {
      ToastAndroid.show(resData.msg, ToastAndroid.SHORT);
    }
    setLoading(false);
  };
  if (loading) {
    return <LoadingCard />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shop Rewards</Text>
      <Text style={styles.subHeading}>computer | moblile</Text>

      <TextInput
        style={styles.input}
        placeholder="09xxxxxxxxx"
        placeholderTextColor="#00BCD4"
        value={phone}
        keyboardType="phone-pad"
        onChangeText={text => setPhone(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#00BCD4"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
        <Text style={{color: '#fff', fontSize: 18}}>Login</Text>
      </TouchableOpacity>
      <Text
        style={{color: '#fff', marginTop: 50, fontSize: 16, marginBottom: 10}}>
        If you don't have account
      </Text>
      <TouchableOpacity onPress={toRegister} style={styles.registerBtn}>
        <View style={styles.hover}></View>
        <View style={{flexDirection: 'row'}}>
          <AntDesign name="checkcircle" size={16} color={'#fff'} />
          <Text style={{color: '#fff', fontSize: 14, marginLeft: 5}}>
            Register Here
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#00BCD4',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 44,
    color: '#fff',
  },
  subHeading: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 50,
  },
  loginBtn: {
    width: 100,
    height: 40,
    backgroundColor: '#448AFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  registerBtn: {
    width: 150,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hover: {
    width: 150,
    height: 30,
    backgroundColor: '#eee',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.1,
    position: 'absolute',
  },
});

export default RegisterForm;

import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {Text, TouchableOpacity} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {globalStyle} from '../components/globalStyle';
import LoadingCard from '../components/loading';
import {auth} from '../components/api';

const RegisterForm = props => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if ((name == '' && phone == '' && address == '', password == '')) {
      return;
    }
    setLoading(true);
    let obj = {
      name,
      phone,
      email,
      address,
      password,
    };
    let resData = await auth('/users/register', obj);
    if (resData.con) {
      props.navigation.dispatch(StackActions.replace('Login'));
    } else {
      console.log(resData);
    }
    setLoading(false);
    ToastAndroid.show(resData.msg, ToastAndroid.SHORT);
  };
  if (loading) {
    return <LoadingCard />;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{width: '100%'}}>
        <Text style={styles.heading}>Shop Rewards</Text>
        <Text style={styles.subHeading}>computer | moblile</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#00BCD4"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#00BCD4"
          value={phone}
          keyboardType="phone-pad"
          onChangeText={text => setPhone(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#00BCD4"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="#00BCD4"
          value={address}
          onChangeText={text => setAddress(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#00BCD4"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleRegister} style={styles.btn}>
          <Text style={{color: '#fff', fontSize: 18}}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
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
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 50,
    textAlign: 'center',
  },
  btn: {
    width: 100,
    height: 40,
    backgroundColor: '#448AFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
});

export default RegisterForm;

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    Linking,
    Alert,
  } from 'react-native';
  import React from 'react';
  import {useDispatch, useSelector} from 'react-redux';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import {StackActions} from '@react-navigation/native';
  import {useState} from 'react';
  import {logout} from '../../redux/action';
  export default function Profile(props) {
    const userData = useSelector(state => state.auth);
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    const callPhone = phone => {
      Linking.openURL(`tel:${phone}`);
    };
    const showConfirmDialog = () => {
      return Alert.alert(
        "Are you sure logout?",
        "",
        [
          {
            text: "Yes",
            onPress: () => {
              userLogout()
            },
          },
          {
            text: "No",
          },
        ]
      );
    };
    const userLogout = () => {
      dispatch(logout());
      props.navigation.dispatch(StackActions.replace('Login'));
    };
    return (
      <View style={styles.container}>
        <Modal visible={modalVisible} animationType='fade' transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalCard}>
              <MaterialIcons
                style={styles.closeText}
                onPress={() => setModalVisible(!modalVisible)}
                name="close"
                color="#111"
                size={22}
              />
              <Text
                style={{...styles.telephone, fontSize: 22, fontWeight: 'bold'}}>
                Customer Service
              </Text>
              <Text
                onPress={() => callPhone('09-100100100')}
                style={styles.telephone}>
                09-100 100 100
              </Text>
              <Text style={styles.telephone}>Online Sales </Text>
              <Text
                onPress={() => callPhone('09-200200200')}
                style={styles.telephone}>
                09-200200200~400
              </Text>
              <Text style={styles.telephone}>Telesales </Text>
              <Text
                onPress={() => callPhone('09-300300300')}
                style={styles.telephone}>
                09-300300300
              </Text>
              <Text style={styles.telephone}>Service Time : (7:30~5:30)</Text>
            </View>
          </View>
        </Modal>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.heading}>Shop Rewards</Text>
          <Text style={styles.subHeading}>computer | moblile</Text>
          <Text style={{color: '#000'}}>1.0.0</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.row}>
          <MaterialIcons name="account-circle" color="#65e330" size={40} />
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ProfileUpdate')}
            style={styles.rowCard}>
            <Text style={styles.nameText}>{userData.name}</Text>
            <Text style={styles.emailText}>{userData.email}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ChangePassword')}
          style={styles.row}>
          <MaterialIcons name="lock" color="#dbc416" size={40} />
          <Text style={styles.label}>Change Password</Text>
        </TouchableOpacity>
        <View style={styles.line}></View>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={styles.row}>
          <MaterialIcons name="phone" color={'#00BCD4'} size={40} />
          <Text style={styles.label}>Customer Service</Text>
        </TouchableOpacity>
        <View style={styles.line}></View>
        <TouchableOpacity onPress={() => showConfirmDialog()} style={styles.row}>
          <MaterialIcons name="logout" color="#db3416" size={40} />
          <Text style={styles.label}>Logout</Text>
        </TouchableOpacity>
        <View style={styles.line}></View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eee',
    },
    heading: {
      fontSize: 40,
      color: '#00BCD4',
      marginTop: 20,
    },
    subHeading: {
      fontSize: 22,
      color: '#00BCD4',
      marginBottom: 10,
    },
    line: {
      borderBottomWidth: 0.5,
      borderBottomColor: '#444',
      marginVertical: 20,
    },
    nameText: {
      color: '#000',
      fontSize: 18,
    },
    emailText: {color: '#000', fontSize: 14},
    row: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingHorizontal: 10,
    },
    rowCard: {marginLeft: 20},
    label: {color: '#000', fontSize: 16, marginLeft: 20, marginTop: 10},
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalCard: {
      width: '90%',
      height: 300,
      backgroundColor: '#fff',
      alignItems: 'center',
      borderRadius: 8,
    },
    telephone: {
      color: '#111',
      marginBottom: 10,
      fontSize: 16,
    },
    closeText: {
      alignSelf: 'flex-end',
      fontSize: 28,
      fontWeight: 'bold',
      marginRight: 10,
      marginTop: 10,
    },
  });
  
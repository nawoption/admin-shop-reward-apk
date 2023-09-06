import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Alert
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {postData} from '../../components/api';
import {useSelector} from 'react-redux';
import {globalStyle} from '../../components/globalStyle';
import LoadingCard from '../../components/loading';

export default function PointsManage(props) {
  const item = props.route.params.post;
  const [points, setPoints] = useState(null);
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const userData = useSelector(state => state.auth);
  const  calculatePoints = (amount)=>{
    setAmount(amount)
    let p = parseInt(amount)*0.01;
    setPoints(p.toString());
  }
  const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure?",
      `To add (${points}) points to customer`,
      [
        {
          text: "Yes",
          onPress: () => {
            increasePoints()
          },
        },
        {
          text: "No",
        },
      ]
    );
  };
  const increasePoints = async () => {
    setLoading(true);
    if (points != null) {
      let obj = {userId: item._id, points: parseInt(points)};
      const resData = await postData('/activity/addPoint', obj, userData.token);
      setLoading(false);
      setPoints(null);
      ToastAndroid.show(resData.msg, ToastAndroid.SHORT);
      props.navigation.goBack();
    }
  };
  // const reducePoints = async () => {
  //   setLoading(true);
  //   if (points != null) {
  //     let obj = {userId: item._id, points: parseInt(points)};
  //     const resData = await postData(
  //       '/activity/removePoint',
  //       obj,
  //       userData.token,
  //     );
  //     setLoading(false);
  //     setPoints(null);
  //     ToastAndroid.show(resData.msg, ToastAndroid.SHORT);
  //     props.navigation.goBack();
  //   }
  // };
  if (loading) {
    return <LoadingCard />;
  }
  return (
    <View style={globalStyle.container}>
      <View>
        <Text style={{fontSize: 16, fontWeight: '600',color:'#000'}}>
          Name : {item.name}
        </Text>
        <Text style={{fontSize: 16,color:'#000'}}>Phone : {item.phone}</Text>
      </View>
      <Text style={styles.buyTitle}>Enter buying amount</Text>
      <TextInput
        style={styles.inputBox}
        value={amount}
        keyboardType="numeric"
        onChangeText={amount => calculatePoints(amount)}
      />
      <Text style={styles.buyTitle}>Reward Points</Text>
      <TextInput
        style={styles.inputBox}
        value={points}
        keyboardType="numeric"
        editable={false}
        selectTextOnFocus={false}
      />
      <View>
        {/* <TouchableOpacity
          onPress={() => reducePoints()}
          style={globalStyle.btn}>
          <Text style={{color: '#fff', fontSize: 16}}>Remove Points</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => showConfirmDialog()}
          style={styles.btnAdd}>
          <Text style={{color: '#fff', fontSize: 16}}>Add Points</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    marginBottom: 5,
    borderRadius: 5,
  },
  buyTitle: {
    fontSize: 16,
    marginTop: 10,
    marginBottom:5,
    color:'#000'
  },
  btnAdd: {
    width: 120,
    height: 40,
    backgroundColor: '#448AFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    alignSelf: 'flex-end',
  },
});

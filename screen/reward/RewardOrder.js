import {
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getAdminData, updateData} from '../../components/api';
import {useSelector} from 'react-redux';
import {globalStyle} from '../../components/globalStyle';

export default function RewardOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const userData = useSelector(state => state.auth);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    setLoading(true);
    const resData = await getAdminData('/rewardOrder/pending', userData.token);
    if (resData.con) {
      setOrders(resData.result);
    } else {
      console.log(resData);
    }
    setLoading(false);
  };

  const showConfirmDialog = orderId => {
    return Alert.alert('Are you sure to receive?', '', [
      {
        text: 'Yes',
        onPress: () => {
          receivedOrder(orderId);
        },
      },
      {
        text: 'No',
      },
    ]);
  };

  const receivedOrder = async orderId => {
    let obj = {
      orderId,
      status: 'received',
    };
    let resData = await updateData('/rewardOrder/', obj, userData.token);
    if (resData.con) {
      getPosts()
    } else console.log(resData);
    ToastAndroid.show(resData.msg, ToastAndroid.SHORT);
  };

  const OrderCard = ({data}) => {
    let reward = data.reward;
    let user = data.user;

    let image = reward.image
      ? {uri: reward.image}
      : require('../../components/image/hill.jpeg');
    return (
      <View style={globalStyle.cardContainer}>
        <Text style={styles.title}>{reward.title}</Text>
        <Image source={image} style={globalStyle.promoImage} />
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <Text style={styles.status}>Status : </Text>
          <Text
            style={data.status == 'pending' ? styles.pending : styles.received}>
            {data.status}
          </Text>
        </View>
        <Text style={styles.date}>Name : {user.name}</Text>
        <Text style={styles.date}>Phone : {user.phone}</Text>
        <Text style={styles.date}>Request Date : {data.created.split('T')[0]}</Text>
        <TouchableOpacity
          onPress={() => showConfirmDialog(data._id)}
          style={styles.btnReceive}>
          <Text style={styles.btnText}>Receive Order</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={globalStyle.container}>
     
      <FlatList
        data={orders}
        keyExtractor={(k, v) => v.toString()}
        renderItem={({item}) => <OrderCard data={item} />}
        refreshing={loading}
        onRefresh={() => getPosts()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pending: {
    color: '#ffc61a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  received: {
    color: '#00cc44',
    fontWeight: 'bold',
    fontSize: 16,
  },
  status: {
    color: '#000',
    fontSize: 16,
  },
  date: {
    color: '#000',
    marginVertical: 3,
  },
  title: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
    marginVertical: 5,
  },
  btnReceive: {
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#448AFF',
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
});

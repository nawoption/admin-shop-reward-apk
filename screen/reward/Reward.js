import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {globalStyle} from '../../components/globalStyle';
import {getAdminData, getData} from '../../components/api';
import {useSelector} from 'react-redux';

export default function Reward(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(false);
  const userData = useSelector(state => state.auth);
  useEffect(() => {
    getPost();
    if (userData.role.name == 'admin' || userData.role.name == 'owner') {
      setAdmin(true);
    }
  }, []);
  const getPost = async () => {
    setLoading(true);
    const resData = await getAdminData('/reward',userData.token);
    if (resData.con) {
      setPosts(resData.result), setLoading(false);
    } else console.log(resData.msg);
  };
  const RewardCard = ({item}) => {
    let image = item.image
      ? {uri: item.image}
      : require('../../components/image/hill.jpeg');
    return (
      <View style={globalStyle.cardContainer}>
        <Image source={image} style={globalStyle.promoImage} />
        <View style={{paddingHorizontal: 10}}>
          <Text style={globalStyle.title}>{item.title}</Text>
          <Text style={globalStyle.content}>
            {item.description.substring(0, 200) + ' ...'}
          </Text>
          <Text style={{color: '#000', fontSize: 16, marginTop: 10}}>
            Reward Points : {item.points}
          </Text>
        </View>
        <View style={styles.row}>
          {admin && (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('RewardEdit', {post: item})
              }
              style={{...styles.rewardBtn, backgroundColor: '#b3b300'}}>
              <Text style={{color: '#fff'}}>Edit</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('RewardDetail', {post: item})
            }
            style={styles.rewardBtn}>
            <Text style={{color: '#fff'}}>Detail</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={globalStyle.container}>
      {admin==true && (
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('RewardCreate')}
            style={globalStyle.btn}>
            <Text style={{color: '#fff'}}>Create Reward</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={posts}
        keyExtractor={(k, v) => v.toString()}
        renderItem={({item}) => <RewardCard item={item} />}
        refreshing={loading}
        onRefresh={() => getPost()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rewardBtn: {
    width: 100,
    height: 40,
    backgroundColor: '#448AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
});

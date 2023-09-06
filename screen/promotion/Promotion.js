import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {globalStyle} from '../../components/globalStyle';
import {useState, useEffect} from 'react';
import {getData} from '../../components/api';
import {useSelector} from 'react-redux';

export default function Promotion(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const userData = useSelector(state => state.auth);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    getPost();
    if (userData.role.name == 'admin' || userData.role.name == 'owner') {
      setAdmin(true);
    }
  }, []);
  const getPost = async () => {
    setLoading(true);
    const resData = await getData('/promotion');
    if (resData.con) {
      setPosts(resData.result), setLoading(false);
    } else console.log(resData.msg);
  };
  const PromotionCard = ({item}) => {
    let image = item.image
      ? {uri: item.image}
      : require('../../components/image/hill.jpeg');

    return (
      <View
        onPress={() => props.navigation.navigate('PromotionEdit', {post: item})}
        style={globalStyle.cardContainer}>
        <Image source={image} style={globalStyle.promoImage} />
        <Text style={globalStyle.title}>{item.title}</Text>
        <Text style={globalStyle.content}>
          {item.description.substring(0, 200) + ' ...'}
        </Text>
        <View style={styles.row}>
          {admin && (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('PromotionEdit', {post: item})
              }
              style={{...styles.rewardBtn, backgroundColor: '#b3b300'}}>
              <Text style={{color: '#fff'}}>Edit</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('PromotionDetail', {post: item})
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
      {admin == true && (
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('PromotionCreate')}
            style={globalStyle.btn}>
            <Text style={{color: '#fff'}}>Create Promotion</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={posts}
        keyExtractor={(k, v) => v.toString()}
        renderItem={({item}) => <PromotionCard item={item} />}
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

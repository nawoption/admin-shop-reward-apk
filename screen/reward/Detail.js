import {Text, StyleSheet, View, Image, ScrollView} from 'react-native';
import React, {Component} from 'react';
import {globalStyle} from '../../components/globalStyle';

export default class PostDetail extends Component {
  item = this.props.route.params.post;
  render() {
    let image = this.item.image
      ? {uri: this.item.image}
      : require('../../components/image/hill.jpeg');

    return (
      <View style={globalStyle.container}>
        <ScrollView>
          <Image
            source={image}
            style={{...globalStyle.promoImage, height: 300}}
          />
          <Text style={globalStyle.title}>{this.item.title}</Text>
          <Text style={globalStyle.content}>{this.item.description}</Text>
          <Text style={{color: '#000', fontSize: 16, marginTop: 10}}>
            Reward Points : {this.item.points}
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

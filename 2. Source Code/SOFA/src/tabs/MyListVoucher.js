import React, {Component} from 'react';
import { View, Text, TouchableOpacity,
} from 'react-native';

export default class MyListVoucher extends Component {
    navigateVoucherDetail = () => {
      console.log('navigate to detail')
      };
    
      render() {
        return (
          <TouchableOpacity onPress={this.navigateVoucherDetail} >
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: 'black',
                  marginHorizontal: 10,
                  marginTop: 10,
                }}>
                {this.props.title}
              </Text>
              <Text
                style={{
                  fontWeight: 'nomal',
                  fontSize: 12,
                  color: 'black',
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}>
                {this.props.toDate}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }
    }
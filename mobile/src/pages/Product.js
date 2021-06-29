import React, { useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { WebView } from 'react-native-webview';
import Styles from './Styles';

export default function Product({ navigation }) {
   const [visible, setVisible] = useState(true)
   const { url } = navigation.getParam('product');

   return (
      <View style={{ flex: 1 }}>
         <WebView
            onLoad={() => setVisible(false)}
            source={{ uri: url }}
         />

         {visible && (
            <ActivityIndicator
               style={Styles.loading}
               color='#DA552F'
               size="large"
            />
         )}
      </View>
   )
}
Product.navigationOptions = ({ navigation }) => {
   const { product } = navigation.state.params
   return {
      title: `${product.title}`,
   };
};
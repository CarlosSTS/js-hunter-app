import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from './pages/Main';
import Product from './pages/Product';

const Routes= createAppContainer(
createStackNavigator({
    Main: { //titulo
        screen : Main, //renderizar titulo
         navigationOptions:{
             title : " JShunter",
    },
    },
    Product :{
      screen : Product, //renderizar titulo
    navigationOptions:{
        title : "Product"
    }
    }
  } ,{
      defaultNavigationOptions :{
        headerBackTitleVisible: false,//não mostrar titulo da página
      headerStyle: {
        backgroundColor: "#DA552F",
    
    },
    headerTintColor: "#FFF"
  }}
)
)
export default Routes;
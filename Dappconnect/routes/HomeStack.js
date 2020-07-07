import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from '../components/Home';
import ImportAccounts from "../components/ImportAccounts";
import Login from "../components/Login";
import Accounts from "../components/Accounts";

const screens = {
    Home:{
        screen: Home
    },
    ImportAccounts :{
        screen : ImportAccounts
    },
    Login: {
        screen:Login
    },
    Accounts : {
        screen : Accounts
    }
}

const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack);
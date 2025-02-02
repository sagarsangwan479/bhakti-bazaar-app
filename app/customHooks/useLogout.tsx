import { useDispatch } from "react-redux";
import { clearUserDetail } from "../redux/reducer/authReducer";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/RootStackParamList";


function useLogout() {
    const dispatch = useDispatch();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SignIn'>>();
    
    const logout = () => {
        dispatch(clearUserDetail());
        navigation.reset({
            index: 0,
            routes: [{ name: 'SignIn' as keyof RootStackParamList }],
        });
    }

    return logout;
}

export default useLogout;
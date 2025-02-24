import { useTheme } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import Header from "../../layout/Header";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import Input from "../../components/Input/Input";
import { useEffect, useState } from "react";
import { IMAGES } from "../../constants/Images";
import Button from "../../components/Button/Button";
import { COLORS } from "../../constants/theme";
import { addAddressValidation } from "../../services/validation/validation";
import { useApi } from "../../services/api/apiClient";
import { Endpoints } from "../../config/endpoints";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/RootStackParamList";

type AddAddressProps = StackScreenProps<RootStackParamList, 'AddAddress'>;

const AddAddress = ({navigation, route}: AddAddressProps) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const [houseNo, setHouseNo] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');

    const { data: addAddressResponseData, error: addAddressError, loading: addAddressLoading, refetch: saveAddress } = useApi(Endpoints.SAVE_ADDRESS, false, { method: 'POST', data: {house_no:houseNo,city,state,pincode} });

    const [isFocused, setisFocused] = useState(false);
    const [isFocused2, setisFocused2] = useState(false);
    const [isFocused3, setisFocused3] = useState(false);
    const [isFocused4, setisFocused4] = useState(false);

    useEffect(() => {
        if(addAddressResponseData && !addAddressError && !addAddressLoading && addAddressResponseData.status == 'success') {
            route.params.onGoBack(true);
            navigation.goBack();
        }
    }, [addAddressResponseData, addAddressError, addAddressLoading])


    return (
        <View style={{backgroundColor:colors.background,flex:1}}>
            <Header
                title='Add Address'
                leftIcon='back'
                titleRight
            />
            <ScrollView contentContainerStyle={{flexGrow:1,paddingHorizontal:15,marginBottom:50}}>
                <View style={[GlobalStyleSheet.container,{backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,marginTop:10,paddingVertical:10,borderRadius:15}]}>

                    <View style={{ marginBottom: 15, marginTop: 10 }}>
                        <Input  
                            onFocus={() => setisFocused(true)}
                            onBlur={() => setisFocused(false)}
                            isFocused={isFocused}
                            onChangeText={(value) => setHouseNo(value)}
                            backround={colors.card}
                            style={{borderRadius:48}}
                            inputicon
                            placeholder='House No./Flat No. with Locality'
                            value={houseNo}
                        />
                    </View>

                    <View style={{ marginBottom: 15, marginTop: 10 }}>
                        <Input  
                            onFocus={() => setisFocused2(true)}
                            onBlur={() => setisFocused2(false)}
                            isFocused={isFocused2}
                            onChangeText={(value) => setCity(value)}
                            backround={colors.card}
                            style={{borderRadius:48}}
                            inputicon
                            placeholder='City'
                            value={city}
                        />
                    </View>

                    <View style={{ marginBottom: 15, marginTop: 10 }}>
                        <Input  
                            onFocus={() => setisFocused3(true)}
                            onBlur={() => setisFocused3(false)}
                            isFocused={isFocused3}
                            onChangeText={(value) => setState(value)}
                            backround={colors.card}
                            style={{borderRadius:48}}
                            inputicon
                            placeholder='State'
                            value={state}
                        />
                    </View>

                    <View style={{ marginBottom: 15, marginTop: 10 }}>
                        <Input  
                            onFocus={() => setisFocused4(true)}
                            onBlur={() => setisFocused4(false)}
                            isFocused={isFocused4}
                            onChangeText={(value) => setPincode(value)}
                            backround={colors.card}
                            style={{borderRadius:48}}
                            inputicon
                            placeholder='Pincode'
                            value={pincode}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={[GlobalStyleSheet.container]}>
                <Button
                 title="Save Address"
                 color={COLORS.primary}
                 text={COLORS.card}
                 style={{borderRadius:48}}
                 onPress={addAddressValidation(houseNo,city,state,pincode) ? () => saveAddress() : () => console.log('Please fill all the fields')}
                />
            </View>
        </View>
    );
}

export default AddAddress;
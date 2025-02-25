import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Header from "../../layout/Header"
import { useTheme } from "@react-navigation/native";
import { useApi } from "../../services/api/apiClient";
import { Endpoints } from "../../config/endpoints";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { useEffect, useState } from "react";
import { COLORS, FONTS } from "../../constants/theme";
import { IMAGES } from "../../constants/Images";
import Button from "../../components/Button/Button";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/RootStackParamList";
import DeleteAddressModal from "../../components/Modal/DeleteAddressModal";
import { Snackbar } from "react-native-paper";

type AddressScreenProps = StackScreenProps<RootStackParamList, 'Address'>;

const Address = ({navigation}: AddressScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const { data: addressData, error: addressError, loading: addressLoading, refetch: fetchAddress } = useApi(Endpoints.GET_ADDRESSES, true);

    const [addresses, setAddresses] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [snackbarVisible, setSnackBarVisible] = useState(false);
    const [snackText, setSnackText] = useState("");

    const onDismissSnackBar = () => setSnackBarVisible(false);

    const showSnackbarAlert = (data: {message: string, type: string}) => {
		setSnackText(data.message);
		setSnackBarVisible(!snackbarVisible);
        if(data.type === 'success'){
            fetchAddress();
        }
	};

    const addAddress = () => {
        navigation.navigate('AddAddress', { onGoBack: (success: boolean) => { if(success) fetchAddress() } });
    }

    useEffect(() => {
        if(addressData && addressData.status === 'success' && addressLoading === false) {
            addressData.data.map((address: any) => {
                address.image = IMAGES.map;
            })
            setAddresses(addressData.data);
        }
    }, [addressData]);

    return (
        <>
            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={{
                    alignItems:'center',
                    justifyContent:'center',
                    flex:1,
                    position:'relative',
                }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => setModalVisible(false)}
                        style={{
                            position:'absolute',
                            height:'100%',
                            width:'100%',
                            backgroundColor:'rgba(0,0,0,.3)',
                        }}
                    />
                    <DeleteAddressModal close={setModalVisible} onAction={showSnackbarAlert} addressData={addresses} />
                </View>

            </Modal>
            
            <View style={{backgroundColor:colors.background,flex:1}}>
                <Header
                    title='Saved Addresses'
                    leftIcon='back'
                    titleRight
            />
            <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{flexGrow:1,paddingBottom:50}}>
                    <View style={[GlobalStyleSheet.container,{paddingHorizontal:40,marginTop:20}]}>
                        {addresses.map((address: any, index: any) => (
                            <View
                                key={index}
                                style={[GlobalStyleSheet.flexcenter,{width:'100%',gap:20,justifyContent:'flex-start',marginBottom:25,alignItems:'flex-start'}]}
                            >
                                <View
                                    style={[styles.cardimg,{backgroundColor:colors.card}]}
                                >
                                    <Image
                                        style={[GlobalStyleSheet.image3,{tintColor:COLORS.primary}]}
                                        source={address.image}
                                    />
                                </View>
                                <View style={{width: '85%'}}>
                                    <Text style={[styles.brandsubtitle2,{color:'#7D7D7D'}]}>{'Address ' + (index + 1)}</Text>
                                    <Text style={{...FONTS.fontMedium,fontSize:16,color:colors.title,marginTop:5}}>{address.address + ', ' + address.city + ', ' + address.state + ', ' + address.pincode}</Text>
                                </View>
                            </View>
                        ))}
                    </View>

            </ScrollView>
                <View style={[GlobalStyleSheet.container, { flexDirection: 'row', justifyContent: 'space-evenly' }]}>
                    <Button
                        title='Add Address'
                        color={COLORS.white}
                        text={COLORS.primary}
                        size='lg'
                        style={{flex: 1, border: '1px solid', borderColor: COLORS.light, borderRadius: 8}}
                        onPress={addAddress} />
                            
                    <Button
                        title='Delete Address'
                        color={COLORS.danger}
                        text={COLORS.white}
                        size='lg'
                        style={{flex: 1, border: '1px solid', borderColor: COLORS.light, borderRadius: 8}}
                        onPress={() => setModalVisible(true)} />
                </View>

                <Snackbar
                    visible={snackbarVisible}
                    onDismiss={onDismissSnackBar}
                    action={{
                    	label: 'OK',
                    	onPress: () => {}
                    }}
                    >
                    {snackText}
			    </Snackbar>
            </View>
        </>
    )
}



const styles = StyleSheet.create({
    arrivaldata:{
        backgroundColor:COLORS.card,
        borderRadius: 20,
        //width:'100%',
        paddingHorizontal:15,
        borderWidth:1,
        borderColor:'#EFEFEF', 
    },
    sectionimg:{
        height:104,
        width:104,
        borderRadius:150,
        backgroundColor:COLORS.primary,
        overflow:'hidden',
        marginBottom:25
    },
    brandsubtitle2:{
        ...FONTS.fontRegular,
        fontSize:12
    },
    brandsubtitle3:{
        ...FONTS.fontMedium,
        fontSize:12,
        color:COLORS.title
    },
    profilecard:{
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 15, 
        marginRight: 10,
        marginBottom:20
    },
    cardimg:{
        height:54,
        width:54,
        borderRadius:55,
        backgroundColor:COLORS.card,
        shadowColor: "rgba(0,0,0,0.5)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.34,
        shadowRadius: 18.27,
        elevation: 10,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default Address;
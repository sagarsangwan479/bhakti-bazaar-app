import { useTheme } from "@react-navigation/native";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import OptionModal from "./OptionModal";
import { useApi } from "../../services/api/apiClient";
import { Endpoints } from "../../config/endpoints";


type Props = {
    close: any;
    addressData: any[];
    onAction: any;
}

const DeleteAddressModal = ({close, addressData, onAction}: Props) =>  {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const [modalVisible, setModalVisible] = useState(false);
    const [addressId, setAddressId] = useState(0);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const { data, error, loading, refetch: deleteAddress } = useApi(Endpoints.DELETE_ADDRESS, false, { method: 'DELETE', data: { address_id: addressId } });

    useEffect(() => {
        if(isConfirmed === true){
            deleteAddress();
        }
    }, [isConfirmed])

    useEffect(() => {
        if(data){
            if(data.status === 'success'){
                setModalVisible(false);
                close(false);
                onAction({message: data.message, type: 'success'});
            } else if(data.status === 'error'){
                setModalVisible(false);
                close(false);
                onAction({message: data.message, type: 'error'});
            }
        }
    }, [data])

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
                    <OptionModal close={setModalVisible} isConfirmed={setIsConfirmed} title="Are You Confirm?" confirmationText="You want to delete the address." />
                </View>
            
            </Modal>

            <View
                style={{
                    backgroundColor:theme.dark ? colors.background :colors.card,
                    maxWidth:330,
                    width:'100%',
                    borderRadius:SIZES.radius,
                }}
            >
                <View 
                    style={{
                        //backgroundColor:theme.dark ? 'rgba(255,255 :colors.card,
                        maxWidth:330,
                        width:'100%',
                        paddingHorizontal:20,
                        paddingVertical:20,
                        borderRadius:SIZES.radius,
                    }}
                >
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            paddingBottom:15,
                            marginBottom:20,
                            borderBottomWidth:1,
                            borderBottomColor:colors.border,
                        }}
                    >
                        <Text style={{flex:1,...FONTS.h6,color:colors.title}}>Tap To Delete</Text>
                        <TouchableOpacity
                            onPress={() => close(false)}
                            style={{
                                height:32,
                                width:32,
                                borderRadius:32,
                                backgroundColor:colors.background,
                                alignItems:'center',
                                justifyContent:'center',
                            }}
                        >
                            <Feather size={20} color={colors.title} name="x"/>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginBottom:15}}>
                        {addressData.map((address: any, index: any) => (
                            <View key={index} style={{width: '85%', marginBottom:15}}>
                                <Text style={[styles.brandsubtitle2,{color:'#7D7D7D'}]}>{'Address ' + (index + 1)}</Text>
                                <Text style={{...FONTS.fontMedium,fontSize:16,color:colors.title,marginTop:5}} onPress={() => {setAddressId(address.id);setModalVisible(true)}}>{address.address + ', ' + address.city + ', ' + address.state + ', ' + address.pincode}</Text>
                            </View>
                        ))}
                    </View>
                </View>
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

export default DeleteAddressModal;
import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Button from '../Button/Button';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    close : any;
    isConfirmed: any;
    title: string;
    confirmationText: string;
}

const OptionModal = ({close, isConfirmed, title, confirmationText} : Props) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;


    return (
        <>
            <View style={{
                alignItems:'center',
                paddingHorizontal:30,
                paddingVertical:30,
                paddingBottom:30,
                backgroundColor:theme.dark ? 'rgba(255,255,255,0.10)':colors.card,
                borderRadius:SIZES.radius,
                marginHorizontal:30,
                maxWidth:340,
            }}>
                <Ionicons name='information-circle-sharp' style={{marginBottom:8}} color={colors.title} size={60}/>
                <Text style={{...FONTS.h5,color:colors.title,marginBottom:5}}>{title}</Text>
                <Text style={{...FONTS.font,color:colors.text,textAlign:'center'}}>{confirmationText}</Text>
                <View style={{flexDirection:'row',marginTop:25}}>
                    <Button 
                        onPress={() => close(false)}
                        color={COLORS.danger} 
                        style={{marginRight:10}}
                        title="Cancel"/>
                    <Button 
                        onPress={() => isConfirmed(true)}
                        title="Confirm"
                        color={COLORS.primary}
                        />
                       
                </View>
            </View>
        </>
    );
};


export default OptionModal;
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react';
import { COLORS, FONTS } from '../../constants/theme'
import { GlobalStyleSheet } from '../../constants/StyleSheet'
import { useTheme } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigation/RootStackParamList'
import Input from '../../components/Input/Input'
import { IMAGES } from '../../constants/Images'
import Button from '../../components/Button/Button'
import { useDispatch } from 'react-redux';
import { setUserDetail } from '../../redux/reducer/authReducer';
import { useApi } from '../../services/api/apiClient';
import { Endpoints } from '../../config/endpoints';


type SignInScreenProps = StackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn = ({navigation} : SignInScreenProps) => {

    const [phone , setPhone] = useState('');
    const [otp, setOtp] = useState('');

    const { data: loginResponseData, error: loginError, loading: loginLoading, refetch: login } = useApi(Endpoints.LOGIN_BY_PHONE, false, { method: 'POST', data: { phone: phone } });

    const { data: submitOtpResponseData, error: submitOtpError, loading: submitOtpLoading, refetch: submitOtp } = useApi(Endpoints.LOGIN_UPDATE_TOKEN, false, { method: 'POST', data: { phone: phone, otp: otp } });

    const dispatch = useDispatch();

    const theme = useTheme();
    const { colors }: { colors : any} = theme;

    const [isFocused , setisFocused] = useState(false);
    const [isFocused2 , setisFocused2] = useState(false);
    const [loading , setLoading] = useState(false);

    const [showLogin , setShowLogin] = useState(false);

    useEffect(() => {
        if(loginResponseData?.status === 'success'){
            setShowLogin(true);
        }
    }, [loginResponseData])

    useEffect(() => {
        if(submitOtpResponseData?.status === 'success'){
            dispatch(setUserDetail(submitOtpResponseData.data.userDetail));
            navigation.navigate('DrawerNavigation', {screen : 'Home'});
        }
    }, [submitOtpResponseData])

  return (
    <SafeAreaView style={{flex:1,backgroundColor:colors.card,}}>
        <View style={[GlobalStyleSheet.container,{justifyContent:'center',alignItems:'center',paddingVertical:50}]}>
            <Image
                style={{resizeMode:'contain',height:36,width:120}}
                source={theme.dark ? IMAGES.appnamedark :IMAGES.appname}
            />
        </View>
        <ScrollView style={{flexGrow:1,}} showsVerticalScrollIndicator={false}>
            <View style={[GlobalStyleSheet.container,{flexGrow:1,paddingBottom:0,paddingHorizontal:30,paddingTop:0}]}>
                <View style={{}}>
                    <View style={{marginBottom:30}}>
                        <Text style={[styles.title1,{color:colors.title}]}>Sign In</Text>
                        {/* <Text style={[styles.title2, {color: colors.title }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</Text> */}
                    </View>

                    <View style={[GlobalStyleSheet.container, {padding:0}]}>
                        <Text style={[styles.title3, {color:'#8A8A8A'}]}>Phone Number</Text>
                    </View>
                    <View style={{ marginBottom: 20, marginTop: 10 }}>
                        <Input 
                            onFocus={() => setisFocused(true)}
                            onBlur={() => setisFocused(false)}
                            onChangeText={(value) => setPhone(value)}
                            isFocused={isFocused}
                            inputBorder
                        />
                    </View>
                    {/* <View style={[GlobalStyleSheet.container,{padding:0}]}>
                        <Text style={[styles.title3,{color:'#8A8A8A'}]}>Username</Text>
                    </View> */}
                    {/* <View style={{ marginBottom: 20, marginTop: 10 }}>
                        <Input
                            onFocus={() => setisFocused(true)}
                            onBlur={() => setisFocused(false)}
                            onChangeText={(value) => console.log(value)}
                            isFocused={isFocused}
                            inputBorder
                            defaultValue='williamsmith'
                        />
                    </View> */}
                    {/* <View style={[GlobalStyleSheet.container,{padding:0}]}>
                        <Text style={[styles.title3,{color:'#8A8A8A'}]}>Password</Text>
                    </View> */}
                    {/* <View style={{ marginBottom: 10,marginTop:10 }}>
                        <Input
                            onFocus={() => setisFocused2(true)}
                            onBlur={() => setisFocused2(false)}
                            backround={colors.card}
                            onChangeText={(value) => console.log(value)}
                            isFocused={isFocused2}
                            type={'password'}
                            inputBorder
                            defaultValue='123456789'
                        />
                    </View> */}
                </View>
                {showLogin && (
                        <>
                            <View style={[GlobalStyleSheet.container, {padding:0}]}>
                                <Text style={[styles.title3, {color:'#8A8A8A'}]}>OTP</Text>
                            </View>
                            <View style={{ marginBottom: 20, marginTop: 10 }}>
                                <Input 
                                    onFocus={() => setisFocused2(true)}
                                    onBlur={() => setisFocused2(false)}
                                    onChangeText={(value) => setOtp(value)}
                                    isFocused={isFocused2}
                                    inputBorder
                                    />
                            </View>
                        </>
                    )
                }
                <View style={{marginTop:30}}>
                    {!showLogin && 
                        <Button
                        title={"SEND OTP"}
                        // onPress={() => navigation.navigate('DrawerNavigation',{screen : 'Home'} )}
                        onPress={login}
                        style={{borderRadius:52}}
                        />
                    }

                    {showLogin && 
                        <Button
                        title={"LOGIN"}
                        // onPress={() => navigation.navigate('DrawerNavigation',{screen : 'Home'} )}
                        onPress={submitOtp}
                        style={{borderRadius:52}}
                        />
                    }

                    {showLogin && 
                        <Button
                            title={"Resend OTP"}
                            onPress={login}
                            style={{borderRadius:52, marginTop:10}}    
                        />
                    }
                    {/* <View 
                        style={[GlobalStyleSheet.flex,{
                            marginBottom:20,
                            marginTop:10,
                            paddingHorizontal:10,
                            justifyContent:'flex-start',
                            gap:5
                        }]}
                    >
                        <Text style={[styles.text,{color:colors.title}]}>Forgot Password?</Text>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => navigation.navigate('ForgotPassword')}
                        >
                            <Text style={{...FONTS.fontMedium,fontSize:14,color:COLORS.primary}}>Reset here</Text>
                        </TouchableOpacity>
                    </View> */}
                    {/* <View style={{marginBottom:15}}>
                        <Text style={[styles.title2, {color: colors.title,textAlign:'center',opacity:.5 }]}>Don’t have an account?</Text>
                    </View> */}
                    {/* <Button
                        title={"Create an account"}
                        onPress={() => navigation.navigate('SignUp')}
                        text={COLORS.title}
                        color={COLORS.secondary}
                        style={{borderRadius:52}}
                    /> */}
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    text:{
        ...FONTS.fontRegular,
        fontSize:14,
        color:COLORS.title,
    },
    title1:{
        ...FONTS.fontSemiBold,
         fontSize: 24,
        color: COLORS.title,
        marginBottom: 5 
    },
    title2:{
        ...FONTS.fontRegular,
        fontSize: 14,
        color: COLORS.title, 
    },
    title3:{
        ...FONTS.fontMedium,
        fontSize:14,
        color:'#8A8A8A'
    }
})

export default SignIn
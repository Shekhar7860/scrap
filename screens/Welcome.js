import {Platform, StyleSheet, Text, View, TouchableOpacity, Share,  Image, StatusBar, TouchableHighlight} from 'react-native';

import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { InterstitialAdManager, NativeAdsManager,  BannerView, AdSettings  } from 'react-native-fbads';
const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const advert2 = firebase.admob().rewarded('ca-app-pub-7416314702588910/8553668860')
const advert = firebase.admob().interstitial('ca-app-pub-7416314702588910/4374255869')
const request = new AdRequest();
request.addKeyword('foobar');
export default class Welcome extends Component {

  componentDidMount = () => {
  
  }
  static navigationOptions = {
    title: "Welcome"
  }
  goToProducts = () => {
    // AdSettings.addTestDevice(AdSettings.currentDeviceHash);
    // InterstitialAdManager.showAd("434555400602082_434557547268534")
    // .then(didClick => {
    //   console.log('working')
    // })
    // .catch(error => {
    //   console.log(error, 'fb add rror')
    // });
         advert.loadAd(request.build());
    advert2.loadAd(request.build())

    advert2.on('onAdLoaded', () => {
       console.log('Advert2 ready to show.')
    })
    
    advert2.show()

advert.on('onAdLoaded', () => {
  console.log('Advert ready to show.');
});

setTimeout(() => {
  if (advert.isLoaded()) {
    console.log('working')
    advert.show();
  } else {
    console.log('error occured')
  }
}, 1000);
    this.props.navigation.navigate('Join' )
  }
  share = () => {
    Share.share({
      message: 'Checkout Modicare Products - https://play.google.com/store/apps/details?id=com.newadd',
      url: 'https://play.google.com/store/apps/details?id=com.newadd',
      title: 'Start Your Own Business'
    }, {
      // Android only:
      dialogTitle: 'Share the app',
      // iOS only:
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
    })
  }
  render() {
    const { navigate } = this.props.navigation
    return (
        <View style={styles.mainContainer}>
               <View style={styles.toolbar}>
                    <Text style={styles.toolbarButton}></Text>
                    <Text style={styles.toolbarTitle}>Home</Text>
                    <TouchableOpacity style={styles.toolbarButton}onPress={() => this.share()}>
                    <Image style={{width:30,marginLeft:5,  height:30}} source={require('../images/share.png')}></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>

 
                    <View style={styles.messageBox}>
                       
                            <Text style={styles.topText}>Welcome Mesage (स्वागत संदेश)</Text>
                       
                            <Text style={styles.messageBoxBodyText}>Hello everyone, Here is an application that can help you to avail waste cleaning services at your home (सभी को नमस्कार, यहां एक एप्लिकेशन है जो आपको अपने घर पर अपशिष्ट सफाई सेवाओं का लाभ उठाने में मदद कर सकता है)</Text>
                            <Text style={styles.messageBoxBodyText}>If you are busy and dont have time to sell your old goods, e-waste, you can fill the form (यदि आप व्यस्त हैं और अपने पुराने माल, ई-कचरे को बेचने का समय नहीं है, तो आप फॉर्म भर सकते हैं) </Text>
                            <TouchableHighlight style={styles.fullWidthButton} onPress={() => this.goToProducts()}>
            <Text style={styles.fullWidthButtonText}>Let's get started</Text>
            </TouchableHighlight>
            <Text style={styles.messageBoxBodyText2}>If you have any query related to online scrap collection services, you can call me +919646407363 (यदि आपके पास ऑनलाइन स्क्रैप संग्रह सेवाओं से संबंधित कोई क्वेरी है, तो आप मुझे +919646407363 पर कॉल कर सकते हैं)</Text>
                    </View>
                </View>
                <View style={styles.footer}>
       <Banner
       style={{alignSelf:'center',marginLeft:20}}
    size={"SMALL_BANNER"}
  unitId={"ca-app-pub-7416314702588910/7523163389"}
  request={request.build()}
  onAdLoaded={() => {
    console.log('Advert loaded');
  }} />
  </View>
            </View>
            
    );
  }
};
const styles = StyleSheet.create({
    toolbar:{
        backgroundColor:'#f39c12',
        paddingTop:20,
        paddingBottom:10,
        flexDirection:'row'    //Step 1
    },
    toolbarButton:{
        width: 50,            //Step 2
        color:'#fff',
        textAlign:'center'
    },
    toolbarTitle:{
        color:'#fff',
        textAlign:'center',
        fontWeight:'bold',
        flex:1,
        fontSize:20                //Step 3
    },
    mainContainer:{
      flex:1                  //Step 1
  },
  content:{
      backgroundColor:'#ebeef0',
      flex:1                //Step 2
  },
  messageBox:{
    alignItems : 'center'
  },
  messageBoxBodyText:{
    margin:10,
    fontSize:18
  },
  messageBoxBodyText2:{
    margin:10,
    fontSize:18,
    fontWeight : 'bold'
  },
  topText:{
    fontSize:25,
    marginTop : 10,
    fontWeight : 'bold'
  },
  topText2:{
    fontSize:20,
    marginTop : 10,
    marginLeft:10
  },
  inputsContainer: {
    flex: 1,
    alignItems : 'center'
  },
  fullWidthButton: {
    backgroundColor: '#f39c12',
    height:50,
    width:'80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullWidthButtonText: {
    fontSize:24,
    color: 'white'
  },
  footer:{
    position:'absolute',
    bottom : 10,
    width : '100%'
  }
  });
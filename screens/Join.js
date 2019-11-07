import {Platform, StyleSheet, Text, View, TouchableOpacity, TextInput,  Share,  Image, StatusBar, TouchableHighlight} from 'react-native';

import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { InterstitialAdManager, NativeAdsManager,  BannerView, AdSettings  } from 'react-native-fbads';
const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const advert2 = firebase.admob().rewarded('ca-app-pub-7416314702588910/7634025782')
const advert = firebase.admob().interstitial('ca-app-pub-7416314702588910/1748092520')
const request = new AdRequest();
request.addKeyword('foobar');
export default class Join extends Component {
    constructor(props){
        super(props);
        this.state = {
         mobile : '',
         name : '', 
         location : '',
         place : ''
        };
       
     }
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
    this.props.navigation.navigate('ScreenOne' )
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

  setName = (name) => {
  this.setState ({name : name})
  }

  setMobile = (mobile) => {
    this.setState ({mobile : mobile})
    }

    setLocation = (location) => {
        this.setState ({location : location})
        }

        setPlace = (place) => {
          this.setState ({place : place})
          }

        submit = () => {
            if(this.state.name && this.state.mobile && this.state.location && this.state.mobile.length == 10)
            {
              firebase.database().ref('requests')
              .once('value')
              .then((snapshot) => {
                console.log(snapshot.numChildren(), 'fkkfkfk')
                if(snapshot.numChildren() < 50)
                {
                  firebase.database().ref('requests').push({
                  "name": this.state.name,
                  "mobile" : this.state.mobile,
                  "address" : this.state.location,
                  "place" : this.state.place
                 
                    }).then((data)=>{
                  this.setState ({name : ""})
                  this.setState ({mobile : ""})
                  this.setState ({location : ""})
                  this.setState ({place : ""})
                  alert("data received..you will receive call shortly")
                  
                    }).catch((error)=>{
                        //error callback
                        console.log('error ' , error)
                    })
                }
                else{
                  alert("an error occured! please try again after some time ")
                }
                
              })
              .catch((error) => { } );
             
             
               
            console.log('name', this.state.name, 'mobile', this.state.mobile.length, 'location', this.state.location)
            }
            else
            {
                alert("please enter valid details")
            }
        }
  render() {
    const { navigate } = this.props.navigation
    return (
        <View style={styles.mainContainer}>
               <View style={styles.toolbar}>
                    <Text style={styles.toolbarButton}></Text>
                    <Text style={styles.toolbarTitle}>User Info</Text>
                    <TouchableOpacity style={styles.toolbarButton}onPress={() => this.goToProducts()}>
                    <Text style={{color:'#fff',
        fontWeight:'bold',
        flex:1,
        fontSize:20     }}> Skip </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>

 
                    <View style={styles.messageBox}>
                       
                            <Text style={styles.topText}>Want To Sell/Deposit Scrap? (बेचना / जमा करना चाहते हैं स्क्रैप?)</Text>
                       
                            <Text style={styles.messageBoxBodyText}>Fill Details (विवरण भरें)</Text>
                            <TextInput style={styles.textInputWidth} placeholder="Enter Name" value={this.state.name} onChangeText={(text)=>
                    this.setName(text)}   keyboardType='default'></TextInput>
                    <TextInput style={styles.textInputWidth} placeholder="Enter Mobile" value={this.state.mobile} onChangeText={(text)=>
                    this.setMobile(text)} keyboardType='numeric' maxLength={10}></TextInput>
                     <TextInput style={styles.textInputWidth2} placeholder="Enter Address" value={this.state.location} onChangeText={(text)=>
                    this.setLocation(text)} ></TextInput>
                    <TextInput style={styles.textInputWidth} placeholder="Enter Place" value={this.state.place} onChangeText={(text)=>
                    this.setPlace(text)} ></TextInput>
                            <TouchableHighlight style={styles.fullWidthButton} onPress={() => this.submit()}>
            <Text style={styles.fullWidthButtonText}>Submit (प्रस्तुत)</Text>
            </TouchableHighlight>
            <Text style={styles.messageBoxBodyText2}>If you have any query related to scrap selling business, you can call me +917626879728 </Text>
                    </View>
                </View>
                <View style={styles.footer}>
       <Banner
       style={{alignSelf:'center',marginLeft:20}}
    size={"SMALL_BANNER"}
  unitId={"ca-app-pub-7416314702588910/9445800902"}
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
    alignItems : 'center',
    width:'100%'
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
  textInputWidth : {
      width : '80%',
      borderWidth:1,
      borderRadius:20,
      marginBottom:10
  }, 
  textInputWidth2 : {
    width : '80%',
    borderWidth:1,
    borderRadius:20,
    marginBottom:10,
    height : 80
}, 
  fullWidthButton: {
    backgroundColor: '#f39c12',
    height:50,
    width:'80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10
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
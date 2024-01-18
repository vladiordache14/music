import { View, 
    Text,
    StyleSheet, 
    SafeAreaView, 
    TouchableOpacity,
     Dimensions, 
     Image,
      Modal, Animated,Button } from 'react-native'

import React, {useEffect, useState, useRef} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Slider from '@react-native-community/slider';
import songs from '../model/data'
import TrackPlayer,{Capability,
    Event, RepeatMode,
     State, usePlaybackState, useProgress,
      useTrackPlayerEvents} from 'react-native-track-player';
import {  db } from '../firebase';

import { collection, addDoc, setDoc,doc, getDocs } from "firebase/firestore"; 


const {width, heigth} = Dimensions.get('window')






let songs1



const setUpPlayer = async () =>{
    songs1 = await function1()

    try{

        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop
            ]
        })
         
        
        await TrackPlayer.add(songs1);
    }catch(e){
        // console.log(e)
    }
}

const togglePayBack = async playBackState =>{
    const currentTrack = await TrackPlayer.getActiveTrackIndex();
    // console.log(currentTrack)
    if(currentTrack != null){
        // console.log(playBackState.state ,State.Paused )
        if(playBackState.state == "paused" || playBackState.state=="ready"){
            await TrackPlayer.play();
            console.log("play")
        }else{
            console.log("pause")

            await TrackPlayer.pause();}
    }
}


const function1 = async ()  =>{
    const List = [];

    const querySnapshot = await getDocs(collection(db, "songs"));
    console.log(songs)
    querySnapshot.forEach((doc) => {

        List.push(doc.data())
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
      return List;
}
 

const MusicPlayer = ({navigation}) => {

    

 

    const playBackState = usePlaybackState();
    const [songIndex, setSongIndex] = useState(0)
    const [repeatMode, setRepeatMode] = useState('off')
    const progress = useProgress()
    const [trackTitle, setTrackTitle] = useState();
    const [trackArtist, setTrackArtist] = useState();
    const [trackArtWork, setTrackArtWork] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);

    //custom references
    const scrollX = useRef(new Animated.Value(0)).current
    const songSlider = useRef(null);    //FlatList references

    const handlePress = () => {
        setIsModalVisible(true);
      };
    
      const handleOptionPress = (option) => {
        // Perform actions based on the selected option
        console.log('Selected option:', option);
        if(option=='logout')
        {
            navigation.navigate('Welcome');
        }else if(option=='profile'){
            navigation.navigate('Profile');

        }else if(option=='change'){
            navigation.navigate('ChangePassword');
        }
        // Close the modal after handling the option
        setIsModalVisible(false);
      };
    
    //changing the track on complete
    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event=>
        {
            
            
            if(event.type === Event.PlaybackTrackChanged && event.nextTrack !== null){
                const track =await TrackPlayer.getTrack(event.nextTrack);
                const img  = await TrackPlayer.Image
                console.log(track)
                const {title,artwork, artist} = track;
                setTrackTitle(title);
                setTrackArtist(artist);
                if(artwork !== '' || artwork!== null){
                    // console.log(artwork.split('?')[0])
                setTrackArtWork(artwork);
                // console.log(trackArtWork)
            }
                else{
                    console.log("tfingura")
                }
                // writeUserData()
            }
        })

    const skipTo = async trackId =>{
        await TrackPlayer.skip(trackId);
    }

    const repeatIcon = () => {
        if(repeatMode == 'off'){
            return 'repeat-off'
        }
        if(repeatMode == 'track'){
            return 'repeat-once'
        }
        if(repeatMode == 'repeat'){
            return 'repeat'
        }

    }

    const changeRepeatMode = () =>{
        if(repeatMode == 'off'){
            TrackPlayer.setRepeatMode(RepeatMode.Track)
             setRepeatMode('track')
        }
        if(repeatMode == 'track'){
            TrackPlayer.setRepeatMode(RepeatMode.Queue)

            setRepeatMode('repeat')
        }
        if(repeatMode == 'repeat'){
            TrackPlayer.setRepeatMode(RepeatMode.Off)
            setRepeatMode('off')
        }
    }

    useEffect( ()=>{

       

           setUpPlayer();
           

        
        scrollX.addListener(({value})=>{
            // console.log(value)
            const index = Math.round(value / width )
            skipTo(index)
            setSongIndex(index)
        })
    },[])

    const skipToNext = ()=>{
        songSlider.current.scrollToOffset({
            offset: (songIndex + 1)* width,
        })
    }
    const skipToPrevious = ()=>{
        songSlider.current.scrollToOffset({
            offset: (songIndex - 1)* width,
        })
    }
    const closeModal = () => {
        setIsModalVisible(false);
      };

    const renderSongs = ({}) =>{       
    
         return (
            <Animated.View style={style.mainImageWrapper}>
            <View style={[style.imageWrapper, style.elevation]}>
            <Image 
                
                source={{uri: trackArtWork}} //source={} only works with uri:
                style = {style.musicImage}  
            />
        </View>
        </Animated.View>
        )
        
    }

  return (

    <SafeAreaView style={style.container}>
    <View style={style.maincontainer}>
        {/*image */}

        <Animated.FlatList 
        ref = {songSlider}
            renderItem={renderSongs}
            data={songs1}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator = {false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
                [
                    {
                        nativeEvent : {
                            contentOffset : {x: scrollX},
                        }
                    }
                ],
                {useNativeDriver: true}
            )}
        />
        
        {/*Song content*/}

        <View >
            <Text style={[style.songContent,style.songTitle]}>{trackTitle}</Text>
            <Text style={[style.songContent,style.songArtist]}>{trackArtist}</Text>

        </View>
        {/*slider*/}

        <View>
            <Slider
            style = {style.progressBar}
                value={progress.position}
                minimumValue={0}
                maximumValue={progress.duration}
                thumbTintColor="#FFD369"
                minimumTrackTintColor="#FFD369"
                maximumTrackTintColor="#fff"
                onSlidingComplete  = { async value => 
                    await TrackPlayer.seekTo(value)
                }
            />
             {/*music progress durations */}
             <View style={style.progressLevelDuration}>
                <Text style={style.progressLabelText}>
                    {new Date(progress.position*1000)
                    .toLocaleTimeString('en-US', { hour12: false }).substring(3)}</Text>
                <Text style={style.progressLabelText}>
                    {new Date((progress.duration-progress.position)*1000)
                    .toLocaleTimeString('en-US', { hour12: false }).substring(3)}</Text>

             </View>

        </View>

        {/*music controls */}

            <View style={style.musicControlsContainer}>
            <TouchableOpacity onPress={skipToPrevious}>
            <Ionicons name = "play-skip-back-outline" size={35} color="#FFD369" />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> togglePayBack(playBackState)
            }>
            <Ionicons name = {
                playBackState.state == "playing"
                 ? "pause-circle"
                 :"play-circle"} 
                 size={75} 
                 color="#FFD369" />
            </TouchableOpacity>

            <TouchableOpacity onPress={skipToNext}>
            <Ionicons name = "play-skip-forward-outline" size={35} color="#FFD369" />
            </TouchableOpacity>
            </View>

    </View>
    <View style={style.bottomContainer}>
        <View style={style.bottomIconWrapper}>

            <TouchableOpacity onPress={()=>{}}>
            <Ionicons name = "heart-outline" size={30} color="#8888" />
            </TouchableOpacity>

            <TouchableOpacity onPress={changeRepeatMode}>
            <MaterialCommunityIcons name = {`${repeatIcon()}`} size={30}
             color={repeatMode !== 'off' ? "#FFD369":"#8888"} />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{}}>
            <Ionicons name = "share-outline" size={30} color="#8888" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePress}>
            <Ionicons name = "ellipsis-horizontal" size={30} color="#8888" />
            </TouchableOpacity>

            </View>
            
        </View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={[style.modalContainer,{ justifyContent: 'flex-end' }]}>
          <TouchableOpacity onPress={() => handleOptionPress('profile')} style={style.option}>
            <Text>View Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionPress('logout')} style={style.option}>
            <Text>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>handleOptionPress('change')} style={style.option}>
            <Text>Change Password</Text>
          </TouchableOpacity>
          <View style={style.closeButtonContainer}>
            <Button title="Close" onPress={closeModal} />
          </View>
          {/* Add more options as needed */}
        </View>
      </Modal>
    </SafeAreaView>
    
  )
}

export default MusicPlayer;

const style = StyleSheet.create({
    container :{
        flex:1,
        backgroundColor: '#222831',
        


    },
    option: {
        backgroundColor: 'white',
        height: 60, // Set a fixed height for all TouchableOpacity components
        width:130,
        padding: 10,
        borderBottomWidth: 5,
        borderBottomColor: '#ccc',
        
      },
    modalContainer: {
        flex: 1,
        justifyContent: 'bottom',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginBottom:10
      },
    maincontainer:{
        flex: 1,
        alignItems : 'center',
        justifyContent: 'center',
    },

    bottomContainer:{
        width: width,
        alignItems: 'center',
        paddingVertical: 15,
        borderTopColor : '#393E46',
        borderWidth:1
    },

    bottomIconWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',

    },
    mainImageWrapper:{
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },

    imageWrapper:{
        width: 300,
        height: 340,
        marginBottom: 20,
        marginTop: 20
    },

    musicImage :{
        width: '100%',
        height: '100%',
        borderRadius: 15
    },

    elevation:{
        elevation: 5,
        shadowColor: '#ccc',
        shadowOffset:{
            width:5,
            height: 4
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
    },

    songContent:{
        textAlign: 'center',
        color: '#EEEEEE'
    },

    songTitle:{
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        color: '#EEEEEE',
    },
    songArtist:{
        fontSize: 16,
        fontWeight: '300',
        
    },
    progressBar:{
        width:350,
        height: 40,
        marginTop: 25,
        flexDirection: 'row',
    },

    progressLevelDuration:{
        width: 340,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    progressLabelText:{
        color: '#fff',
        fontWeight: '500'
    },

    musicControlsContainer:{
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent :'space-between',
        width: '60%',
        marginTop: 10

    },
    closeButtonContainer: {
        marginTop: 10,
        alignItems: 'center',
      },



})
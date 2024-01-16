import { collection, addDoc, setDoc,doc, getDoc } from "firebase/firestore"; 
import React, {useEffect, useState, useRef} from 'react'
import {  db } from '../firebase';

const function1 = async ()  =>{
    const docRef = doc(db, "songs", "fbl3ws9Q0Y1lkLGQyCLu");
    const  docSnap =  await getDoc(docRef);

    if (docSnap.exists()) {
  
    const List = [];
    // List.push(docSnap.data())
    // console.log("Document data:", List);
    // console.log("Songs data   :", songs)

    const songs1 =[
        {
            id:1,
            title: 'Nu-mi da drumul',
            artist: 'Vali Spaider',
            artwork: require('../music_assets/img/3773.jpg'),
            url: require('../music_assets/audio/numidadrumul.mp3')
        },
        {
            id:2,
            title: 'mamaie',
            artist: 'Nicu Spaider',
            artwork: require('../music_assets/img/animals.jpg'),
            url: require('../music_assets/audio/mamaie.mp3')
        },
        {
            id:3,
            title: 'Tremura II',
            artist: 'Andra Gogan',
            artwork: require('../music_assets/img/16627.jpg'),
            url: require('../music_assets/audio/tremura2.mp3')
        },
        // {
        //     id:4,
        //     title: 'Animals',
        //     artist: 'Martin Garrix',
        //     artwork: require('../music_assets/img/16627.jpg'),
        //     url: require('../music_assets/audio/animals.mp3')
        // },
        // {
        //     id:5,
        //     title: 'Bangarang',
        //     artist: 'Skrillex',
        //     artwork: require('../music_assets/img/skrillex.jpg'),
        //     url: require('../music_assets/audio/bangarang.mp3')
        // },
        // {
        //     id:6,
        //     title: 'Gooba',
        //     artist: 'SIXNINE',
        //     artwork: require('../music_assets/img/3773.jpg'),
        //     url: require('../music_assets/arudio/gooba.mp3')
        // }
    ]
    // List=songs1
  return songs1;
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
}


 
// const  songs = await function1();
const songs =[
    {
        id:1,
        title: 'Nu-mi da drumul',
        artist: 'Vali Spaider',
        artwork: require('../music_assets/img/3773.jpg'),
        url: require('../music_assets/audio/numidadrumul.mp3')
    },
    {
        id:2,
        title: 'mamaie',
        artist: 'Nicu Spaider',
        artwork: require('../music_assets/img/animals.jpg'),
        url: require('../music_assets/audio/mamaie.mp3')
    },
    {
        id:3,
        title: 'Tremura II',
        artist: 'Andra Gogan',
        artwork: require('../music_assets/img/16627.jpg'),
        url: require('../music_assets/audio/tremura2.mp3')
    },
    {
        id:4,
        title: 'Animals',
        artist: 'Martin Garrix',
        artwork: require('../music_assets/img/16627.jpg'),
        url: require('../music_assets/audio/animals.mp3')
    },
    {
        id:5,
        title: 'Bangarang',
        artist: 'Skrillex',
        artwork: require('../music_assets/img/skrillex.jpg'),
        url: require('../music_assets/audio/bangarang.mp3')
    },
    {
        id:6,
        title: 'Gooba',
        artist: 'SIXNINE',
        artwork: require('../music_assets/img/3773.jpg'),
        url: require('../music_assets/audio/gooba.mp3')
    }
]

export default songs;


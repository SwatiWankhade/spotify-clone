// console.log("Shri SHivay Namahstubhyam")

// Initialize var
let songIndex=0;
let audioElement = new Audio('/song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myPrgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// crreate array
let songs = [
    
    {songName: "Let me love you", filePath: "/song/1.mp3", coverPath: " /covers/cover1.jpeg"},
    {songName: "Ik Variya", filePath: "/song/2.mp3", coverPath: " /covers/cover2.jpg"},
    {songName: "chogada ", filePath: "/song/3.mp3", coverPath: " /covers/cover3.jpeg"},
    {songName: "jiyore bahubali", filePath: "/song/4.mp3", coverPath: " /covers/cover4.jpeg"},
    {songName: "tum hi ho bandhu", filePath: "/song/5.mp3", coverPath: " /covers/cover5.jpeg"},
    {songName: "surraiya ", filePath: "/song/6.mp3", coverPath: " /covers/cover6.jpg"},
    {songName: "alan walker spects", filePath: "/song/7.mp3", coverPath: " /covers/cover7.jpg"}    
]

songItems.forEach((element,i) => {
// console.log(element,i);
element.getElementsByTagName('img')[0].src=songs[i].coverPath;
element.getElementsByClassName('songName')[0].innerText=songs[i].songName;

});

// Listen events
// play/pause
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
});

audioElement.addEventListener('timeupdate', ()=>{
    // console.log("Time update");
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myPrgressBar.value=progress;
});

myPrgressBar.addEventListener('change',()=>{
   audioElement.currentTime=myPrgressBar.value*audioElement.duration/100;
});

const makeAllplays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        // console.log(e.target)
        makeAllplays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src=`song/${songIndex+1}.mp3`;
        masterSongName.innerHTML=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    });
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=6){
        songIndex=0;
    }else{
       songIndex += 1;
    }
    audioElement.src=`song/${songIndex+1}.mp3`;
    masterSongName.innerHTML=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex=0;
    }else{
        songIndex -=1;
    }
    audioElement.src=`song/${songIndex+1}.mp3`;
    masterSongName.innerHTML=songs[songIndex].songName;
    audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
});

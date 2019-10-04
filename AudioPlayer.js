import { Audio } from "expo-av";

const sounds = {
  meditationOnTheBuddha: {
      asset: require('./assets/audio/Meditation_on_the_Buddha_2019-07-30.mp3'),
      id: 0
  },
  buddhaMantra: {
    asset: require('./assets/audio/Buddhas_mantra_2019-07-30.mp3'),
    id: 1
  },
  dedicationPrayer: {
    asset: require('./assets/audio/Dedication_Prayer_for_Med_on_the_Buddha_2019-07-30.mp3'),
    id: 3
  },
  sbMantra3: {
    asset: require('./assets/audio/SB-Mantra-3.mp3'),
    id: 3
  },
};

let currentlyPlayingSoundObject = null;
let currentlyPlayingId = null;

export default async function playSoundAndOrStop(key) {

  let sound = sounds[key];

  if (!sound) {
    throw new Error("Failed to find sound for key " + key);
    return;
  }

  if (currentlyPlayingSoundObject !== null) {
    await currentlyPlayingSoundObject.stopAsync();
    currentlyPlayingSoundObject = null;
    currentlyPlayingId = null;
    return;
  }

  if (currentlyPlayingId !== sound.id) {
    currentlyPlayingSoundObject = new Audio.Sound();
    await currentlyPlayingSoundObject.loadAsync(sound.asset);
    currentlyPlayingSoundObject.playAsync();
  }


}
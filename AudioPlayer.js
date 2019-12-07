import { Audio } from "expo-av";

export const sounds = {
  meditationOnTheBuddha: {
    asset: require('./assets/audio/Meditation_on_the_Buddha_2019-07-30.mp3'),
    id: 0,
    durationSeconds: 2211
  },
  buddhaMantra: {
    asset: require('./assets/audio/Buddhas_mantra_2019-07-30.mp3'),
    id: 1,
    durationSeconds: 81
  },
  dedicationPrayer: {
    asset: require('./assets/audio/Dedication_Prayer_for_Med_on_the_Buddha_2019-07-30.mp3'),
    id: 2,
    durationSeconds: 167
  },
  meaningOfTheMantra: {
    asset: require('./assets/audio/SB-Mantra-3.mp3'),
    id: 3,
    durationSeconds:172
  },
};

export const millisecondsToMinutesAndSeconds = (millis) => {
  return secondsToMinutesAndSeconds(Math.floor(millis/1000));
};

export const secondsToMinutesAndSeconds = (totalSeconds) => {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  return {minutes, seconds};
};

export const secondsToFormattedTimeString = (totalSeconds) => {
  let {minutes, seconds} = secondsToMinutesAndSeconds(totalSeconds);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

let currentlyPlayingSoundObject = null;
let currentlyPlayingAudioStopCallback = null;

export async function stopAudioAndClear() {
  if (currentlyPlayingSoundObject !== null) {
    await currentlyPlayingSoundObject.stopAsync();
    currentlyPlayingSoundObject = null;
  }
}

export async function pauseAudio() {
  if (currentlyPlayingSoundObject !== null) {
    await currentlyPlayingSoundObject.pauseAsync();
  }
}

export async function unpauseAudio() {
  if (currentlyPlayingSoundObject !== null) {
    await currentlyPlayingSoundObject.playAsync();
  }
}

export default async function playSoundAndOrStop(sound, playbackStatusCallback, audioStoppedCallback) {

  if (currentlyPlayingSoundObject !== null) {
    await currentlyPlayingSoundObject.stopAsync();
    if (currentlyPlayingAudioStopCallback) currentlyPlayingAudioStopCallback();
    currentlyPlayingSoundObject = null;
  }

  currentlyPlayingAudioStopCallback = audioStoppedCallback;
  currentlyPlayingSoundObject = new Audio.Sound();
  if (playbackStatusCallback) {
    currentlyPlayingSoundObject.setOnPlaybackStatusUpdate(playbackStatusCallback);
  }
  await currentlyPlayingSoundObject.loadAsync(sound.asset);
  await currentlyPlayingSoundObject.playAsync();

}
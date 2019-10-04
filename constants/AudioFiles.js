import { Audio } from 'expo-av';

async function LoadSound(source, shouldPlay) {
  const soundObject = new Audio.Sound();
  await soundObject.loadAsync(source);
  if (shouldPlay) soundObject.playAsync();
  return soundObject;
}

export default {
  loadSound: LoadSound,
  buddhaMantra: require('../assets/audio/Buddhas_mantra_2019-07-30.mp3'),
  dedicationPrayer: require('../assets/audio/Dedication_Prayer_for_Med_on_the_Buddha_2019-07-30.mp3'),
  meditationOnTheBuddha: require('../assets/audio/Meditation_on_the_Buddha_2019-07-30.mp3'),
  sbMantra3: require('../assets/audio/SB-Mantra-3.mp3')
}
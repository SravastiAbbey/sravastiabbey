import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { Button as RNEButton } from 'react-native-elements';
import UnderConstruction from '../components/UnderConstruction';
import Colors from '../constants/Colors';
import Links from '../constants/Links';
import Anchor from '../components/Anchor';
import AudioPlayer from "../AudioPlayer";
import AnimatedTextSwitch from "../components/AnimatedTextSwitch";
import { Audio } from 'expo-av';

export default class PracticeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.playMeditationOnTheBuddha = this.playMeditationOnTheBuddha.bind(this);
  }

  static navigationOptions = {
    title: 'Practice',
    headerTintColor: Colors.tintColor,
    headerTitleStyle :{textAlign: 'center', alignSelf:'center', flex:1},
    headerBackground: (
      <Image style={{ flex: 1, width: undefined, height: undefined, resizeMode: 'contain' }} 
        source={require('../assets/images/header.png')}
      />
    ),
  };



  playingSoundObject = null;
  playSoundId = null;

  async playMeditationOnTheBuddha() {

    try {
      AudioPlayer('meditationOnTheBuddha');
    }
    catch (e) {

    }

  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.quoteContainer}>

          <Text style={styles.headerText}>
            Meditation on the Buddha
          </Text>

          <RNEButton
            onPress={this.playMeditationOnTheBuddha}
            title="Play a Meditation on the Buddha"
            containerStyle={{
              width:'90%',
              marginLeft:'5%'
            }}
          />

          <Text style={styles.bodyText}>
            Begin by observing your breath for a few minutes to calm the mind.
          </Text>
          <Text style={styles.bodyText}>
            Think of the qualities of infinite love, compassion, wisdom, skillful means,
            and other wonderful qualities you aspire to develop. What would it feel like
            to be those qualities? Get a sense of the expansiveness and peace of having
            a wise and kind heart that reaches out impartially to work for the benefit
            of all beings.
          </Text>
          <Text style={styles.bodyText}>
            Those qualities of love, compassion, wisdom, skillful means, and so on now appear
            in the physical form of the Buddha, in the space in front of you. He sits on a
            throne, above which is an open lotus flower, and cushions of the sun and moon
            disks. His body is made of radiant, transparent light, as is the entire
            visualization. His body is golden and he wears the robes of a monastic. His right
            palm rests on his right knee and his left is in his lap, holding a bowl of nectar,
            which is medicine to cure our afflictions and other hindrances. The Buddha’s face is
            very beautiful. His smiling, compassionate gaze looks at you with total acceptance
            and simultaneously encompasses all sentient beings. His eyes are long, narrow,
            and peaceful. His lips are red and his earlobes long.
          </Text>
          <Text style={styles.bodyText}>
            Rays of light emanate from each pore of the Buddha’s body and reach every part of
            the universe. These rays carry countless miniature Buddhas, some going out to help
            beings, others dissolving back into the Buddha after having finished their work.
          </Text>
          <Text style={styles.bodyText}>
            The Buddha is surrounded by the entire lineage of spiritual teachers, all meditational
            deities, innumerable other Buddhas, bodhisattvas, arhats, dakas, dakinis, and Dharma
            protectors. To the side of each spiritual mentor is an elegant table upon which are
            arranged volumes of Dharma teachings.
          </Text>
          <Text style={styles.bodyText}>
            Surrounding you are all sentient beings appearing in human form, with your mother on your
            left and your father on your right. The people you do not get along with are in front of
            you. All of you are looking at the Buddha for guidance.
          </Text>
          <Text style={styles.headerText}>
            Refuge and Bodhichitta
          </Text>
          <Text style={styles.bodyText}>
            To cultivate a sense of refuge, first think of the dangers of cyclic existence by remembering
            your own lack of security, dissatisfaction, and suffering. Then think of all other sentient
            beings who, like you, flounder in cyclic existence, and generate compassion for them. Finally,
            think of the wonderful qualities of the Buddhas, Dharma, and Sangha, and generate confidence
            in their ability to guide you from the constantly recurring problems of cyclic existence.
            Since it’s possible on the basis of your present life and mind to free yourself from all
            these undesirable experiences, resolve to explore that possibility to its fullest. Feel great
            trust and confidence in the Three Jewels and open your heart to rely on them to guide you and
            others from the torments of cyclic existence to the peace of liberation and awakening.
          </Text>
          <Text style={styles.bodyText}>
            As you take refuge, imagine leading all the sentient beings around you in going for refuge to the
            Three Jewels. Visualize radiant light flowing from the spiritual mentors, Buddhas, bodhisattvas,
            and other holy beings into you and into all the beings around you, completely purifying all
            destructive karmic imprints and afflictions. The light also enriches you with all the wondrous
            qualities and realizations of the path.
          </Text>
          <View style={styles.blockQuoteContainer}>
            <Text style={styles.blockQuote}>
              Namo Gurubhya.
            </Text>
            <Text style={styles.blockQuote}>
              Namo Buddhaya.
            </Text>
            <Text style={styles.blockQuote}>
              Namo Dharmaya.
            </Text>
            <Text style={styles.blockQuote}>
              Namo Sanghaya. (3x or 7x)
            </Text>
          </View>
          <Text style={styles.bodyText}>
            Feel that you and all others have come under the protection of the Three Jewels.
          </Text>
          <Text style={styles.bodyText}>
            Now turn your thoughts to others and contemplate how much we depend on them for everything we
            enjoy and know in our lives. Our food, clothing, and everything we use and enjoy come due to
            their efforts. Similarly, our knowledge, talents, and good qualities have been developed due
            to the kindness of others. Even our ability to practice the Dharma and gain realizations depends
            on the kindness of sentient beings.
          </Text>
          <Text style={styles.bodyText}>
            Just as your innermost wish is to be free from suffering and to abide in happiness, so too is it
            the aspiration of all other beings. But, they, like you, encounter sufferings and problems in their
            lives, and often their difficulties are much worse than your own.
          </Text>
          <Text style={styles.bodyText}>
            Examine your capacity to help them. At this time your ability to help them is quite limited, but if
            you reduce your own ignorance, anger, attachment, and other faults, and increase your good qualities
            such as generosity, fortitude, loving-kindness, compassion, and wisdom, you will be of greater benefit.
            If you become a fully awakened Buddha, you will be of the greatest possible benefit to all beings. Thus
            generate the altruistic intention to become a Buddha in order to benefit all sentient beings most
            effectively. As you recite the refuge and bodhicitta prayer, much light flows from the Buddhas and
            other holy beings into you and all other sentient beings around you, purifying and enriching your minds.
          </Text>
          <View style={styles.blockQuoteContainer}>
            <Text style={styles.blockQuote}>
              I take refuge until I have awakened in the Buddhas, the Dharma, and the Sangha. By the merit I create by
              engaging in generosity and the other far-reaching practices, may I attain Buddhahood in order to benefit
              all sentient beings. (3x)
            </Text>
          </View>
          <Text style={styles.bodyText}>
            The Buddha is extremely pleased with your altruistic intention. A replica emerges from him and goes to
            the crown of your head. He melts into golden, radiant light that flows into you, and you and the Buddha
            become inseparable. Feel close to the Buddha, and feel that your mind has been inspired and transformed.
          </Text>
          <Text style={styles.bodyText}>
            Let go of all conceptions you have about yourself, particularly any self-denigrating thoughts and the
            concept of inherent existence, and meditate on emptiness. (Meditate)
          </Text>
          <Text style={styles.bodyText}>
            At your heart appears a small Buddha made of light. He radiates the light of wisdom and compassion in all
            directions, throughout the entire universe. The light transforms all sentient beings into Buddhas and
            transforms all environments into pure lands—places with all conducive circumstances for practicing the
            Dharma and generating realizations of the path. (Meditate)
          </Text>
          <Text style={styles.bodyText}>
            You have transformed all sentient beings and their environments into awakened beings and pure lands in
            your imagination. Why hasn’t this become a reality? Because we sentient beings have bias and prejudice,
            and lack love, compassion, and joy. Wishing yourself and others to have these, contemplate the four
            immeasurables. Reinforce your feelings of love, compassion, joy, and equanimity for everyone—friends,
            relatives, strangers, as well as those who you dislike, mistrust, disapprove of, and those who have
            harmed you in the past.
          </Text>
          <View style={styles.blockQuoteContainer}>
            <Text style={styles.blockQuote}>
              May all sentient beings have happiness and its causes.
            </Text>
            <Text style={styles.blockQuote}>
              May all sentient beings be free of suffering and its causes.
            </Text>
            <Text style={styles.blockQuote}>
              May all sentient beings not be separated from sorrowless bliss.
            </Text>
            <Text style={styles.blockQuote}>
              May all sentient beings abide in equanimity, free of bias, attachment, and anger.
            </Text>
          </View>

          <Text style={styles.headerText}>
            Seven-limb Prayer
          </Text>

          <View style={styles.blockQuoteContainer}>
            <Text style={styles.blockQuote}>
              Reverently I prostrate with my body, speech, and mind,
            </Text>
          </View>
          <Text style={styles.bodyText}>
            Imagine you and sentient beings throughout infinite space bow to the field of merit.
          </Text>

          <View style={styles.blockQuoteContainer}>
            <Text style={styles.blockQuote}>
              And present clouds of every type of offering, actual and mentally transformed.
            </Text>
          </View>
          <Text style={styles.bodyText}>
            Imagine every beautiful object you can and offer it to the field of merit. Imagine
            the sky filled with lovely offerings, and offer them. Similarly, think of everything
            and everyone to whom you are attached, and offer them to the field of merit as well.
          </Text>

          <View style={styles.blockQuoteContainer}>
            <Text style={styles.blockQuote}>
              I confess all my destructive actions accumulated since beginningless time,
            </Text>
          </View>
          <Text style={styles.bodyText}>
            Acknowledge your past mistakes and harmful actions and purify them by contemplating
            the four opponent powers: 1) regret, 2) taking refuge and generating bodhicitta, 3)
            determining not to do them again, and 4) engaging in a remedial action.
          </Text>

          <View style={styles.blockQuoteContainer}>
            <Text style={styles.blockQuote}>
              And rejoice in the virtues of all holy and ordinary beings.
            </Text>
          </View>
          <Text style={styles.bodyText}>
            Think of the virtues of all the holy and ordinary beings and feel happy. Abandon any
            feeling of jealousy or envy and rejoice in all the goodness in the world.
          </Text>

          <View style={styles.blockQuoteContainer}>
            <Text style={styles.blockQuote}>
              Please remain until cyclic existence ends,
            </Text>
          </View>
          <Text style={styles.bodyText}>
            Offer a double dorje, symbolizing long life, to the field of merit, and request them
            to live long and always be part of your life.
          </Text>

          <View style={styles.blockQuoteContainer}>
            <Text style={styles.blockQuote}>
              And turn the wheel of Dharma for sentient beings.
            </Text>
          </View>
          <Text style={styles.bodyText}>
            Offer a thousand-spoked Dharma wheel to the field of merit, requesting them to teach
            the Dharma and to guide you in your practice.
          </Text>

          <View style={styles.blockQuoteContainer}>
            <Text style={styles.blockQuote}>
              I dedicate all the virtues of myself and others to the great awakening.
            </Text>
          </View>
          <Text style={styles.bodyText}>
            Rejoicing at your own and others’ merit, dedicate it to the awakening of yourself and all
            sentient beings.
          </Text>

          <Text style={styles.headerText}>
            Mandala Offering
          </Text>

          <Text style={styles.bodyText}>
            With the wish to offer everything in the universe in order to receive Dharma teachings and to
            realize them in your mindstream, imagine the entire universe and everything beautiful in it,
            and respectfully offer it to the field of merit.
          </Text>

          <View style={styles.blockQuoteContainer}>
            <Text style={styles.blockQuote}>
              This ground, anointed with perfume, flowers strewn,
            </Text>
            <Text style={styles.blockQuote}>
              Mount Meru, four lands, sun and moon,
            </Text>
            <Text style={styles.blockQuote}>
              Imagined as a Buddha land and offered to you.
            </Text>
            <Text style={styles.blockQuote}>
              May all beings enjoy this pure land.
            </Text>

            <Text style={styles.blockQuote}>
            </Text>

            <Text style={styles.blockQuote}>
              The objects of attachment, aversion, and ignorance—friends, enemies, and strangers, my body,
              wealth, and enjoyments—I offer these without any sense of loss. Please accept them with pleasure,
              and inspire me and others to be free from the three poisonous attitudes.
            </Text>

            <Text style={styles.blockQuote}>
            </Text>

            <Text style={styles.blockQuote}>
              Idam guru ratna mandala kam nirya tayami
            </Text>

          </View>

          <Text style={styles.bodyText}>
            All the beings in the field of merit receive your offerings with delight. The offerings dissolve into
            light and absorb into the Buddha’s heart. From his heart, light radiates to you, filling your body
            and mind, and inspiring you to accomplish the path.
          </Text>

          <Text style={styles.headerText}>
            Requesting Inspiration
          </Text>

          <Text style={styles.bodyText}>
            To progress on the path and develop the realizations of the path to awakening, you need the inspiration
            of the lineage of spiritual mentors, especially your principal teacher or root guru, the one who touched
            your heart so deeply with the Dharma. Thus request:
          </Text>
          <View style={styles.blockQuoteContainer}>
            <Text style={styles.blockQuote}>
              Glorious and precious root guru, sit upon the lotus and moon seat on my crown. Guiding me with your
              great kindness, bestow upon me the attainments of your body, speech, and mind.
            </Text>
          </View>

          <Text style={styles.bodyText}>
            A replica of your teacher, in the aspect of the Buddha, emerges from the Buddha in front of you and comes
            to sit on a lotus and moon cushion on your head, facing the same direction as you. The Buddha on your crown
            acts as an advocate for you in requesting inspiration from the entire field of merit as you make request to
            the lineage teachers:
          </Text>

          <View style={styles.blockQuoteContainer}>
            <Text style={styles.blockQuote}>
              Buddha, unequalled teacher and guide; Venerable protector Maitreya, his successor; Superior Asanga,
              prophesied by Buddha; to you three Buddhas and bodhisattvas I make request.
            </Text>
            <Text style={styles.blockQuote}>
              Buddha, head of the Shakya clan, the foremost guide, peerless in expounding emptiness; Manjushri,
              embodiment of the Buddha’s complete wisdom; exalted Nagarjuna, best of the Superiors who sees the
              profound meaning; to you three crowning jewels of clear exposition I make request.
            </Text>
            <Text style={styles.blockQuote}>
              Atisha, upholder of this great vehicle, who sees the profundity of dependent arising; Drom Rinpoche,
              elucidator of this good path; to these two ornaments of the world I make request.
            </Text>
            <Text style={styles.blockQuote}>
              Avalokiteshvara, great treasure of objectless compassion; Manjushri, master of flawless wisdom;
              Tsongkhapa, crown jewel of the Snowy Land’s sages, Lobsang Drakpa, I make request at your feet.
            </Text>
            <Text style={styles.blockQuote}>
              Holder of the white lotus, embodiment of all the conquerors’ compassion, guide benefiting migrating
              beings in the land of snow mountains and beyond, sole deity and refuge, Tenzin Gyatso, at your feet,
              I make request.
            </Text>
            <Text style={styles.blockQuote}>
              The eyes through whom the vast scriptures are seen, supreme doors for the fortunate who would cross
              over to spiritual freedom, illuminators whose wise means vibrate with compassion, to the entire line
              of spiritual mentors I make request.
            </Text>
          </View>

          <Text style={styles.bodyText}>
            (Optional: Review the stages of the path by reciting
            <Anchor href={Links.foundationOfAllGoodQualities}>The Foundation of All Good Qualities</Anchor>,
            <Anchor href={Links.principalAspectsOfThePath}>The Three Principal Aspects of the Path</Anchor>, or
            <Anchor href={Links.thirtySevenPractices}>The 37 Practices of Bodhisattvas</Anchor>.)
          </Text>

          <Text style={styles.bodyText}>
            All the figures in the field of merit melt into light and dissolve into the central figure of the
            Buddha in front of you. As the embodiment of the Three Jewels, the Buddha now absorbs into the
            Buddha on your crown. As you recite the Buddha’s mantra, much white light flows from the Buddha into you,
            purifying all negativities and obscurations and generating within you all the realizations of the
            stages of the path.
          </Text>

          <Text style={styles.headerText}>
            Meditation on the stages of the path
          </Text>
          <Text style={styles.bodyText}>
            Now do one of the <Anchor href={Links.analyticalMeditationsOnTheStates}>analytical meditations of
            the stages of the path</Anchor>.
          </Text>

          <Text style={styles.headerText}>
            Absorption
          </Text>
          <Text style={styles.bodyText}>
            At the conclusion of your meditation, the Buddha on your head melts into light and dissolves into you.
            Your body, speech, and mind become inseparable from those of the Buddha. (Meditate)
          </Text>

          <Text style={styles.headerText}>
            Dedication
          </Text>
          <View style={styles.blockQuoteContainer}>
            <Text style={styles.blockQuote}>
              Due to this merit may we soon
            </Text>
            <Text style={styles.blockQuote}>
              Attain the awakened state of Guru Buddha,
            </Text>
            <Text style={styles.blockQuote}>
              That we may be able to liberate
            </Text>
            <Text style={styles.blockQuote}>
              All sentient beings from their sufferings.
            </Text>

            <Text style={styles.blockQuote}>
            </Text>

            <Text style={styles.blockQuote}>
              May the precious bodhi mind
            </Text>
            <Text style={styles.blockQuote}>
              Not yet born arise and grow.
            </Text>
            <Text style={styles.blockQuote}>
              May that born have no decline,
            </Text>
            <Text style={styles.blockQuote}>
              But increase forever more.
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  quoteContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bodyText: {
    padding: 10,
    fontSize: 16,
    color: Colors.tintColor,
    fontFamily: 'open-sans-regular',
  },
  blockQuote: {
    fontSize: 16,
    padding:1,
    color: Colors.tintColor,
    fontFamily: 'open-sans-italic',
  },
  blockQuoteContainer: {
    padding: 20,
    paddingLeft: 20,
  },
  headerText: {
    padding: 20,
    paddingLeft: 10,
    fontSize: 22,
    color: Colors.tintColor,
    fontFamily: 'open-sans-bold',
  },
});

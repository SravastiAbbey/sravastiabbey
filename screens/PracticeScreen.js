import React from 'react';
import { Image, ScrollView, Text, View} from 'react-native';
import Colors from '../constants/Colors';
import Links from '../constants/Links';
import Anchor from '../components/Anchor';
import {sounds} from "../AudioPlayer";
import styles from '../styles/main';
import { inject, observer } from "mobx-react";
import {Button} from 'react-native-elements';
import AnimatedSoundPlayerButton from "../components/AnimatedSoundPlayerButton";
import HeaderBackground from "../components/HeaderBackground";
import {LightenDarkenColor} from '../Utils'
import { Linking } from 'expo';

@inject('observableStore')
@observer
export default class PracticeScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Practice',
    headerTintColor: Colors.tintColor,
    headerTitleStyle :{textAlign: 'center', alignSelf:'center', flex:1},
    headerBackground: <HeaderBackground/>,
  };

  render() {

    // get the store
    let store = this.props.observableStore;
    // get the font size and font family
    let currentFontSize = store.baseFontSize;
    let currentFontFamily = store.baseFontFamily;
    // is 'caveat' selected? if so, don't use it for the font because there's too much text
    // for a cursive font
    let bodyTextFontFamily = currentFontFamily === 'caveat' ? 'open-sans' : currentFontFamily;
    // make the body test
    let bodyTextStyle = [styles.bodyText, {
      fontSize:currentFontSize,
      fontFamily: bodyTextFontFamily
    }];
    // make the block quote text
    let blockQuoteTextStyle = [styles.blockQuote, {
      fontSize:currentFontSize,
      marginBottom:10*currentFontSize/22
    }];
    // make the block quote container
    let blockQuoteContainerStyle = [styles.blockQuoteContainer, {
      padding: 20*currentFontSize/22
    }];
    // make the header text styles
    let headerTextStyle = [styles.headerText, {
      fontSize:currentFontSize*1.3
    }];

    let buddhaHallHeaderText = [styles.headerText, {
      fontSize:currentFontSize*1.3,
      padding:0,
      margin:0,
      marginTop:10
    }];
    
    return (
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.practiceContainer}>

              <Text style={headerTextStyle}>
                Meditation on the Buddha
              </Text>

              <AnimatedSoundPlayerButton
                title={"Meditation on the Buddha"}
                sound={sounds.meditationOnTheBuddha}
                description={"Guided meditation by Venerable Chodron on the Buddha."}
              />

              <Text style={bodyTextStyle}>
                Begin by observing your breath for a few minutes to calm the mind.
              </Text>
              <Text style={bodyTextStyle}>
                Think of the qualities of infinite love, compassion, wisdom, skillful means,
                and other wonderful qualities you aspire to develop. What would it feel like
                to be those qualities? Get a sense of the expansiveness and peace of having
                a wise and kind heart that reaches out impartially to work for the benefit
                of all beings.
              </Text>
              <Text style={bodyTextStyle}>
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
              <Text style={bodyTextStyle}>
                Rays of light emanate from each pore of the Buddha’s body and reach every part of
                the universe. These rays carry countless miniature Buddhas, some going out to help
                beings, others dissolving back into the Buddha after having finished their work.
              </Text>
              <Text style={bodyTextStyle}>
                The Buddha is surrounded by the entire lineage of spiritual teachers, all meditational
                deities, innumerable other Buddhas, bodhisattvas, arhats, dakas, dakinis, and Dharma
                protectors. To the side of each spiritual mentor is an elegant table upon which are
                arranged volumes of Dharma teachings.
              </Text>
              <Text style={bodyTextStyle}>
                Surrounding you are all sentient beings appearing in human form, with your mother on your
                left and your father on your right. The people you do not get along with are in front of
                you. All of you are looking at the Buddha for guidance.
              </Text>
              <Text style={headerTextStyle}>
                Refuge and Bodhicitta
              </Text>
              <Text style={bodyTextStyle}>
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
              <Text style={bodyTextStyle}>
                As you take refuge, imagine leading all the sentient beings around you in going for refuge to the
                Three Jewels. Visualize radiant light flowing from the spiritual mentors, Buddhas, bodhisattvas,
                and other holy beings into you and into all the beings around you, completely purifying all
                destructive karmic imprints and afflictions. The light also enriches you with all the wondrous
                qualities and realizations of the path.
              </Text>
              <View style={blockQuoteContainerStyle}>
                <Text style={blockQuoteTextStyle}>
                  Namo Gurubhya.
                </Text>
                <Text style={blockQuoteTextStyle}>
                  Namo Buddhaya.
                </Text>
                <Text style={blockQuoteTextStyle}>
                  Namo Dharmaya.
                </Text>
                <Text style={blockQuoteTextStyle}>
                  Namo Sanghaya. (3x or 7x)
                </Text>
              </View>
              <Text style={bodyTextStyle}>
                Feel that you and all others have come under the protection of the Three Jewels.
              </Text>
              <Text style={bodyTextStyle}>
                Now turn your thoughts to others and contemplate how much we depend on them for everything we
                enjoy and know in our lives. Our food, clothing, and everything we use and enjoy come due to
                their efforts. Similarly, our knowledge, talents, and good qualities have been developed due
                to the kindness of others. Even our ability to practice the Dharma and gain realizations depends
                on the kindness of sentient beings.
              </Text>
              <Text style={bodyTextStyle}>
                Just as your innermost wish is to be free from suffering and to abide in happiness, so too is it
                the aspiration of all other beings. But, they, like you, encounter sufferings and problems in their
                lives, and often their difficulties are much worse than your own.
              </Text>
              <Text style={bodyTextStyle}>
                Examine your capacity to help them. At this time your ability to help them is quite limited, but if
                you reduce your own ignorance, anger, attachment, and other faults, and increase your good qualities
                such as generosity, fortitude, loving-kindness, compassion, and wisdom, you will be of greater benefit.
                If you become a fully awakened Buddha, you will be of the greatest possible benefit to all beings. Thus
                generate the altruistic intention to become a Buddha in order to benefit all sentient beings most
                effectively. As you recite the refuge and bodhicitta prayer, much light flows from the Buddhas and
                other holy beings into you and all other sentient beings around you, purifying and enriching your minds.
              </Text>
              <View style={blockQuoteContainerStyle}>
                <Text style={blockQuoteTextStyle}>
                  I take refuge until I have awakened in the Buddhas, the Dharma, and the Sangha. By the merit I create by
                  engaging in generosity and the other far-reaching practices, may I attain Buddhahood in order to benefit
                  all sentient beings. (3x)
                </Text>
              </View>
              <Text style={bodyTextStyle}>
                The Buddha is extremely pleased with your altruistic intention. A replica emerges from him and goes to
                the crown of your head. He melts into golden, radiant light that flows into you, and you and the Buddha
                become inseparable. Feel close to the Buddha, and feel that your mind has been inspired and transformed.
              </Text>
              <Text style={bodyTextStyle}>
                Let go of all conceptions you have about yourself, particularly any self-denigrating thoughts and the
                concept of inherent existence, and meditate on emptiness. (Meditate)
              </Text>
              <Text style={bodyTextStyle}>
                At your heart appears a small Buddha made of light. He radiates the light of wisdom and compassion in all
                directions, throughout the entire universe. The light transforms all sentient beings into Buddhas and
                transforms all environments into pure lands—places with all conducive circumstances for practicing the
                Dharma and generating realizations of the path. (Meditate)
              </Text>
              <Text style={bodyTextStyle}>
                You have transformed all sentient beings and their environments into awakened beings and pure lands in
                your imagination. Why hasn’t this become a reality? Because we sentient beings have bias and prejudice,
                and lack love, compassion, and joy. Wishing yourself and others to have these, contemplate the four
                immeasurables. Reinforce your feelings of love, compassion, joy, and equanimity for everyone—friends,
                relatives, strangers, as well as those who you dislike, mistrust, disapprove of, and those who have
                harmed you in the past.
              </Text>
              <View style={blockQuoteContainerStyle}>
                <Text style={blockQuoteTextStyle}>
                  May all sentient beings have happiness and its causes.
                </Text>
                <Text style={blockQuoteTextStyle}>
                  May all sentient beings be free of suffering and its causes.
                </Text>
                <Text style={blockQuoteTextStyle}>
                  May all sentient beings not be separated from sorrowless bliss.
                </Text>
                <Text style={blockQuoteTextStyle}>
                  May all sentient beings abide in equanimity, free of bias, attachment, and anger.
                </Text>
              </View>

              <Text style={headerTextStyle}>
                Seven-limb Prayer
              </Text>

              <View style={blockQuoteContainerStyle}>
                <Text style={blockQuoteTextStyle}>
                  Reverently I prostrate with my body, speech, and mind,
                </Text>
              </View>
              <Text style={bodyTextStyle}>
                Imagine you and sentient beings throughout infinite space bow to the field of merit.
              </Text>

              <View style={blockQuoteContainerStyle}>
                <Text style={blockQuoteTextStyle}>
                  And present clouds of every type of offering, actual and mentally transformed.
                </Text>
              </View>
              <Text style={bodyTextStyle}>
                Imagine every beautiful object you can and offer it to the field of merit. Imagine
                the sky filled with lovely offerings, and offer them. Similarly, think of everything
                and everyone to whom you are attached, and offer them to the field of merit as well.
              </Text>

              <View style={blockQuoteContainerStyle}>
                <Text style={blockQuoteTextStyle}>
                  I confess all my destructive actions accumulated since beginningless time,
                </Text>
              </View>
              <Text style={bodyTextStyle}>
                Acknowledge your past mistakes and harmful actions and purify them by contemplating
                the four opponent powers: 1) regret, 2) taking refuge and generating bodhicitta, 3)
                determining not to do them again, and 4) engaging in a remedial action.
              </Text>

              <View style={blockQuoteContainerStyle}>
                <Text style={blockQuoteTextStyle}>
                  And rejoice in the virtues of all holy and ordinary beings.
                </Text>
              </View>
              <Text style={bodyTextStyle}>
                Think of the virtues of all the holy and ordinary beings and feel happy. Abandon any
                feeling of jealousy or envy and rejoice in all the goodness in the world.
              </Text>

              <View style={blockQuoteContainerStyle}>
                <Text style={blockQuoteTextStyle}>
                  Please remain until cyclic existence ends,
                </Text>
              </View>
              <Text style={bodyTextStyle}>
                Offer a double dorje, symbolizing long life, to the field of merit, and request them
                to live long and always be part of your life.
              </Text>

              <View style={blockQuoteContainerStyle}>
                <Text style={blockQuoteTextStyle}>
                  And turn the wheel of Dharma for sentient beings.
                </Text>
              </View>
              <Text style={bodyTextStyle}>
                Offer a thousand-spoked Dharma wheel to the field of merit, requesting them to teach
                the Dharma and to guide you in your practice.
              </Text>

              <View style={blockQuoteContainerStyle}>
                <Text style={blockQuoteTextStyle}>
                  I dedicate all the virtues of myself and others to the great awakening.
                </Text>
              </View>
              <Text style={bodyTextStyle}>
                Rejoicing at your own and others’ merit, dedicate it to the awakening of yourself and all
                sentient beings.
              </Text>

              <Text style={headerTextStyle}>
                Mandala Offering
              </Text>

              <Text style={bodyTextStyle}>
                With the wish to offer everything in the universe in order to receive Dharma teachings and to
                realize them in your mindstream, imagine the entire universe and everything beautiful in it,
                and respectfully offer it to the field of merit.
              </Text>

              <View style={blockQuoteContainerStyle}>
                <Text style={blockQuoteTextStyle}>
                  This ground, anointed with perfume, flowers strewn,
                </Text>
                <Text style={blockQuoteTextStyle}>
                  Mount Meru, four lands, sun and moon,
                </Text>
                <Text style={blockQuoteTextStyle}>
                  Imagined as a Buddha land and offered to you.
                </Text>
                <Text style={blockQuoteTextStyle}>
                  May all beings enjoy this pure land.
                </Text>

                <Text style={blockQuoteTextStyle}>
                </Text>

                <Text style={blockQuoteTextStyle}>
                  The objects of attachment, aversion, and ignorance—friends, enemies, and strangers, my body,
                  wealth, and enjoyments—I offer these without any sense of loss. Please accept them with pleasure,
                  and inspire me and others to be free from the three poisonous attitudes.
                </Text>

                <Text style={blockQuoteTextStyle}>
                </Text>

                <Text style={blockQuoteTextStyle}>
                  Idam guru ratna mandala kam nirya tayami
                </Text>

              </View>

              <Text style={bodyTextStyle}>
                All the beings in the field of merit receive your offerings with delight. The offerings dissolve into
                light and absorb into the Buddha’s heart. From his heart, light radiates to you, filling your body
                and mind, and inspiring you to accomplish the path.
              </Text>

              <Text style={headerTextStyle}>
                Requesting Inspiration
              </Text>

              <Text style={bodyTextStyle}>
                To progress on the path and develop the realizations of the path to awakening, you need the inspiration
                of the lineage of spiritual mentors, especially your principal teacher or root guru, the one who touched
                your heart so deeply with the Dharma. Thus request:
              </Text>
              <View style={blockQuoteContainerStyle}>
                <Text style={blockQuoteTextStyle}>
                  Glorious and precious root guru, sit upon the lotus and moon seat on my crown. Guiding me with your
                  great kindness, bestow upon me the attainments of your body, speech, and mind.
                </Text>
              </View>

              <Text style={bodyTextStyle}>
                A replica of your teacher, in the aspect of the Buddha, emerges from the Buddha in front of you and comes
                to sit on a lotus and moon cushion on your head, facing the same direction as you. The Buddha on your crown
                acts as an advocate for you in requesting inspiration from the entire field of merit as you make request to
                the lineage teachers:
              </Text>

              <View style={blockQuoteContainerStyle}>
                <Text style={blockQuoteTextStyle}>
                  Buddha, unequalled teacher and guide; Venerable protector Maitreya, his successor; Superior Asanga,
                  prophesied by Buddha; to you three Buddhas and bodhisattvas I make request.
                </Text>
                <Text style={blockQuoteTextStyle}>
                  Buddha, head of the Shakya clan, the foremost guide, peerless in expounding emptiness; Manjushri,
                  embodiment of the Buddha’s complete wisdom; exalted Nagarjuna, best of the Superiors who sees the
                  profound meaning; to you three crowning jewels of clear exposition I make request.
                </Text>
                <Text style={blockQuoteTextStyle}>
                  Atisha, upholder of this great vehicle, who sees the profundity of dependent arising; Drom Rinpoche,
                  elucidator of this good path; to these two ornaments of the world I make request.
                </Text>
                <Text style={blockQuoteTextStyle}>
                  Avalokiteshvara, great treasure of objectless compassion; Manjushri, master of flawless wisdom;
                  Tsongkhapa, crown jewel of the Snowy Land’s sages, Lobsang Drakpa, I make request at your feet.
                </Text>
                <Text style={blockQuoteTextStyle}>
                  Holder of the white lotus, embodiment of all the conquerors’ compassion, guide benefiting migrating
                  beings in the land of snow mountains and beyond, sole deity and refuge, Tenzin Gyatso, at your feet,
                  I make request.
                </Text>
                <Text style={blockQuoteTextStyle}>
                  The eyes through whom the vast scriptures are seen, supreme doors for the fortunate who would cross
                  over to spiritual freedom, illuminators whose wise means vibrate with compassion, to the entire line
                  of spiritual mentors I make request.
                </Text>
              </View>

              <Text style={bodyTextStyle}>
                <Text>Optional: Review the stages of the path by reciting: </Text>
                <Text><Anchor href={Links.foundationOfAllGoodQualities}>The Foundation of All Good Qualities</Anchor>, </Text>
                <Text><Anchor href={Links.principalAspectsOfThePath}>The Three Principal Aspects of the Path</Anchor>, or </Text>
                <Text><Anchor href={Links.thirtySevenPractices}>The 37 Practices of Bodhisattvas</Anchor>.</Text>
              </Text>

              <Text style={bodyTextStyle}>
                All the figures in the field of merit melt into light and dissolve into the central figure of the
                Buddha in front of you. As the embodiment of the Three Jewels, the Buddha now absorbs into the
                Buddha on your crown. As you recite the Buddha’s mantra, much white light flows from the Buddha into you,
                purifying all negativities and obscurations and generating within you all the realizations of the
                stages of the path.
              </Text>

              <AnimatedSoundPlayerButton
                title={"The Buddha's Mantra"}
                sound={sounds.buddhaMantra}
                description={"Hear Venerable Chodron chant the Buddha's mantra."}
              />

              <View style={blockQuoteContainerStyle}>
                <Text style={blockQuoteTextStyle}>
                  Tayata om muni muni maha muniye soha  (at least 21x)
                </Text>
              </View>

              <AnimatedSoundPlayerButton
                title={"The Meaning of the Mantra"}
                sound={sounds.meaningOfTheMantra}
                description={"Hear Venerable Chodron explain the meaning of the Buddha's mantra."}
              />

              <Text style={headerTextStyle}>
                Meditation on the stages of the path
              </Text>
              <Text style={bodyTextStyle}>
                Now do one of the <Anchor href={Links.analyticalMeditationsOnTheStates}>analytical meditations of
                the stages of the path</Anchor>.
              </Text>

              <Text style={headerTextStyle}>
                Absorption
              </Text>
              <Text style={bodyTextStyle}>
                At the conclusion of your meditation, the Buddha on your head melts into light and dissolves into you.
                Your body, speech, and mind become inseparable from those of the Buddha. (Meditate)
              </Text>

              <Text style={headerTextStyle}>
                Dedication
              </Text>
              <View style={blockQuoteContainerStyle}>
                <Text style={blockQuoteTextStyle}>
                  Due to this merit may we soon
                </Text>
                <Text style={blockQuoteTextStyle}>
                  Attain the awakened state of Guru Buddha,
                </Text>
                <Text style={blockQuoteTextStyle}>
                  That we may be able to liberate
                </Text>
                <Text style={blockQuoteTextStyle}>
                  All sentient beings from their sufferings.
                </Text>

                <Text style={blockQuoteTextStyle}>
                </Text>

                <Text style={blockQuoteTextStyle}>
                  May the precious bodhi mind
                </Text>
                <Text style={blockQuoteTextStyle}>
                  Not yet born arise and grow.
                </Text>
                <Text style={blockQuoteTextStyle}>
                  May that born have no decline,
                </Text>
                <Text style={blockQuoteTextStyle}>
                  But increase forever more.
                </Text>

                <View style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: Colors.tintColor,
                  padding: 10,
                  margin:10,
                  marginTop:50
                }}>
                  <Text style={buddhaHallHeaderText}>
                    Buddha Hall Project
                  </Text>

                  <Text style={bodyTextStyle}>
                    Sravasti Abbey is building a new Buddha Hall! To create merit and counter obstacles to building,
                    we invite you to recite the Shakyamuni Buddha mantra—<Text style={{fontFamily: 'open-sans-italic'}}>om mune mune maha muneya soha</Text>
                    —as many times as you can.</Text>
                  <Text style={bodyTextStyle}>We'll continue the mantra recitations until the hall is finished.</Text>

                  <Button
                      title={"Report your mantra recitations!"}
                      onPress={() => {
                        Linking.openURL(Links.reportBuddhaMantraRecitations);
                      }}
                      buttonStyle={{
                        backgroundColor: LightenDarkenColor(Colors.tintColor, 30),
                        opacity:0.7
                      }}
                      containerStyle={{
                        margin:10
                      }}
                  />
                </View>

              </View>
            </View>
          </ScrollView>
        </View>
    );
  }
}

import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {styles} from '../theme';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from '../api/moviedb';
import {assets} from '../assets';

var {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : ' my-3';

const PersonScreen = () => {
  const {params: item} = useRoute();
  const [isFavourite, toggleFavourite] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<any>>();
  const [person, setPerson] = useState({});
  const [personMovies, setPersonMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item?.id);
    getPersonMovies(item?.id);
  }, [item]);

  const getPersonDetails = async id => {
    const data = await fetchPersonDetails(id);
    // console.log('got person details in person screen=====>');
    setLoading(false);
    if (data) setPerson(data);
  };
  const getPersonMovies = async id => {
    const data = await fetchPersonMovies(id);
    // console.log('got person movies in person screen=====>');
    if (data?.cast) setPersonMovies(data?.cast);
  };

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{paddingBottom: 20}}>
      {/* back button */}
      <SafeAreaView
        className={
          'flex-row justify-between items-center mx-4 z-10 ' + verticalMargin
        }>
        <TouchableOpacity
          style={styles.background}
          className="rounded-xl p-1"
          onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon size="35" color={isFavourite ? 'red' : 'white'} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className="flex-row justify-center"
            style={{
              shadowColor: 'gray',
              shadowRadius: 40,
              shadowOffset: {width: 0, height: 5},
              shadowOpacity: 1,
              elevation: 50,
              borderRadius: 200,
            }}>
            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-neutral-500 border-2">
              <Image
                // source={require('../assets/images/castImage2.png')}
                source={{
                  uri: image342(person?.profile_path) || fallbackPersonImage,
                }}
                style={{height: height * 0.43, width: width * 0.74}}
              />
            </View>
          </View>

          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              {/* Keanu Reeves */}
              {person?.name}
            </Text>
            <Text className="text-neutral-500 text-base text-center">
              {/* Beirut, Lebanon */}
              {person?.place_of_birth}
            </Text>
          </View>
          {/* statistics of a person */}
          <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full ">
            <View className="border-r-2 border-r-neutral-400 px-3 items-center">
              <Text className="text-white font-semibold ">
                {assets.strings['GENDER_TEXT']}
              </Text>
              <Text className="text-neutral-300 text-sm">
                {/* Male */}
                {person?.gender == 1
                  ? assets.strings['GENDER_FEMALE']
                  : assets.strings['GENDER_MALE']}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-3 items-center">
              <Text className="text-white font-semibold">
                {assets.strings['BIRTHDAY_TEXT']}
              </Text>
              <Text className="text-neutral-300 text-sm">
                {/* 1964-09-02 */}
                {person?.birthday}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-3 items-center">
              <Text className="text-white font-semibold">
                {assets.strings['KNOWN_FOR_TEXT']}
              </Text>
              <Text className="text-neutral-300 text-sm">
                {/* Acting */}
                {person?.known_for_department}
              </Text>
            </View>
            <View className="px-2 items-center">
              <Text className="text-white font-semibold">
                {assets.strings['POPULARITY_TEXT']}
              </Text>
              <Text className="text-neutral-300 text-sm">
                {/* 84.23 % */}
                {person?.popularity?.toFixed(2)}{' '}
                {assets.strings['PERCENT_SIGN']}
              </Text>
            </View>
          </View>
          {/* biography */}
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              {person?.biography ? person.biography : assets.strings['NA_TEXT']}
            </Text>
          </View>
          {/* person movies list */}
          {person?.id && personMovies.length > 0 && (
            <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default PersonScreen;

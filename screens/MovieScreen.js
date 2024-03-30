import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import {styles, theme} from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import Loading from '../components/Loading';
import MovieList from '../components/MovieList';
import Cast from '../components/Cast';

var {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : ' mt-3';

const MovieScreen = () => {
  const [isFavourite, toggleFavourite] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);
  const {params: item} = useRoute();
  const navigation = useNavigation();

  let movieName = 'Ant-Man and the Wasp: Quantumania';

  useEffect(() => {
    //   // call the movie detail api
  }, [item]);
  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 20}}
      className="flex-1 bg-neutral-900">
      {/* back button and movie poster */}
      <View className="w-full">
        <SafeAreaView
          className={
            'absolute z-20 w-full flex-row justify-between items-center px-4' +
            topMargin
          }>
          <TouchableOpacity
            style={styles.background}
            onPress={() => navigation.goBack()}
            className="rounded-xl p-1">
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon
              size="35"
              color={isFavourite ? theme.background : 'white'}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={require('../assets/images/moviePoster2.png')}
              style={{width, height: height * 0.55}}
            />
            <LinearGradient
              colors={['transparent', 'rgba(23,23,23,0.5)', 'rgba(23,23,23,1)']}
              style={{width, height: height * 0.4}}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>

      {/* movie details */}
      <View style={{marginTop: -(height * 0.09)}} className="space-y-3">
        {/* title */}
        <Text className="text-white text-center text-3xl text-bold tracking-wider">
          {movieName}
        </Text>
        {/* status, release date, runtime */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          Released • 2020 • 170 min
        </Text>

        {/* genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Action •
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Thrill •
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy
          </Text>
        </View>

        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt
          nostrum amet ab id nemo quibusdam voluptatum incidunt? Dolor officia
          libero recusandae! Perspiciatis illo nesciunt architecto cupiditate
          rerum ducimus illum explicabo?
        </Text>
      </View>

      {/* cast */}
      <Cast navigation={navigation} cast={cast} />

      {/* similar movies */}
      <MovieList
        title="Similar Movies"
        hideSeeAll={true}
        data={similarMovies}
      />
    </ScrollView>
  );
};

export default MovieScreen;

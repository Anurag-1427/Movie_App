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
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import {styles, theme} from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import Loading from '../components/Loading';
import MovieList from '../components/MovieList';
import Cast from '../components/Cast';
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from '../api/moviedb';

var {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : ' mt-3';

const MovieScreen = () => {
  const [isFavourite, toggleFavourite] = useState<boolean>(false);
  const [cast, setCast] = useState<any[]>([]);
  const [similarMovies, setSimilarMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [movie, setMovie] = useState({});
  const {params: item} = useRoute();
  const navigation = useNavigation<NavigationProp<any>>();

  //   let movieName = 'Ant-Man and the Wasp: Quantumania';

  useEffect(() => {
    console.log(`item id====>`, item?.id);
    console.log(`item id type====>`, typeof item?.id);
    getMovieDetails(item?.id);
    getMovieCredits(item?.id);
    getSimilarMovies(item?.id);
    setLoading(false);
  }, [item]);

  const getMovieDetails = async (id: number) => {
    const data = await fetchMovieDetails(id);
    // console.log(`get movie details in movieScreen===>`, data);
    if (data) setMovie(data);
  };
  const getMovieCredits = async (id: number) => {
    const data = await fetchMovieCredits(id);
    // console.log(`get movie credits in movieScreen===>`, data);
    if (data?.cast) setCast(data?.cast);
  };
  const getSimilarMovies = async (id: number) => {
    const data = await fetchSimilarMovies(id);
    // console.log(`get similar movies in movieScreen===>`, data);
    if (data?.results) setSimilarMovies(data?.results);
  };

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
              //   source={require('../assets/images/moviePoster2.png')}
              source={{uri: image500(item?.poster_path) || fallbackMoviePoster}}
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
        <Text className="text-white text-center text-3xl text-bold tracking-wider">
          {/* {movieName} */}
          {item?.title}
        </Text>
        {/* status, release date, runtime */}
        {movie?.id ? (
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {/* Released • 2020 • 170 min */}
            {movie?.status} • {movie?.release_date?.split('-')[0]} •
            {movie?.runtime} min
          </Text>
        ) : null}

        {/* genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 != movie?.genres?.length;
            return (
              <Text
                key={index}
                className="text-neutral-400 font-semibold text-base text-center">
                {genre?.name} {showDot ? ' •' : null}
              </Text>
            );
          })}
        </View>

        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {movie?.overview}
        </Text>
      </View>
      {/* cast */}
      {cast?.length > 0 && <Cast navigation={navigation} cast={cast} />}
      {/* similar movies */}
      {similarMovies?.length > 0 && (
        <MovieList
          title="Similar Movies"
          hideSeeAll={true}
          data={similarMovies}
        />
      )}
    </ScrollView>
  );
};

export default MovieScreen;

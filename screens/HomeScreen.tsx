import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import {styles} from '../theme';
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/Loading';
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '../api/moviedb';
import {assets} from '../assets';

const ios = Platform.OS == 'ios';

const HomeScreen = () => {
  const [trending, setTrending] = useState<any[]>([]);
  const [upcoming, setUpcoming] = useState<any[]>([]);
  const [topRated, setTopRated] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    // console.log(`Trending movies in homescreen=====>`, data);
    if (data?.results) setTrending(data?.results);
    setLoading(false);
  };
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    // console.log(`Upcoming movies in homescreen=====>`, data);
    if (data?.results) setUpcoming(data?.results);
    setLoading(false);
  };
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    // console.log(`Top Rated movies in homescreen=====>`, data);
    if (data?.results) setTopRated(data?.results);
    setLoading(false);
  };

  return (
    <View className="flex-1 bg-neutral-800">
      {/* search bar and logo */}
      <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
        <StatusBar barStyle="light-content" />
        <View className="flex-row justify-between items-center mx-4">
          {/* <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" /> */}
          <Text className="text-3xl">🎬</Text>
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>
              {` ${assets.strings['HEADER_TITLE_M_ONE']}`}
            </Text>
            {assets.strings['HEADER_TITLE_REST']}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 10}}>
          {/* Trending movies carousel */}
          {trending.length > 0 && <TrendingMovies data={trending} />}

          {/* upcoming movies row */}
          <MovieList
            hideSeeAll={false}
            title={assets.strings['UPCOMING_TITLE']}
            data={upcoming}
          />

          {/* top rated movies row */}
          <MovieList
            hideSeeAll={false}
            title={assets.strings['TOP_RATED_TITLE']}
            data={topRated}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;

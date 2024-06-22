import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';
import {image500} from '../api/moviedb';
import {assets} from '../assets';

var {width, height} = Dimensions.get('window');

const TrendingMovies = ({data}) => {
  const navigation = useNavigation();
  const handleClick = item => {
    navigation.navigate('Movie', item);
  };
  return (
    <View className="mb-8">
      <Text
        style={{fontFamily: assets.fonts['POPPINS_REGULAR']}}
        className="text-white text-xl mx-4 mb-5">
        {assets.strings['TRENDING']}
      </Text>
      <Carousel
        data={data}
        renderItem={({item}) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{display: 'flex', alignItems: 'center'}}
      />
    </View>
  );
};

export default TrendingMovies;

const MovieCard = ({item, handleClick}) => {
  //   console.log(`item.posterPath====>`, item?.poster_path);
  const handlePress = () => {
    handleClick(item);
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Image
        // source={require('../assets/images/moviePoster1.png')}
        source={{uri: image500(item?.poster_path)}}
        style={{width: width * 0.6, height: height * 0.4}}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};

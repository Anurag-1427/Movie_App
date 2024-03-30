import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';

var {width, height} = Dimensions.get('window');

const TrendingMovies = ({data}) => {
  const handleClick = item => {
    console.log('trending movies handle click');
  };
  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
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
  return (
    <TouchableWithoutFeedback onPress={handleClick(item)}>
      <Image
        source={require('../assets/images/moviePoster1.png')}
        style={{width: width * 0.6, height: height * 0.4}}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};

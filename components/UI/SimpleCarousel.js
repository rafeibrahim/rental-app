import React, { useState, useRef } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

// const images = [
//   {
//     title: 'Yellow shoe',
//     promo: '50% off',
//     url: 'https://images.unsplash.com/photo-1602593330926-30c90a271fa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2NDM2NjI1MA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
//   },
//   {
//     title: 'Yellow shoe',
//     promo: '50% off',
//     url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
//   },
//   {
//     title: 'Yellow shoe',
//     promo: '50% off',
//     url: 'https://images.unsplash.com/photo-1523730647456-cc896ae6243a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2NDM2NjQyNg&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
//   },
// ];

const { width, height } = Dimensions.get('window');
const viewConfigRef = { viewAreaCoveragePercentThreshold: 95 };

const SimpleCarousel = ({ images }) => {
  let flatListRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(1);

  //Only needed if want to
  const onViewRef = useRef(({ changed }) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ animated: true, index: index });
  };

  const renderItems = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => console.log('clicked')}
        activeOpacity={1}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        {/* <View style={styles.footer}>
          <Text style={styles.footerText}>{item.title}</Text>
          <Text style={styles.footerText}>{item.promo}</Text>
        </View> */}
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        data={images}
        renderItem={renderItems}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsVerticalScrollIndicator={false}
        pagingEnabled
        ref={(ref) => {
          flatListRef.current = ref;
        }}
        style={styles.carousel}
        viewabilityConfig={viewConfigRef}
        onViewableItemsChanged={onViewRef.current}
      />

      <View style={styles.dotView}>
        {images.map((image, index) => {
          console.log(image, index);
          return (
            <TouchableOpacity
              key={index.toString()}
              style={[
                styles.circle,
                {
                  backgroundColor: index == currentIndex ? 'black' : 'grey',
                },
              ]}
              onPress={() => scrollToIndex(index)}
            />
          );
        })}
      </View>
    </View>
  );
};

export default SimpleCarousel;

const styles = StyleSheet.create({
  carousel: {
    maxHeight: 300,
  },
  image: {
    width,
    height: 250,
    resizeMode: 'cover',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 40,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  footerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dotView: {
    flexDirection: 'row',
    margintop: 40,
    justifyContent: 'center',
    marginVertical: 20,
  },
  circle: {
    width: 10,
    height: 10,
    backgroundColor: 'grey',
    borderRadius: 50,
    marginHorizontal: 5,
  },
});

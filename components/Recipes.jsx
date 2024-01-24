import { View, Text } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card, Loader } from '../components'
import MasonryList from '@react-native-seoul/masonry-list';

export default function Recipes({ recipeData, categoriesData, navigation }) {


    return (
        <View className=" space-y-3">
            <Text className="text-neutral-700 font-semibold" style={{ fontSize: hp(3) }}>Recipes</Text>
            <View>

                {categoriesData && categoriesData.length === 0 || recipeData.length === 0 ? (
                    <Loader />
                ) :
                    <MasonryList
                        data={recipeData}
                        keyExtractor={(item) => item.idMeaL}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, id }) => <Card item={item} id={id} navigation={navigation} />}
                    />
                }

            </View>
        </View>
    )
}


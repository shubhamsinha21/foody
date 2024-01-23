import { View, Text } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Card from './Card';
import MasonryList from '@react-native-seoul/masonry-list';

export default function Recipes({ recipeData, categoriesData }) {

    return (
        <View className=" space-y-3">
            <Text className="text-neutral-700 font-semibold" style={{ fontSize: hp(3) }}>Recipes</Text>
            <View>

                {categoriesData && categoriesData.length === 0 || recipeData.length === 0 ? null :
                    <MasonryList
                        data={recipeData}
                        keyExtractor={(item) => item.idMeal}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, id }) => <Card item={item} id={id} />}
                        // refreshing={isLoadingNext}
                        // onRefresh={() => refetch({ first: ITEM_CNT })}
                        onEndReachedThreshold={0.1}
                    // onEndReached={() => loadNext(ITEM_CNT)}
                    />
                }

            </View>
        </View>
    )
}
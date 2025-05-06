import { useRouter } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { ThemedView } from '@/components/ThemedView'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { P } from '@/components/ui/typography'
import { guidelines } from '@/constants/guidelines';


const UploadScreen = () => {

    const router = useRouter()
    const { t } = useTranslation();

    return (
        <ThemedView>
            <ScrollView 
                collapsableChildren 
                contentContainerStyle={{ padding: 20 }}
            >
                {
                    guidelines.map((guideline, index) => (
                        <View key={index}>
                            <P>{index + 1}. {guideline.title}</P>
                        </View>
                    ))
                }
                <Button onPress={() => router.push('/upload/upload-option')}>
                    <Text>Upload Option</Text>
                </Button>
            </ScrollView>
        </ThemedView>
    )
}

export default UploadScreen
import { BlurView } from 'expo-blur';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import { File, Video } from 'lucide-react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Pressable } from 'react-native';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

const UploadOptionScreen = () => {
    const router = useRouter()
    const { t } = useTranslation()

    const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handlePickFile = async () => {
        setIsLoading(true)
        const result = await DocumentPicker.getDocumentAsync({
            type: ['application/video']
        })
        if (result.assets && result.assets.length > 0) {
            setSelectedFile(result.assets[0])
        }
        console.log(result)
        setIsLoading(false)
    }

    return (
        <View className='flex-1'>
            <Pressable onPress={() => router.back()} className='flex-1'/>
            <BlurView experimentalBlurMethod='dimezisBlurView' className='absolute border-t border-gray-200 h-fit flex gap-y-4 bottom-0 w-full px-6 py-12' intensity={100} tint='extraLight' >
                <Button
                    iconColor='white'
                    onPress={handlePickFile}
                    variant="default"
                    disabled={isLoading}
                    loading={isLoading}
                    icon={File}
                >
                    <Text>
                        {t('Choose File')}
                    </Text>
                </Button>
                <Button
                    onPress={() => router.push('/upload/record')}
                    iconColor='black'
                    variant="outline"
                    icon={Video}
                >
                    <Text>Record Video</Text>
                </Button>
            </BlurView>
        </View>
    )
}

export default UploadOptionScreen;
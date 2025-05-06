import { Stack } from 'expo-router';

export default function UploadLayout() {
  return (

    <Stack>
        <Stack.Screen
            name="index"
          options={{
            animation: 'slide_from_right',
            title: 'Guidelines',
            headerTitleStyle: {
              fontFamily: 'Poppins',
            },
          }}
        />
        <Stack.Screen
            name="upload-option"
            options={{
                headerShown: false,
                presentation: 'transparentModal',
                animation: 'slide_from_bottom',
                title: 'Upload Option',
            }}
        />
        <Stack.Screen
            name="record"
            options={{
                headerShown: false,
            }}
        />
    </Stack>
  );
}

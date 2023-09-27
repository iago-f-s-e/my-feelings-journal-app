export default {
  expo: {
    name: 'Minha Jornada',
    slug: 'my-feelings-journal',
    privacy: 'public',
    version: '0.0.1',
    orientation: 'portrait',
    icon: './assets/icon.png',
    platforms: ['ios', 'android', 'web'],
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'cover',
    },
    assetBundlePatterns: ['**/*'],
    android: {
      package: 'com.sabbathdev.myfeelingjournal',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    runtimeVersion: {
      policy: 'sdkVersion',
    },
  },
};

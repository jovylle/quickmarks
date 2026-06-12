import type { CapacitorConfig } from '@capacitor/cli'

export const PRIVACY_POLICY_URL = 'https://quickmarks.uft1.com/privacy'

const config: CapacitorConfig = {
  appId: 'us.uft1.quickmarks',
  appName: 'Quickmarks',
  webDir: 'www',
  android: {
    allowMixedContent: false,
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      androidSplashResourceName: 'splash',
      showSpinner: false,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0f1419',
      overlaysWebView: false,
    },
  },
}

export default config

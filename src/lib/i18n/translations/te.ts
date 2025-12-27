import { Translations } from '../types';
import { en } from './en';

// Telugu translations - fallback to English for complex content
export const te: Translations = {
  ...en,
  common: {
    close: 'మూసివేయి',
    submit: 'సమర్పించు',
    cancel: 'రద్దు చేయి',
    save: 'సేవ్ చేయి',
    loading: 'లోడ్ అవుతోంది...',
    search: 'శోధించు',
    notifications: 'నోటిఫికేషన్లు',
    settings: 'సెట్టింగ్‌లు',
    logout: 'లాగ్ అవుట్',
    profile: 'ప్రొఫైల్',
    disclaimer: 'ఏదైనా వ్యత్యాసం ఉన్నట్లయితే, ఆంగ్ల వెర్షన్ మాత్రమే చెల్లుతుంది.',
  },
  landing: {
    tagline: 'భారతదేశంలో నమ్మకమైన పబ్లిక్ సెక్టార్ బ్యాంక్',
    title: {
      accept: 'అంగీకరించు',
      upiPayments: 'UPI చెల్లింపులు',
      with: 'తో',
      instant: 'తక్షణ',
      settlements: 'సెటిల్‌మెంట్లు',
    },
    subtitle: 'భారతదేశంలో అత్యంత నమ్మకమైన UPI చెల్లింపు మౌలిక సదుపాయంతో మీ వ్యాపారాన్ని శక్తివంతం చేయండి.',
    scrollToExplore: 'అన్వేషించడానికి స్క్రోల్ చేయండి',
    trustedBank: 'భారతదేశంలో నమ్మకమైన పబ్లిక్ సెక్టార్ బ్యాంక్',
    pciCompliant: 'PCI-DSS కంప్లయింట్',
    privacyPolicy: 'గోప్యతా విధానం',
    termsOfService: 'సేవా నిబంధనలు',
    contactSupport: 'సపోర్ట్‌ను సంప్రదించండి',
    copyright: '© 2024 కెనరా బ్యాంక్. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.',
    upiMerchantSolutions: 'UPI మర్చంట్ సొల్యూషన్స్',
  },
  login: {
    title: 'మర్చంట్ లాగిన్',
    subtitle: 'మీ పేమెంట్ డాష్‌బోర్డ్‌ను యాక్సెస్ చేయండి',
    merchantId: 'మర్చంట్ ఐడి',
    merchantIdPlaceholder: 'మీ మర్చంట్ ఐడిని నమోదు చేయండి',
    password: 'పాస్‌వర్డ్',
    passwordPlaceholder: 'మీ పాస్‌వర్డ్‌ను నమోదు చేయండి',
    loginButton: 'డాష్‌బోర్డ్‌లోకి లాగిన్ అవ్వండి',
    forgotPassword: 'పాస్‌వర్డ్ మర్చిపోయారా?',
    needHelp: 'సహాయం కావాలా?',
  },
};

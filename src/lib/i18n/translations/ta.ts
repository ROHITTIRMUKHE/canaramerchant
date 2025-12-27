import { Translations } from '../types';
import { en } from './en';

// Tamil translations - fallback to English for complex content
export const ta: Translations = {
  ...en,
  common: {
    close: 'மூடு',
    submit: 'சமர்ப்பி',
    cancel: 'ரத்து செய்',
    save: 'சேமி',
    loading: 'ஏற்றுகிறது...',
    search: 'தேடு',
    notifications: 'அறிவிப்புகள்',
    settings: 'அமைப்புகள்',
    logout: 'வெளியேறு',
    profile: 'சுயவிவரம்',
    disclaimer: 'ஏதேனும் முரண்பாடு ஏற்பட்டால், ஆங்கில பதிப்பே செல்லுபடியாகும்.',
  },
  landing: {
    tagline: 'இந்தியாவின் நம்பகமான பொதுத்துறை வங்கி',
    title: {
      accept: 'ஏற்றுக்கொள்',
      upiPayments: 'UPI கட்டணங்கள்',
      with: 'உடன்',
      instant: 'உடனடி',
      settlements: 'தீர்வுகள்',
    },
    subtitle: 'இந்தியாவின் மிக நம்பகமான UPI கட்டண உள்கட்டமைப்புடன் உங்கள் வணிகத்தை வலுப்படுத்துங்கள்.',
    scrollToExplore: 'ஆராய உருட்டவும்',
    trustedBank: 'இந்தியாவின் நம்பகமான பொதுத்துறை வங்கி',
    pciCompliant: 'PCI-DSS இணக்கமானது',
    privacyPolicy: 'தனியுரிமைக் கொள்கை',
    termsOfService: 'சேவை விதிமுறைகள்',
    contactSupport: 'ஆதரவைத் தொடர்பு கொள்ளவும்',
    copyright: '© 2024 கனரா வங்கி. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    upiMerchantSolutions: 'UPI வணிகர் தீர்வுகள்',
  },
  login: {
    title: 'வணிகர் உள்நுழைவு',
    subtitle: 'உங்கள் கட்டண டாஷ்போர்டை அணுகவும்',
    merchantId: 'வணிகர் ஐடி',
    merchantIdPlaceholder: 'உங்கள் வணிகர் ஐடியை உள்ளிடவும்',
    password: 'கடவுச்சொல்',
    passwordPlaceholder: 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்',
    loginButton: 'டாஷ்போர்டில் உள்நுழையவும்',
    forgotPassword: 'கடவுச்சொல் மறந்துவிட்டதா?',
    needHelp: 'உதவி தேவையா?',
  },
};

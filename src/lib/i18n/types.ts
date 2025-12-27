export type Language = 'en' | 'hi' | 'kn' | 'ta' | 'te';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिंदी' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు' },
];

export interface Translations {
  common: {
    close: string;
    submit: string;
    cancel: string;
    save: string;
    loading: string;
    search: string;
    notifications: string;
    settings: string;
    logout: string;
    profile: string;
    disclaimer: string;
  };
  landing: {
    tagline: string;
    title: {
      accept: string;
      upiPayments: string;
      with: string;
      instant: string;
      settlements: string;
    };
    subtitle: string;
    scrollToExplore: string;
    trustedBank: string;
    pciCompliant: string;
    privacyPolicy: string;
    termsOfService: string;
    contactSupport: string;
    copyright: string;
    upiMerchantSolutions: string;
  };
  login: {
    title: string;
    subtitle: string;
    merchantId: string;
    merchantIdPlaceholder: string;
    mobileNumber: string;
    mobileNumberPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    loginButton: string;
    forgotPassword: string;
    needHelp: string;
    otp: string;
    sendOtp: string;
    resendOtp: string;
    resendIn: string;
    enterOtp: string;
    authenticating: string;
    invalidMobile: string;
    invalidMobileDesc: string;
    invalidPassword: string;
    invalidPasswordDesc: string;
    invalidOtp: string;
    invalidOtpDesc: string;
    otpSentSuccess: string;
    otpSentDesc: string;
    loginSuccess: string;
    loginSuccessDesc: string;
    securityInfo: string;
    copyright: string;
  };
  pcidss: {
    title: string;
    subtitle: string;
    sections: {
      overview: { title: string; content: string };
      compliance: { title: string; items: string[] };
      cardVisibility: { title: string; content: string };
      securityMeasures: { title: string; content: string };
      merchantResponsibilities: { title: string; content: string };
      scopeLimitation: { title: string; content: string };
      complianceNotice: { title: string; content: string };
    };
  };
  privacy: {
    title: string;
    subtitle: string;
    sections: {
      introduction: { title: string; content: string[] };
      scope: { title: string; content: string; items: string[] };
      dataCollection: { 
        title: string;
        businessInfo: { title: string; items: string[] };
        userInfo: { title: string; items: string[] };
        transactionInfo: { title: string; items: string[] };
        technicalInfo: { title: string; items: string[] };
        note: string;
      };
      purpose: { title: string; content: string; items: string[] };
      sharing: { title: string; content: string; items: string[] };
      security: { title: string; content: string; items: string[] };
      retention: { title: string; content: string; items: string[] };
      responsibilities: { title: string; content: string; items: string[] };
      cookies: { title: string; content: string; items: string[] };
      liability: { title: string; content: string; items: string[] };
      changes: { title: string; content: string };
      governingLaw: { title: string; content: string };
      contact: { title: string; content: string };
    };
  };
  terms: {
    title: string;
    subtitle: string;
    sections: {
      introduction: { title: string; content: string[] };
      scope: { title: string; content: string; items: string[] };
      eligibility: { title: string; items: string[] };
      userResponsibilities: { title: string; content: string; items: string[] };
      prohibitedActivities: { title: string; content: string; items: string[] };
      security: { title: string; items: string[] };
      availability: { title: string; content: string; items: string[] };
      dataAccuracy: { title: string; items: string[] };
      liability: { title: string; content: string; items: string[] };
      termination: { title: string; content: string; items: string[] };
      intellectualProperty: { title: string; content: string };
      modifications: { title: string; content: string };
      governingLaw: { title: string; content: string };
      grievance: { title: string; content: string };
    };
  };
  support: {
    title: string;
    subtitle: string;
    channels: {
      title: string;
      description: string;
      email: { title: string; value: string; note: string };
      phone: { title: string; value: string; note: string };
      whatsapp: { title: string; value: string; note: string };
    };
    workingHours: {
      title: string;
      weekdays: string;
      weekdaysTime: string;
      saturday: string;
      saturdayTime: string;
      sunday: string;
      closed: string;
      urgentNote: string;
    };
    escalation: {
      title: string;
      description: string;
      level1: { title: string; note: string };
      level2: { title: string; note: string };
      level3: { title: string; note: string };
    };
  };
  dashboard: {
    searchPlaceholder: string;
    quickActions: string;
    pages: string;
    noResults: string;
    trySearching: string;
    navigate: string;
    select: string;
    merchantStore: string;
    viewProfile: string;
    bankDetails: string;
    apiKeys: string;
    welcomeBack: string;
    businessOverview: string;
    todaysCollection: string;
    todaysSettlements: string;
    pendingActions: string;
    activeSubMerchants: string;
    status: string;
    itemsNeedAttention: string;
    // Sidebar navigation
    sidebar: {
      overview: string;
      transactions: string;
      qrManagement: string;
      subMerchants: string;
      settlements: string;
      reports: string;
      refundsDisputes: string;
      profileSettings: string;
      canaraSupport: string;
      logout: string;
      merchantPortal: string;
    };
  };
}

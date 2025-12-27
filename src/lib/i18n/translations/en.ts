import { Translations } from '../types';

export const en: Translations = {
  common: {
    close: 'Close',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    loading: 'Loading...',
    search: 'Search',
    notifications: 'Notifications',
    settings: 'Settings',
    logout: 'Logout',
    profile: 'Profile',
    disclaimer: 'In case of any discrepancy, the English version shall prevail.',
  },
  landing: {
    tagline: "India's Trusted Public Sector Bank",
    title: {
      accept: 'Accept',
      upiPayments: 'UPI Payments',
      with: 'with',
      instant: 'Instant',
      settlements: 'Settlements',
    },
    subtitle: "Power your business with India's most reliable UPI payment infrastructure. Real-time settlements, zero downtime, bank-grade security.",
    scrollToExplore: 'Scroll to explore',
    trustedBank: "India's Trusted Public Sector Bank",
    pciCompliant: 'PCI-DSS Compliant',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    contactSupport: 'Contact Support',
    copyright: '© 2024 Canara Bank. All Rights Reserved.',
    upiMerchantSolutions: 'UPI Merchant Solutions',
  },
  login: {
    title: 'Merchant Login',
    subtitle: 'Access your UPI dashboard',
    merchantId: 'Merchant ID',
    merchantIdPlaceholder: 'Enter your Merchant ID',
    mobileNumber: 'Mobile Number',
    mobileNumberPlaceholder: 'Enter 10-digit number',
    password: 'Password',
    passwordPlaceholder: 'Enter password',
    loginButton: 'Login to Dashboard',
    forgotPassword: 'Forgot Password?',
    needHelp: 'Need Help?',
    otp: 'OTP',
    sendOtp: 'Send OTP',
    resendOtp: 'Resend OTP',
    resendIn: 'Resend in',
    enterOtp: 'Enter OTP',
    authenticating: 'Authenticating...',
    invalidMobile: 'Invalid Mobile Number',
    invalidMobileDesc: 'Please enter a valid 10-digit mobile number',
    invalidPassword: 'Invalid Password',
    invalidPasswordDesc: 'Password must be at least 6 characters',
    invalidOtp: 'Invalid OTP',
    invalidOtpDesc: 'Please enter a valid 6-digit OTP',
    otpSentSuccess: 'OTP Sent Successfully',
    otpSentDesc: 'A 6-digit OTP has been sent to your mobile',
    loginSuccess: 'Login Successful',
    loginSuccessDesc: 'Welcome to Canara Bank UPI Merchant Portal',
    securityInfo: '256-bit SSL Encrypted • NPCI Compliant • PCI DSS Certified',
    copyright: '© 2024 Canara Bank. All Rights Reserved.',
  },
  pcidss: {
    title: 'PCI-DSS Guidelines for Merchants',
    subtitle: 'Canara Bank Security Compliance',
    sections: {
      overview: {
        title: '1. Overview of PCI-DSS',
        content: "PCI-DSS (Payment Card Industry Data Security Standard) is a global security standard established by major card networks to protect cardholder data during payment processing. Canara Bank's Merchant Dashboard operates in alignment with applicable PCI-DSS requirements.",
      },
      compliance: {
        title: '2. What PCI-DSS Compliance Means for You',
        items: [
          'Sensitive cardholder data is not stored or displayed on the merchant dashboard',
          'Card transactions are processed through PCI-DSS certified payment infrastructure',
          'All transaction data is securely encrypted',
          'Access to payment systems is restricted and monitored',
        ],
      },
      cardVisibility: {
        title: '3. Card Data Visibility',
        content: 'Merchants can view only non-sensitive transaction details such as transaction ID, date, amount, status, and masked card number. Full card number, CVV, PIN, and expiry details are never accessible.',
      },
      securityMeasures: {
        title: '4. Security Measures by Canara Bank',
        content: 'Canara Bank implements secure network architecture, encryption, role-based access controls, continuous monitoring, and periodic security audits to maintain compliance.',
      },
      merchantResponsibilities: {
        title: '5. Merchant Responsibilities',
        content: 'Merchants must protect login credentials, restrict access to authorized users, use secure devices, and report any suspected security incidents immediately.',
      },
      scopeLimitation: {
        title: '6. Scope Limitation',
        content: 'PCI-DSS applies only to cardholder data security and does not cover non-payment business information or eliminate all cyber risks.',
      },
      complianceNotice: {
        title: '7. Compliance Notice',
        content: 'Any misuse, credential sharing, or unauthorized access may lead to suspension of access or regulatory action as per Canara Bank policy.',
      },
    },
  },
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'Canara Bank – Merchant Dashboard',
    sections: {
      introduction: {
        title: '1. Introduction',
        content: [
          'Canara Bank ("the Bank", "we", "our", "us") is committed to protecting the privacy, confidentiality, and security of information relating to merchants and authorized users accessing the Canara Bank Merchant Dashboard.',
          'This Privacy Policy describes how information is collected, used, stored, disclosed, and protected when merchants access or use the Merchant Dashboard and related services.',
          'By accessing or using the Merchant Dashboard, you acknowledge and agree to the practices described in this Privacy Policy.',
        ],
      },
      scope: {
        title: '2. Scope of This Policy',
        content: 'This Privacy Policy applies to:',
        items: [
          'Merchants onboarded with Canara Bank',
          'Authorized users accessing the Merchant Dashboard',
          'Data generated through use of the dashboard for transaction monitoring, reporting, and operational purposes',
        ],
      },
      dataCollection: {
        title: '3. Information We Collect',
        businessInfo: {
          title: '3.1 Merchant and Business Information',
          items: [
            'Merchant name and business details',
            'Merchant ID and onboarding information',
            'Registered address and contact details',
          ],
        },
        userInfo: {
          title: '3.2 User and Access Information',
          items: [
            'Usernames and user roles',
            'Login and access credentials (in encrypted form)',
            'Access logs and activity records',
          ],
        },
        transactionInfo: {
          title: '3.3 Transaction Information',
          items: [
            'Transaction reference number',
            'Transaction date and time',
            'Transaction amount and status',
            'Masked card information (as permitted)',
          ],
        },
        technicalInfo: {
          title: '3.4 Technical and Usage Information',
          items: [
            'IP address',
            'Device and browser information',
            'Session and log data for security and audit purposes',
          ],
        },
        note: 'Canara Bank does not collect, store, or display sensitive cardholder data such as full card numbers, CVV, PIN, or expiry dates.',
      },
      purpose: {
        title: '4. Purpose of Data Collection',
        content: 'Information collected through the Merchant Dashboard is used strictly for legitimate banking and operational purposes, including:',
        items: [
          'Providing secure access to merchant services',
          'Displaying transaction and settlement information',
          'Fraud detection and prevention',
          'System security monitoring and incident investigation',
          'Regulatory compliance and audit requirements',
          'Improving system performance and reliability',
        ],
      },
      sharing: {
        title: '5. Data Sharing and Disclosure',
        content: 'Canara Bank does not sell, lease, or trade merchant information. Information may be disclosed only under the following circumstances:',
        items: [
          'To internal departments of Canara Bank on a need-to-know basis',
          'To regulatory authorities, law enforcement agencies, or statutory bodies as required by law',
          'To authorized service providers engaged by the Bank, under strict confidentiality and security obligations',
        ],
      },
      security: {
        title: '6. Data Security Measures',
        content: 'Canara Bank implements robust security controls to protect merchant information, including:',
        items: [
          'Encryption of data in transit',
          'Secure access control and authentication mechanisms',
          'Role-based access management',
          'Continuous monitoring and logging of system activities',
          'Periodic security assessments and audits',
        ],
      },
      retention: {
        title: '7. Data Retention',
        content: 'Merchant information is retained only for the period necessary to:',
        items: [
          'Fulfill banking and operational requirements',
          'Comply with regulatory, legal, and audit obligations',
          'Address dispute resolution or investigations',
        ],
      },
      responsibilities: {
        title: '8. Merchant Responsibilities',
        content: 'Merchants and authorized users are responsible for:',
        items: [
          'Maintaining confidentiality of login credentials',
          'Restricting dashboard access to authorized personnel only',
          'Using secure devices and networks',
          'Promptly notifying the Bank of any suspected data breach or unauthorized access',
        ],
      },
      cookies: {
        title: '9. Cookies and Session Management',
        content: 'The Merchant Dashboard may use cookies or similar technologies strictly for:',
        items: [
          'Session management',
          'Security validation',
          'Enhancing user experience',
        ],
      },
      liability: {
        title: '10. Limitation of Liability',
        content: 'While Canara Bank takes reasonable and appropriate measures to safeguard information, the Bank shall not be liable for losses arising from:',
        items: [
          'Merchant negligence',
          'Unauthorized access caused by compromised credentials',
          'Factors beyond the Bank\'s reasonable control',
        ],
      },
      changes: {
        title: '11. Changes to This Privacy Policy',
        content: 'Canara Bank reserves the right to update or modify this Privacy Policy from time to time to reflect changes in legal, regulatory, or operational requirements. Updated versions will be made available on the Merchant Dashboard.',
      },
      governingLaw: {
        title: '12. Governing Law',
        content: 'This Privacy Policy shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the jurisdiction of competent courts in India.',
      },
      contact: {
        title: '13. Contact and Grievance Redressal',
        content: 'For any queries, concerns, or complaints related to privacy or data protection, merchants may contact Canara Bank through officially designated support or grievance redressal channels.',
      },
    },
  },
  terms: {
    title: 'Terms of Service',
    subtitle: 'Canara Bank – Merchant Dashboard',
    sections: {
      introduction: {
        title: '1. Introduction',
        content: [
          'These Terms of Service ("Terms") govern the access to and use of the Canara Bank Merchant Dashboard ("Dashboard") provided by Canara Bank ("the Bank").',
          'By accessing, registering for, or using the Dashboard, the merchant and its authorized users ("Merchant", "you", "your") agree to comply with these Terms. If you do not agree, you must not access or use the Dashboard.',
        ],
      },
      scope: {
        title: '2. Scope of Services',
        content: 'The Merchant Dashboard is provided to enable merchants to:',
        items: [
          'View and monitor transaction details',
          'Access settlement and reconciliation reports',
          'Track transaction status and summaries',
          'Perform operational and reporting activities permitted by the Bank',
        ],
      },
      eligibility: {
        title: '3. Eligibility and Access',
        items: [
          'Access is granted only to merchants duly onboarded with Canara Bank',
          'Each user shall be provided access based on assigned roles and permissions',
          'The Bank reserves the right to approve, modify, suspend, or revoke access at its discretion',
          'Merchants are responsible for ensuring that access is provided only to authorized personnel',
        ],
      },
      userResponsibilities: {
        title: '4. User Responsibilities',
        content: 'Merchants and authorized users agree to:',
        items: [
          'Use the Dashboard strictly for lawful and authorized purposes',
          'Maintain confidentiality of login credentials',
          'Ensure accuracy of information accessed or submitted',
          'Immediately notify the Bank of any unauthorized access or security incident',
          'Comply with all applicable laws, regulations, and Bank policies',
        ],
      },
      prohibitedActivities: {
        title: '5. Prohibited Activities',
        content: 'Merchants shall not:',
        items: [
          'Share login credentials with unauthorized individuals',
          'Attempt to access data or systems beyond authorized scope',
          'Interfere with system security or performance',
          'Use the Dashboard for fraudulent, illegal, or abusive activities',
          'Attempt to reverse engineer, copy, or manipulate system components',
        ],
      },
      security: {
        title: '6. Security and Monitoring',
        items: [
          'The Bank implements security controls to protect systems and data',
          'User activities on the Dashboard are logged and monitored',
          'The Bank may investigate any suspicious or unauthorized activity without prior notice',
          'Monitoring is conducted strictly for security, compliance, and audit purposes',
        ],
      },
      availability: {
        title: '7. Availability and Maintenance',
        content: 'The Dashboard is provided on a best-effort basis. While the Bank strives for continuous availability:',
        items: [
          'Planned maintenance or upgrades may cause temporary unavailability',
          'Access may be restricted due to technical or regulatory reasons',
          'The Bank shall not be liable for service interruptions beyond reasonable control',
        ],
      },
      dataAccuracy: {
        title: '8. Data Accuracy and Reports',
        items: [
          'Transaction and settlement data displayed is based on records available at the time of access',
          'Merchants are responsible for reviewing and reconciling reports',
          'The Bank shall not be liable for decisions made solely based on dashboard information without independent verification',
        ],
      },
      liability: {
        title: '9. Limitation of Liability',
        content: 'To the maximum extent permitted by law, Canara Bank shall not be liable for:',
        items: [
          'Indirect, incidental, or consequential losses',
          'Losses arising from merchant negligence or misuse',
          'Unauthorized access caused by compromised credentials',
          'Third-party system or network failures',
        ],
      },
      termination: {
        title: '10. Suspension and Termination',
        content: 'The Bank may suspend or terminate Dashboard access:',
        items: [
          'For violation of these Terms',
          'For security or compliance reasons',
          'As required by regulatory or statutory authorities',
        ],
      },
      intellectualProperty: {
        title: '11. Intellectual Property',
        content: 'All content, systems, and software associated with the Dashboard are the property of Canara Bank or its licensors. Merchants are granted a limited, non-transferable, revocable right to use the Dashboard strictly in accordance with these Terms.',
      },
      modifications: {
        title: '12. Modifications to Terms',
        content: 'Canara Bank reserves the right to modify these Terms at any time. Updated Terms will be made available on the Dashboard and continued usage constitutes acceptance of the revised Terms.',
      },
      governingLaw: {
        title: '13. Governing Law and Jurisdiction',
        content: 'These Terms shall be governed by and construed in accordance with the laws of India. All disputes shall be subject to the exclusive jurisdiction of competent courts in India.',
      },
      grievance: {
        title: '14. Grievance Redressal',
        content: 'For queries or grievances related to the Dashboard or these Terms, merchants may contact Canara Bank through officially designated support or grievance redressal channels.',
      },
    },
  },
  support: {
    title: 'Contact Support',
    subtitle: 'Canara Bank – Merchant Dashboard Support',
    channels: {
      title: 'Support Channels',
      description: 'Reach out to us through any of the following channels',
      email: {
        title: 'Email Support',
        value: 'merchantsupport@canarabank.com',
        note: 'Response within 24 hours',
      },
      phone: {
        title: 'Toll-Free Helpline',
        value: '1800-425-0018',
        note: 'Available 24x7',
      },
      whatsapp: {
        title: 'WhatsApp Support',
        value: '+91 80 6883 8888',
        note: 'Quick responses during business hours',
      },
    },
    workingHours: {
      title: 'Working Hours',
      weekdays: 'Monday - Friday',
      weekdaysTime: '9:00 AM - 6:00 PM',
      saturday: 'Saturday',
      saturdayTime: '9:00 AM - 2:00 PM',
      sunday: 'Sunday & Holidays',
      closed: 'Closed',
      urgentNote: 'Toll-free helpline is available 24x7 for urgent transaction issues',
    },
    escalation: {
      title: 'Escalation Matrix',
      description: 'For unresolved issues, escalate in this order',
      level1: {
        title: 'Level 1: Support Team',
        note: 'Response: 24 hours',
      },
      level2: {
        title: 'Level 2: Senior Support Manager',
        note: 'escalation@canarabank.com',
      },
      level3: {
        title: 'Level 3: Nodal Officer',
        note: 'nodalofficer@canarabank.com',
      },
    },
  },
  dashboard: {
    searchPlaceholder: 'Search pages, actions, transactions...',
    quickActions: 'Quick Actions',
    pages: 'Pages',
    noResults: 'No results found',
    trySearching: 'Try searching for pages like "Dashboard" or actions like "Create QR"',
    navigate: 'Navigate',
    select: 'Select',
    merchantStore: 'Merchant Store',
    viewProfile: 'View Profile',
    bankDetails: 'Bank Details',
    apiKeys: 'API Keys',
  },
};

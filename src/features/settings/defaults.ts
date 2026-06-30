// Shared settings constants — NOT a server action file
// Safe to import from both server and client contexts

export const DEFAULT_SETTINGS = {
  gymName: "The FitHub Gym",
  addressLine1: "Plot No. 6456, Ward No. 17, Opp. Govt. ITI",
  addressLine2: "Kalambha Road",
  addressLine3: "Narkhed - 441304",
  phoneNo: "+91 87888 49529",
  registrationFee: 200,
  expiryReminderDays: 5,
  socialInstagram: "https://www.instagram.com/thefithubgym.narkhed",
  socialWhatsapp: "https://wa.me/918788849529",
  socialGoogleMaps: "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIHCAEQABiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABDIHCAkQABiABNIBCTEwNTM0ajBqN6gCALACAA&um=1&ie=UTF8&fb=1&gl=in&sa=X&geocode=KY-RnQyGrdU7MaHJY1UE-nxj&daddr=Plot+no+6456,+Ward+no+17,+opp+Govt+ITI,+Kalambha+Road,+Narkhed+-+441304",
  socialEmail: "millennialcorpllp@gmail.com",
  whatsappEnabled: false,
  whatsappPhoneId: null as string | null,
  whatsappToken: null as string | null,
  businessId: null as string | null,
  timezone: "Asia/Kolkata",
};

export type SettingsData = typeof DEFAULT_SETTINGS;

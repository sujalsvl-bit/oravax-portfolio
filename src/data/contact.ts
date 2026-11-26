export interface ContactConfig {
  email: string | null;
  whatsapp: string | null;
  phone: string | null;
  bookingUrl: string | null;
}

// Confirmed contact channels for oravax.
// No contact form or tracking is used.
export const contactConfig: ContactConfig = {
  email: "oravaxbusiness@gmail.com",
  whatsapp: "https://wa.me/917202080634",
  phone: "+917202080634",
  bookingUrl: null,
};

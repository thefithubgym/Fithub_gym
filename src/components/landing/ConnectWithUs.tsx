import { Phone, Mail, MapPin, Compass } from "lucide-react";

export default function ConnectWithUs() {
  return (
    <section className="py-16" id="contact">
      <div className="max-w-7xl px-container-margin mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3xl">

          {/* iframe map */}
          <div className="order-1 md:order-0 w-full h-full border-t border-[#323232] relative overflow-hidden">
            <iframe
              src="https://maps.google.com/maps?q=Plot%20no%206456,%20Ward%20no%2017,%20opp%20Govt%20ITI,%20Kalambha%20Road,%20Narkhed%20-%20441304&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 grayscale opacity-80 contrast-125"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute bottom-lg left-1/2 -translate-x-1/2 bg-[#181818] border border-[#323232] px-lg py-md rounded-xl shadow-lg backdrop-blur-md flex items-center gap-md z-10">
              <Compass className="w-5 h-5 text-primary-container animate-spin" style={{ animationDuration: "6s" }} />
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIHCAEQABiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABDIHCAkQABiABNIBCTEwNTM0ajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KY-RnQyGrdU7MaHJY1UE-nxj&daddr=Plot+no+6456,+Ward+no+17,+opp+Govt+ITI,+Kalambha+Road,+Narkhed+-+441304"
                className="font-label-md text-xs md:text-sm font-bold text-white hover:text-primary transition-colors"
              >
                Find Us on Google Maps
              </a>
            </div>
          </div>

          {/* contact */}
          <div className="flex flex-col gap-xl">
            {/* Operating Hours */}
            <div className="overflow-hidden">
              <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight mb-xs">Operating Hours</h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#323232]">
                    <th className="py-sm font-label-sm text-label-sm text-secondary uppercase font-semibold">Session</th>
                    <th className="py-sm font-label-sm text-label-sm text-secondary uppercase font-semibold text-right">Hours</th>
                  </tr>
                </thead>
                <tbody className="font-body-md text-body-md">
                  <tr className="border-b border-[#323232]">
                    <td className="py-md text-on-surface font-semibold">Morning</td>
                    <td className="py-md text-secondary text-right">6:00 AM - 11:00 AM</td>
                  </tr>
                  <tr className="border-b border-[#323232]">
                    <td className="py-md text-on-surface/80 pl-4 text-sm italic">└ Ladies Special</td>
                    <td className="py-md text-secondary/80 text-right text-sm italic">6:00 AM - 7:00 AM</td>
                  </tr>
                  <tr className="border-b border-[#323232]">
                    <td className="py-md text-on-surface font-semibold">Evening</td>
                    <td className="py-md text-secondary text-right">4:00 PM - 9:00 PM</td>
                  </tr>
                  <tr>
                    <td className="py-md text-on-surface/80 pl-4 text-sm italic">└ Ladies Special</td>
                    <td className="py-md text-secondary/80 text-right text-sm italic">4:00 PM - 5:00 PM</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col gap-lg">
              <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight">Facility Details</h3>
              <div className="flex flex-col gap-md">
                <div className="flex items-start gap-md">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary-container shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Street Address</h4>
                    <p className="text-secondary text-sm mt-xs">
                      Plot no 6456, Ward no 17,<br />opp Govt ITI, Kalambha Road, Narkhed - 441304
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-md">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary-container shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Contact Number</h4>
                    <p className="text-secondary text-sm mt-xs">+91 8788849529</p>
                  </div>
                </div>

                <div className="flex items-start gap-md">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary-container shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Email Address</h4>
                    <p className="text-secondary text-sm mt-xs">millennialcorpllp@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="flex flex-col gap-lg" id="contact-form">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tight">
                Connect with us
              </h2>
              <p className="text-secondary text-sm mt-sm">
                Have questions about memberships or want to schedule a visit? Send us a message and our team will connect with you.
              </p>
            </div>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-0">
                <label className="input-label" htmlFor="fullName">Full Name</label>
                <input className="input-field" id="fullName" placeholder="John Doe" type="text" required />
              </div>
              <div className="flex flex-col gap-0">
                <label className="input-label" htmlFor="emailAddress">Email Address</label>
                <input className="input-field" id="emailAddress" placeholder="john@example.com" type="email" required />
              </div>
              <div className="flex flex-col gap-0">
                <label className="input-label" htmlFor="phoneNumber">Phone Number</label>
                <input className="input-field" id="phoneNumber" placeholder="+91 98765 43210" type="tel" required />
              </div>
              <div className="flex flex-col gap-0">
                <label className="input-label" htmlFor="message">Message</label>
                <textarea
                  className="bg-[#181818] border border-[#323232] rounded-xl p-4 text-white placeholder:text-secondary focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors font-body-md text-body-md resize-none h-32"
                  id="message"
                  placeholder="Tell us about your goals..."
                  required
                />
              </div>
              <button
                className="w-full bg-primary-container text-[#0F0F0F] font-bold rounded-xl py-4 hover:bg-primary transition-all active:scale-[0.98] cursor-pointer text-sm font-label-md"
                type="submit"
              >
                Send Request
              </button>
            </form>
          </div> */}
        </div>
      </div>

      {/* Map layout directly below contact panels - pointing to Narkher address iframe, grayscale, bounce pin removed */}
      {/* <div className="w-full h-96 border-t border-[#323232] relative mt-16 overflow-hidden">
        <iframe
          src="https://maps.google.com/maps?q=Plot%20no%206456,%20Ward%20no%2017,%20opp%20Govt%20ITI,%20Kalambha%20Road,%20Narkhed%20-%20441304&t=&z=16&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0 grayscale opacity-80 contrast-125"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="absolute bottom-lg left-1/2 -translate-x-1/2 bg-[#181818] border border-[#323232] px-lg py-md rounded-xl shadow-lg backdrop-blur-md flex items-center gap-md z-10">
          <Compass className="w-5 h-5 text-primary-container animate-spin" style={{ animationDuration: "6s" }} />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIHCAEQABiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABDIHCAkQABiABNIBCTEwNTM0ajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KY-RnQyGrdU7MaHJY1UE-nxj&daddr=Plot+no+6456,+Ward+no+17,+opp+Govt+ITI,+Kalambha+Road,+Narkhed+-+441304"
            className="font-label-md text-xs md:text-sm font-bold text-white hover:text-primary transition-colors"
          >
            Find Us on Google Maps
          </a>
        </div>
      </div> */}
    </section>
  );
}

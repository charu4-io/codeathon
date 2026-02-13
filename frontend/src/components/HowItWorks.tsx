import React from "react";
import HelpCard from "./helpcard";

const HelpSection = () => {
  return (
    <section className="py-20 px-6">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">
        Yeh Aapki Kaise Madad Karta Hai?
      </h2>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <HelpCard
          icon="🧪"
          title="Verified Hygiene Ratings"
          description={[
            "Street food mein ab guesswork nahi.",
            "Har vendor ko milta hai ek clear Trust Score, jo hygiene checks par based hota hai.",
            "🟢 Green Shield Badge se customers ko turant pata chal jata hai kaun safe hai.",
            "Clean vendors ko milte hain better ranking aur zyada sales. 🚀",
          ]}
        />

        <HelpCard
          highlighted
          icon="⚡"
          title='Smart “StreetDeals” Engine'
          description={[
            "Profit ko waste hone se roko.",
            "Bas ek tap ka “Panic Button” aur nearby customers ko turant flash sale alert milta hai.",
            "Chahe flowers ho ya evening snacks, unsold stock banega instant cash. 💰",
            "Waste kam, customers happy. 🎉",
          ]}
        />

        <HelpCard
          icon="👩‍🍳"
          title="She-Power Boost"
          description={[
            "Hum sirf vendors ko list nahi karte, unhe equal chance dete hain.",
            "Hamari system female entrepreneurs ko search mein extra visibility deta hai.",
            "Isse hardworking women ko zyada customers aur better income milta hai. 💜",
            "Equal mauka. Real growth.",
          ]}
        />

        <HelpCard
          icon="📍"
          title="Hyperlocal Digital Identity"
          description={[
            "Ab har vendor ko milta hai apna digital address.",
            "Map par easily searchable — bilkul ek restaurant ki tarah.",
            "Unka profile show karega location, menu aur ratings.",
            "Moving cart ab banega poora area ka discoverable business. 🚀",
          ]}
        />
      </div>
    </section>
  );
};

export default HelpSection;

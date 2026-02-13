import React from "react";
import ProblemCard from "./problemCard";



const ProblemSection = () => {
  return (
  
      <div className="relative z-10 bg-[#F7A36B]">

        <h2 className="text-4xl font-extrabold text-center mb-30 text-black">
          Problems We Solve ?
        </h2>

        {/* Cards Wrapper */}
        <div className="flex justify-center gap-34 flex-wrap px-6 font-medium">

          <ProblemCard
            title="Verified Hygiene = Real Trust"
            description={
              <>
                Street food sabko pasand hai ❤️<br />
                Lekin hygiene ko lekar doubt hota hai<br />
                <span className="font-bold text-xl my-2 block">???</span>
                TrustCart deta hai har vendor ko<br />
                ek clear <b>Trust Score</b> —<br />
                real hygiene checks par based.<br />
                Safe vendors ko milta hai<br />
                <span className="font-extrabold text-green-700 block my-1">Green Shield Badge</span>
                Ab customers doubt se nahi,<br />
                trust ke saath kharidenge.
              </>
            }
            bgColor="bg-[#4DD0E1]"
          />

          <ProblemCard
            title="Smart Visibility = Equal Mauka"
            description={
              <>
                Bahut saare hardworking vendors,<br />
                especially women aur migrant sellers,<br />
                digital duniya mein visible hi nahi<br />
                hote.<br />
                TrustCart deta hai har vendor ko<br />
                ek searchable digital address.<br />
                Aur hamara system automatically<br />
                boost karta hai<br />
                female aur top-rated vendors ko.<br />
                Matlab —<br />
                mehnat aur quality ka milega<br />
                seedha zyada customers aur zyada<br />
                income.
              </>
            }
            bgColor="bg-[#FFD54F]"
          />

          <ProblemCard
            title="Flash Sales = Waste se Profit"
            description={
              <>
                Roz ke end tak fruits, flowers ya cooked<br />
                food<br />
                unsold reh jaate hain — aur loss ho jata<br />
                hai.<br />
                TrustCart laata hai <b>StreetDeals 🚀</b><br />
                Bas ek tap ka "Panic Button"<br />
                aur turant nearby customers ko<br />
                discount alert milta hai.<br />
                Result?<br />
                Inventory jaldi clear,<br />
                aur loss ki jagah instant cash. 💰
              </>
            }
            bgColor="bg-[#4DD0E1]"
          />

        </div>
      </div>
    
  );
};

export default ProblemSection;

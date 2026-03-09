// Content models for Federal Reserve Simulator

export interface ConceptPage {
  title: string;
  slug: string;
  description: string;
  intro: string;
  sections: { heading: string; content: string }[];
  faq: { q: string; a: string }[];
  relatedLinks: { title: string; href: string }[];
  updatedAt: string;
}

export interface GuidePage {
  title: string;
  slug: string;
  description: string;
  intro: string;
  steps: { title: string; content: string }[];
  faq: { q: string; a: string }[];
  relatedLinks: { title: string; href: string }[];
  updatedAt: string;
}

export interface CalculatorPage {
  title: string;
  slug: string;
  description: string;
  intro: string;
  inputs: { label: string; type: string; min?: number; max?: number; step?: number; default?: number }[];
  formulaNote: string;
  resultExplainer: string;
  faq: { q: string; a: string }[];
  relatedLinks: { title: string; href: string }[];
  updatedAt: string;
}

// Content data
export const concepts: Record<string, ConceptPage> = {
  "federal-funds-rate": {
    title: "Federal Funds Rate Explained",
    slug: "federal-funds-rate",
    description: "Learn what the federal funds rate is, how it works, and why it's the Fed's most powerful tool for managing the economy.",
    intro: "The federal funds rate is the interest rate at which banks lend money to each other overnight. It's the Federal Reserve's primary tool for influencing economic activity, affecting everything from mortgage rates to credit card interest to business investment decisions.",
    sections: [
      {
        heading: "What is the Federal Funds Rate?",
        content: "The federal funds rate is the target interest rate set by the Federal Open Market Committee (FOMC) at which commercial banks borrow and lend their excess reserves to each other overnight. When a bank has more money than required by reserve requirements, it can lend that excess to other banks that need to meet their reserve requirements. The rate charged for these overnight loans is the federal funds rate."
      },
      {
        heading: "How Does the Fed Control It?",
        content: "The Fed doesn't directly set the federal funds rate—it sets a target range and uses open market operations to influence the actual rate. The Fed buys or sells government securities to increase or decrease the money supply, which pushes the rate toward the target. When the Fed wants to lower rates, it buys securities, injecting money into the banking system. When it wants to raise rates, it sells securities, removing money from circulation."
      },
      {
        heading: "Why Does It Matter?",
        content: "The federal funds rate is the foundation of all other interest rates in the economy. When the Fed raises the federal funds rate, banks pay more to borrow money overnight, so they charge higher rates on loans to consumers and businesses. This makes borrowing more expensive, which slows spending and investment, cooling down the economy and reducing inflation. When the Fed lowers the rate, the opposite happens—borrowing becomes cheaper, encouraging spending and investment, which stimulates economic growth."
      },
      {
        heading: "Real-World Impact",
        content: "Changes in the federal funds rate ripple through the entire economy. Mortgage rates, auto loan rates, credit card rates, and business loan rates all move in response to Fed rate changes. A 0.25% (25 basis point) rate hike might seem small, but it can add hundreds of dollars per year to mortgage payments and significantly affect corporate borrowing costs. That's why Fed rate decisions are watched so closely by investors, businesses, and consumers."
      }
    ],
    faq: [
      { q: "What is a basis point?", a: "A basis point is 1/100th of a percentage point. So 25 basis points equals 0.25%. The Fed typically moves rates in 25 or 50 basis point increments." },
      { q: "How often does the Fed change rates?", a: "The FOMC meets eight times per year to decide on rate policy. They can change rates at any meeting, keep them unchanged, or make emergency changes between meetings during crises." },
      { q: "What's the difference between the federal funds rate and the discount rate?", a: "The federal funds rate is what banks charge each other. The discount rate is what the Fed charges banks directly when they borrow from the Fed's discount window. The discount rate is typically higher and used less frequently." }
    ],
    relatedLinks: [
      { title: "Try the Federal Reserve Simulator", href: "/" },
      { title: "What is Quantitative Easing?", href: "/concepts/quantitative-easing" },
      { title: "How the Fed Fights Inflation", href: "/guides/how-the-fed-fights-inflation" },
      { title: "Rate Impact Calculator", href: "/calculators/rate-impact-calculator" }
    ],
    updatedAt: "2026-03-09"
  },
  "quantitative-easing": {
    title: "Quantitative Easing (QE) Explained",
    slug: "quantitative-easing",
    description: "Understand quantitative easing—the Fed's unconventional monetary policy tool used when interest rates are near zero.",
    intro: "Quantitative easing (QE) is a monetary policy tool the Federal Reserve uses when traditional interest rate cuts are no longer effective—typically when rates are already near zero. Instead of lowering short-term rates, the Fed buys large amounts of longer-term securities to inject money directly into the financial system.",
    sections: [
      {
        heading: "What is Quantitative Easing?",
        content: "Quantitative easing is the large-scale purchase of government bonds and other securities by the central bank. When the Fed buys these assets from banks and financial institutions, it pays with newly created money, increasing the money supply and bank reserves. This is different from normal open market operations, which focus on short-term securities and smaller amounts."
      },
      {
        heading: "When is QE Used?",
        content: "QE is typically deployed during severe economic crises when interest rates are already at or near zero—a situation called the 'zero lower bound.' At this point, the Fed can't stimulate the economy by cutting rates further, so it turns to QE. The Fed used QE extensively during the 2008 financial crisis and again during the COVID-19 pandemic."
      },
      {
        heading: "How Does QE Work?",
        content: "By buying long-term bonds, the Fed pushes up bond prices and pushes down long-term interest rates. Lower long-term rates make mortgages, business loans, and other long-term borrowing cheaper, encouraging spending and investment. The increased bank reserves also make banks more willing to lend. Additionally, QE signals the Fed's commitment to supporting the economy, which can boost confidence."
      },
      {
        heading: "Risks and Side Effects",
        content: "QE isn't without risks. It dramatically increases the Fed's balance sheet and the money supply, which can potentially lead to inflation if not managed carefully. It can also inflate asset prices (stocks, real estate), benefiting wealthy asset owners more than average workers. When the Fed eventually needs to unwind QE (called 'quantitative tightening'), it must do so carefully to avoid disrupting markets."
      }
    ],
    faq: [
      { q: "Is QE the same as 'printing money'?", a: "Sort of. The Fed creates new money electronically to buy securities, which increases the money supply. However, this money goes into bank reserves first, not directly into circulation, so the inflationary impact depends on whether banks lend it out." },
      { q: "How much QE did the Fed do?", a: "During the 2008 crisis, the Fed's balance sheet grew from $900 billion to $4.5 trillion. During COVID-19, it grew from $4 trillion to nearly $9 trillion. These are massive interventions by historical standards." },
      { q: "Can QE go on forever?", a: "No. Eventually, the Fed needs to normalize its balance sheet through quantitative tightening (QT)—selling securities or letting them mature without replacement. Doing this too quickly can shock markets, so it's a delicate process." }
    ],
    relatedLinks: [
      { title: "Try the Federal Reserve Simulator", href: "/" },
      { title: "Federal Funds Rate Explained", href: "/concepts/federal-funds-rate" },
      { title: "What Happens When Interest Rates Go Up", href: "/guides/what-happens-when-interest-rates-go-up" }
    ],
    updatedAt: "2026-03-09"
  },
  "soft-landing": {
    title: "Soft Landing Explained",
    slug: "soft-landing",
    description: "Learn what a soft landing means in monetary policy and why it's so difficult for the Fed to achieve.",
    intro: "A soft landing is the ideal outcome of monetary policy tightening—when the Federal Reserve successfully slows down an overheating economy and brings inflation under control without triggering a recession. It's called 'soft' because the economy lands gently rather than crashing.",
    sections: [
      {
        heading: "What is a Soft Landing?",
        content: "A soft landing occurs when the Fed raises interest rates enough to cool inflation but not so much that it causes a recession. The goal is to slow economic growth to a sustainable pace (around 2-3% GDP growth) while keeping unemployment low and bringing inflation back to the 2% target. It's a delicate balancing act that requires precise timing and a bit of luck."
      },
      {
        heading: "Why is it So Hard?",
        content: "Monetary policy works with long and variable lags—it can take 12-18 months for rate changes to fully impact the economy. This means the Fed is essentially flying blind, making decisions based on backward-looking data while trying to predict the future. Raise rates too little, and inflation stays high. Raise them too much, and you trigger a recession. The Fed has to thread the needle perfectly."
      },
      {
        heading: "Historical Track Record",
        content: "Soft landings are rare. In the past 60 years, the Fed has attempted to engineer soft landings many times, but only succeeded a handful of times—most notably in 1994-1995. More often, aggressive rate hikes to fight inflation have led to recessions, as seen in 1980-1982, 1990-1991, and 2001. The 2022-2024 tightening cycle is still being evaluated."
      },
      {
        heading: "Key Indicators to Watch",
        content: "Several indicators signal whether a soft landing is achievable: the unemployment rate (should stay below 5%), GDP growth (should slow but stay positive), inflation (should decline toward 2%), and consumer confidence (should remain stable). If unemployment starts rising rapidly or GDP turns negative, the soft landing has failed and a recession is likely."
      }
    ],
    faq: [
      { q: "What's the opposite of a soft landing?", a: "A 'hard landing' is when the Fed's rate hikes cause a recession—negative GDP growth, rising unemployment, and falling consumer spending. This is what the Fed tries to avoid but often can't." },
      { q: "Can the Fed guarantee a soft landing?", a: "No. The economy is too complex and unpredictable. External shocks (oil price spikes, pandemics, financial crises) can derail even the best-laid plans. The Fed can only do its best with the information available." },
      { q: "How do you know if a soft landing succeeded?", a: "You can only know in hindsight. If inflation comes down to 2% and unemployment stays below 5% without a recession, it's a soft landing. But it takes 1-2 years of data to confirm." }
    ],
    relatedLinks: [
      { title: "Try the Federal Reserve Simulator", href: "/" },
      { title: "How the Fed Fights Inflation", href: "/guides/how-the-fed-fights-inflation" },
      { title: "Federal Funds Rate Explained", href: "/concepts/federal-funds-rate" }
    ],
    updatedAt: "2026-03-09"
  }
};

export const guides: Record<string, GuidePage> = {
  "how-the-fed-fights-inflation": {
    title: "How the Fed Fights Inflation",
    slug: "how-the-fed-fights-inflation",
    description: "Learn the step-by-step process the Federal Reserve uses to combat inflation and bring prices under control.",
    intro: "When inflation rises above the Fed's 2% target, the central bank has several tools to cool down the economy and bring prices back under control. Understanding this process helps you make better decisions in the Federal Reserve Simulator.",
    steps: [
      { title: "Step 1: Raise the Federal Funds Rate", content: "The Fed's primary weapon against inflation is raising interest rates. By increasing the federal funds rate, the Fed makes borrowing more expensive throughout the economy. Higher rates mean higher mortgage payments, more expensive car loans, and costlier business credit. This reduces spending and investment, which slows economic growth and reduces demand for goods and services." },
      { title: "Step 2: Use Forward Guidance", content: "The Fed signals its intentions to markets through forward guidance. Hawkish guidance (indicating more rate hikes ahead) tightens financial conditions even before rates actually rise. This works because markets price in future rate changes immediately, affecting long-term interest rates and asset prices right away." },
      { title: "Step 3: Reduce the Balance Sheet (QT)", content: "If the Fed has been doing quantitative easing, it can reverse course with quantitative tightening (QT). This means letting bonds mature without replacing them or actively selling securities. QT removes money from the financial system, further tightening conditions and putting upward pressure on interest rates." },
      { title: "Step 4: Monitor and Adjust", content: "Fighting inflation isn't a one-time action—it's an ongoing process. The Fed watches key indicators like the Consumer Price Index (CPI), unemployment rate, wage growth, and consumer spending. If inflation stays high, more rate hikes follow. If the economy weakens too much, the Fed may pause or even cut rates to avoid a recession." },
      { title: "Step 5: Communicate Clearly", content: "Clear communication is crucial. The Fed must explain its actions to prevent panic and maintain credibility. If markets believe the Fed is serious about fighting inflation, inflation expectations stay anchored, making the Fed's job easier. If credibility is lost, inflation can become self-fulfilling as workers demand higher wages and businesses raise prices preemptively." }
    ],
    faq: [
      { q: "How long does it take for rate hikes to work?", a: "Monetary policy works with 'long and variable lags'—typically 12-18 months. This means rate hikes today won't fully impact inflation until next year, making the Fed's job very difficult." },
      { q: "Can the Fed fight inflation without causing a recession?", a: "Sometimes, but it's rare. Most aggressive inflation-fighting campaigns have ended in recession. The Fed tries for a 'soft landing' but doesn't always succeed." },
      { q: "What if inflation is caused by supply shocks?", a: "Supply-driven inflation (like oil price spikes) is harder to fight with rate hikes because the Fed can't increase oil supply. Rate hikes can still work by reducing demand, but at a higher cost to the economy." }
    ],
    relatedLinks: [
      { title: "Try the Federal Reserve Simulator", href: "/" },
      { title: "Federal Funds Rate Explained", href: "/concepts/federal-funds-rate" },
      { title: "What is a Soft Landing?", href: "/concepts/soft-landing" },
      { title: "Rate Impact Calculator", href: "/calculators/rate-impact-calculator" }
    ],
    updatedAt: "2026-03-09"
  },
  "what-happens-when-interest-rates-go-up": {
    title: "What Happens When Interest Rates Go Up",
    slug: "what-happens-when-interest-rates-go-up",
    description: "Understand the ripple effects of Fed rate hikes across the economy—from mortgages to stocks to jobs.",
    intro: "When the Federal Reserve raises interest rates, it sets off a chain reaction throughout the economy. Here's what happens step by step.",
    steps: [
      { title: "Borrowing Becomes More Expensive", content: "The most immediate effect is higher borrowing costs. Mortgage rates rise, making home purchases more expensive. Credit card rates increase, making debt more costly. Business loans become pricier, reducing corporate investment. Auto loans cost more, slowing car sales. This is exactly what the Fed wants—less borrowing means less spending." },
      { title: "Savings Become More Attractive", content: "Higher rates mean better returns on savings accounts, CDs, and bonds. This encourages people to save rather than spend. Money flows out of riskier investments (like stocks) into safer, higher-yielding bonds. This is another way rate hikes cool the economy—by shifting behavior from spending to saving." },
      { title: "Asset Prices Fall", content: "Stock prices typically decline when rates rise because future corporate earnings are worth less when discounted at higher rates. Real estate prices soften as higher mortgage rates reduce buyer demand. Bond prices fall (yields rise) as new bonds offer better rates than existing ones. Wealth effects from falling asset prices further reduce consumer spending." },
      { title: "Economic Growth Slows", content: "As borrowing, spending, and investment decline, GDP growth slows. Businesses hire fewer workers or even lay people off. Unemployment may rise. Consumer confidence weakens. This is the painful but necessary side effect of fighting inflation—you have to slow the economy to reduce demand and bring prices down." },
      { title: "Inflation Eventually Falls", content: "After 12-18 months, the cumulative effects of higher rates bring inflation down. Reduced demand means businesses can't raise prices as easily. Wage growth moderates as unemployment rises. Commodity prices fall. If the Fed times it right, inflation returns to 2% without a severe recession. If not, the economy crashes." }
    ],
    faq: [
      { q: "Do rate hikes affect everyone equally?", a: "No. People with variable-rate debt (adjustable mortgages, credit cards) feel the pain immediately. Savers benefit from higher returns. Wealthy people with diversified assets may be less affected than working-class families living paycheck to paycheck." },
      { q: "How much do rates need to rise to stop inflation?", a: "It depends. The 'neutral rate' (neither stimulating nor restricting) is around 2.5%. To fight high inflation, the Fed often needs to go well above neutral—sometimes to 5% or higher, as seen in the early 1980s." },
      { q: "Can rate hikes cause a recession?", a: "Yes. If the Fed raises rates too aggressively, it can push the economy into recession. This is the risk of fighting inflation—you might overshoot and cause unnecessary economic pain." }
    ],
    relatedLinks: [
      { title: "Try the Federal Reserve Simulator", href: "/" },
      { title: "How the Fed Fights Inflation", href: "/guides/how-the-fed-fights-inflation" },
      { title: "Federal Funds Rate Explained", href: "/concepts/federal-funds-rate" },
      { title: "Rate Impact Calculator", href: "/calculators/rate-impact-calculator" }
    ],
    updatedAt: "2026-03-09"
  }
};

export const calculators: Record<string, CalculatorPage> = {
  "rate-impact-calculator": {
    title: "Interest Rate Impact Calculator",
    slug: "rate-impact-calculator",
    description: "Calculate how Fed rate changes affect your mortgage, loans, and savings with this free interactive tool.",
    intro: "Use this calculator to estimate how changes in the federal funds rate impact your personal finances. Enter your loan amounts and savings to see the real-world effects of Fed policy decisions.",
    inputs: [
      { label: "Mortgage Balance", type: "number", min: 0, max: 2000000, step: 10000, default: 300000 },
      { label: "Credit Card Balance", type: "number", min: 0, max: 100000, step: 1000, default: 5000 },
      { label: "Auto Loan Balance", type: "number", min: 0, max: 100000, step: 1000, default: 25000 },
      { label: "Savings Account Balance", type: "number", min: 0, max: 500000, step: 5000, default: 20000 },
      { label: "Rate Change (basis points)", type: "number", min: -200, max: 200, step: 25, default: 50 }
    ],
    formulaNote: "This calculator uses simplified assumptions: mortgages adjust by 0.7x the Fed rate change, credit cards by 1.0x, auto loans by 0.8x, and savings accounts by 0.5x. Actual impacts vary by lender and loan type.",
    resultExplainer: "The results show estimated annual cost changes. Positive numbers mean higher costs (for debt) or higher earnings (for savings). Remember that Fed rate changes take time to fully pass through to consumer rates—typically 3-6 months.",
    faq: [
      { q: "Why don't my rates change by the exact Fed amount?", a: "Banks don't pass through Fed rate changes one-for-one. Mortgages are less sensitive (0.7x), while credit cards track more closely (1.0x). It depends on the loan type and market competition." },
      { q: "When will I see these changes?", a: "Most variable-rate loans adjust within 1-3 months of a Fed rate change. Fixed-rate loans don't change, but new loans will have different rates. Savings accounts may take longer to adjust upward." },
      { q: "Should I refinance if rates are rising?", a: "If you have a variable-rate mortgage and rates are rising, refinancing to a fixed rate can lock in lower payments. But if rates have already risen significantly, you may have missed the window." }
    ],
    relatedLinks: [
      { title: "Try the Federal Reserve Simulator", href: "/" },
      { title: "Federal Funds Rate Explained", href: "/concepts/federal-funds-rate" },
      { title: "What Happens When Rates Go Up", href: "/guides/what-happens-when-interest-rates-go-up" }
    ],
    updatedAt: "2026-03-09"
  }
};

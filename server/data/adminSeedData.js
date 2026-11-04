const defaultLogos = [
  { name: "Razain", src: "/razain.png", order: 1 },
  { name: "Redpex", src: "/redpex.png", order: 2 },
  { name: "Horizone Energy", src: "/horizone.png", order: 3 },
  { name: "Inkspire", src: "/inkspire.png", order: 4 },
  { name: "Paris Cafe", src: "/paris cafe.png", order: 5 },
  { name: "IPAS Advisory", src: "/ipas-logo.png", order: 6 },
  { name: "Brownie Bakes", src: "/brownie-bakes.png", order: 7 },
  { name: "Brand Partner 1", src: "/LOGO 1.png", order: 8 },
  { name: "Brand Partner 4", src: "/LOGO 4.png", order: 9 },
  { name: "Brand Partner 5", src: "/LOGO 5.png", order: 10 },
  { name: "Brand Partner 2", src: "/LOGO 2.png", order: 11 }
];

const defaultReels = [
  {
    creator: "Fathima Shiya Hamza",
    avatar: "FS",
    title: "Matglober UK • With the Expert",
    thumb: "/reels/shiya-reel-1.jpg",
    url: "https://www.instagram.com/reel/DHx3H4stp47/",
    rotation: "-3.5deg",
    marginTop: "0px",
    order: 1
  },
  {
    creator: "Fathima Shiya Hamza",
    avatar: "FS",
    title: "UK With The Expert • Shiya Hamsa",
    thumb: "/reels/shiya-reel-2.jpg",
    url: "https://www.instagram.com/reel/DQieVaXkuNi/",
    rotation: "2.5deg",
    marginTop: "26px",
    order: 2
  },
  {
    creator: "Fathima Shiya Hamza",
    avatar: "FS",
    title: "Practical Learning Series",
    thumb: "/reels/shiya-reel-3.jpg",
    url: "https://www.instagram.com/reel/DW_X_mzkjH7/",
    rotation: "-2deg",
    marginTop: "0px",
    order: 3
  },
  {
    creator: "Fathima Shiya Hamza",
    avatar: "FS",
    title: "Free Fly Campus Tour",
    thumb: "/reels/shiya-reel-4.jpg",
    url: "https://www.instagram.com/reel/DO-_YiGkht6/",
    rotation: "3deg",
    marginTop: "26px",
    order: 4
  },
  {
    creator: "Fathima Shiya Hamza",
    avatar: "FS",
    title: "Presenter & Storyteller Spotlight",
    thumb: "/reels/shiya-reel-5.jpg",
    url: "https://www.instagram.com/reel/DL4fRrzS0Ic/",
    rotation: "-3deg",
    marginTop: "0px",
    order: 5
  },
  {
    creator: "Fathima Shiya Hamza",
    avatar: "FS",
    title: "Academic Counselor Dialogue",
    thumb: "/reels/shiya-reel-6.jpg",
    url: "https://www.instagram.com/reel/DTIOfP-kk2A/",
    rotation: "2.5deg",
    marginTop: "26px",
    order: 6
  },
  {
    creator: "Fathima Shiya Hamza",
    avatar: "FS",
    title: "On-Camera Feature Reel",
    thumb: "/reels/shiya-reel-7.jpg",
    url: "https://www.instagram.com/reel/DWdXDf6krZn/",
    rotation: "-2deg",
    marginTop: "0px",
    order: 7
  },
  {
    creator: "Fathima Shiya Hamza",
    avatar: "FS",
    title: "Brand Narrative Series",
    thumb: "/reels/shiya-reel-8.jpg",
    url: "https://www.instagram.com/reel/DPBYBI1EnTF/",
    rotation: "3deg",
    marginTop: "26px",
    order: 8
  }
];

const defaultPosters = [
  { title: "Paris Cafe Beverage Series", alt: "Paris Cafe Campaign Poster 1", src: "/paris-2.jpeg", campaignTag: "Food & Beverage", order: 1 },
  { title: "Paris Cafe Artisanal Bakes", alt: "Paris Cafe Campaign Poster 2", src: "/paris-3.jpeg", campaignTag: "Food & Beverage", order: 2 },
  { title: "Paris Cafe Signature Coffee", alt: "Paris Cafe Campaign Poster 3", src: "/paris-4.jpeg", campaignTag: "Food & Beverage", order: 3 },
  { title: "IPAS Advisory Tax Planning", alt: "IPAS Advisory Campaign Poster 1", src: "/ipas-3.jpeg", campaignTag: "Finance & Advisory", order: 4 },
  { title: "IPAS Advisory Growth Audit", alt: "IPAS Advisory Campaign Poster 2", src: "/ipas-4.jpeg", campaignTag: "Finance & Advisory", order: 5 },
  { title: "IPAS Advisory Fraud Alert", alt: "IPAS Advisory Campaign Poster 3", src: "/ipas-5.jpeg", campaignTag: "Finance & Advisory", order: 6 },
  { title: "Redpex Retail Platform", alt: "Redpex Campaign Poster 1", src: "/redpex-1.jpeg", campaignTag: "E-Commerce", order: 7 },
  { title: "Redpex Digital Storefront", alt: "Redpex Campaign Poster 2", src: "/redpex-2.png", campaignTag: "E-Commerce", order: 8 },
  { title: "Redpex Campaign Creative", alt: "Redpex Campaign Poster 3", src: "/redpex-3.jpeg", campaignTag: "E-Commerce", order: 9 },
  { title: "Horizone Clean Power Identity", alt: "Horizone Energy Campaign Poster 1", src: "/horizone-1.jpeg", campaignTag: "Clean Energy", order: 10 },
  { title: "Horizone Commercial Solar", alt: "Horizone Energy Campaign Poster 2", src: "/horizone-2.jpeg", campaignTag: "Clean Energy", order: 11 },
  { title: "Horizone Sustainable Grid", alt: "Horizone Energy Campaign Poster 3", src: "/horizone-3.jpeg", campaignTag: "Clean Energy", order: 12 },
  { title: "Inkspire Excellence Program", alt: "Inkspire Study Point Poster 1", src: "/inkspire-1.jpeg", campaignTag: "Education", order: 13 },
  { title: "Inkspire Interactive Academy", alt: "Inkspire Study Point Poster 2", src: "/inkspire-2.jpeg", campaignTag: "Education", order: 14 },
  { title: "Inkspire Student Foundation", alt: "Inkspire Study Point Poster 3", src: "/inkspire-3.jpeg", campaignTag: "Education", order: 15 },
  { title: "Visual Branding Identity", alt: "Visual Branding Poster", src: "/works/work-3-branding.jpg", campaignTag: "Branding", order: 16 },
  { title: "Social Campaign Visual", alt: "Social Campaign Visual", src: "/works/work-4-social-media.jpg", campaignTag: "Social Media", order: 17 },
  { title: "Commercial Digital Creative", alt: "Commercial Digital Creative", src: "/works/work-9-digital-ads.jpg", campaignTag: "Digital Ads", order: 18 }
];

const defaultShowcases = [
  {
    showcaseId: "ipas",
    name: "IPAS Advisory",
    sector: "Finance & Consultancy",
    desc: "Accounting, and Business Advisory. Serving clients across India and the UAE, they help businesses stay compliant and achieve sustainable growth.",
    order: 1,
    images: [
      { src: "/ipas-3.jpeg", alt: "8 Legal Ways to Earn Tax-Free Income in India", label: "Tax Planning" },
      { src: "/ipas-4.jpeg", alt: "Why Financial Planning Shouldn't Wait Till March", label: "Advisory Series" },
      { src: "/ipas-5.jpeg", alt: "ATTENTION - Don't Fall For Scams", label: "Fraud Alert Campaign" }
    ]
  },
  {
    showcaseId: "paris",
    name: "Paris Cafe",
    sector: "Food & Beverage",
    desc: "Paris Cafe is a cozy coffee shop in Malappuram serving delicious artisanal coffee, snacks, and refreshing beverages in a warm and relaxing atmosphere.",
    order: 2,
    images: [
      { src: "/paris-2.jpeg", alt: "Paris Cafe Refreshing Beverages", label: "Artisan Brews" },
      { src: "/paris-3.jpeg", alt: "Paris Cafe Signature Treats", label: "Culinary Visuals" },
      { src: "/paris-4.jpeg", alt: "Paris Cafe Coffee Experience", label: "Cafe Atmosphere" }
    ]
  },
  {
    showcaseId: "redpex",
    name: "Redpex",
    sector: "E-Commerce",
    desc: "Redpex is a modern digital platform focused on delivering premium product experiences, frictionless retail pathways, and streamlined solutions.",
    order: 3,
    images: [
      { src: "/redpex-1.jpeg", alt: "Redpex Brand Launch Visual", label: "Digital Platform" },
      { src: "/redpex-2.png", alt: "Redpex Retail Experience", label: "Store Showcase" },
      { src: "/redpex-3.jpeg", alt: "Redpex Campaign Direction", label: "Campaign Identity" }
    ]
  },
  {
    showcaseId: "horizone",
    name: "Horizone Energy",
    sector: "Clean Energy",
    desc: "Horizone Energy provides reliable solar energy solutions designed to help homes and businesses switch to clean, sustainable, and cost-effective power.",
    order: 4,
    images: [
      { src: "/horizone-1.jpeg", alt: "Horizone Solar Power Systems", label: "Renewable Energy" },
      { src: "/horizone-2.jpeg", alt: "Horizone Installation Projects", label: "Commercial Scale" },
      { src: "/horizone-3.jpeg", alt: "Horizone Clean Power Tomorrow", label: "Eco Leadership" }
    ]
  },
  {
    showcaseId: "inkspire",
    name: "Inkspire Study Point",
    sector: "Education",
    desc: "Inkspire Study Point Tuition Centre is dedicated to helping students achieve academic excellence with experienced mentors across CBSE and State curricula.",
    order: 5,
    images: [
      { src: "/inkspire-1.jpeg", alt: "Inkspire Excellence Program", label: "Academics" },
      { src: "/inkspire-2.jpeg", alt: "Inkspire Classroom Visual", label: "Interactive Tuition" },
      { src: "/inkspire-3.jpeg", alt: "Inkspire Student Journey", label: "Student Success" }
    ]
  }
];

module.exports = {
  defaultLogos,
  defaultReels,
  defaultPosters,
  defaultShowcases
};

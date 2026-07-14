import fs from "fs";
import path from "path";

const DB_FILE = process.env.VERCEL
  ? path.resolve("/tmp/db.json")
  : path.resolve(__dirname, "../../data/db.json");

export interface Banner {
  text: string;
  linkText: string;
  linkUrl: string;
}

export interface Story {
  id: string;
  img: string;
  tag: string;
  date: string;
  title: string;
  desc: string;
  author: string;
  readTime: string;
  content: string[];
}

export interface News {
  id: string;
  title: string;
  img: string;
  date: string;
}

export interface Event {
  id: string;
  date: string;
  month: string;
  title: string;
  loc: string;
  desc: string;
}

export interface Opportunity {
  id: string;
  title: string;
  type: string;
  commitment: string;
  desc: string;
}

export interface Position {
  id: string;
  title: string;
  category: string;
  location: string;
  type: string;
  desc: string;
}

export interface Partner {
  id: string;
  orgName: string;
  contactName: string;
  email: string;
  phone: string;
  partnerType: string;
  focusArea: string;
  proposal: string;
  date: string;
}

export interface DbData {
  banner: Banner;
  heroSlides: string[];
  stories: Story[];
  news: News[];
  events: Event[];
  opportunities: Opportunity[];
  positions: Position[];
  partners: Partner[];
}

const defaultData: DbData = {
  banner: {
    text: "Join our upcoming Global Sustainability Summit 2024.",
    linkText: "Register now.",
    linkUrl: "/summit"
  },
  heroSlides: [
    "/src/assets/images/hero-community.webp",
    "/src/assets/images/hero-solar.webp"
  ],
  stories: [
    {
      id: "0",
      img: "/src/assets/images/story-mobile-clinic.webp",
      tag: "Health",
      date: "Oct 12, 2023",
      title: "New Mobile Clinics Reach Remote Villages in Sub-Saharan Africa",
      desc: "How a fleet of fully-equipped medical vehicles is changing the landscape of rural healthcare access.",
      author: "Dr. Amara Okoro, Director of Rural Health Operations",
      readTime: "5 min read",
      content: [
        "In many rural regions of Sub-Saharan Africa, accessing basic healthcare requires traveling dozens of miles on foot. For pregnant women, young children, and those with chronic conditions, this distance is often a barrier between life and death. To address this crisis, GSSIF launched its new Mobile Health Clinic initiative, deploying a fleet of custom-retrofitted off-road medical vehicles.",
        "Each mobile clinic is staffed by a dedicated team of nurses, general practitioners, and a pharmacist. Equipped with solar-powered refrigerators for vaccine storage, rapid diagnostic testing kits, and essential medications, these units can diagnose and treat the most common illnesses on the spot. From maternal checkups to malaria treatments and immunization campaigns, the clinics provide comprehensive primary care right at the village square.",
        "Since deployment last month, the clinics have visited over 40 remote settlements, treating more than 3,500 patients. Miriam, a resident of a clinic-visited village, notes that: 'For the first time, our children are getting their vaccinations without us having to sacrifice a full day's work and walk through rough terrain.' Plans are already underway to expand the fleet and recruit more volunteer healthcare professionals to meet the overwhelming demand."
      ]
    },
    {
      id: "1",
      img: "/src/assets/images/story-clean-water.webp",
      tag: "Water",
      date: "Sep 28, 2023",
      title: "Clean Water Initiative Brings Hope to 50,000 Families",
      desc: "A new community-managed well system provides sustainable, clean drinking water to previously drought-stricken areas.",
      author: "David Vance, Lead Hydrologist",
      readTime: "4 min read",
      content: [
        "Clean water is the foundation of community development. Without it, health, education, and economic stability are impossible to sustain. In response to prolonged droughts affecting regional farming communities, GSSIF's Clean Water Initiative has successfully engineered and completed 15 community-managed deep borewell systems, delivering potable water to over 50,000 families.",
        "Rather than simply digging wells and leaving, GSSIF's team works with local residents to establish 'Water Committees'. These committees, consisting of equal numbers of men and women, are trained in basic pump maintenance, water testing, and financial bookkeeping. The community sets a nominal usage fee to fund future repairs, ensuring the project remains self-sustaining for decades."
      ]
    },
    {
      id: "2",
      img: "/src/assets/images/story-3.webp",
      tag: "Education",
      date: "Sep 15, 2023",
      title: "Empowering the Next Generation: Girls' Education Program Expands",
      desc: "Breaking down barriers to education through targeted scholarships and safe school infrastructure.",
      author: "Elena Rostova, Education Program Coordinator",
      readTime: "6 min read",
      content: [
        "Educating a girl doesn't just transform her life; it uplifts her entire family and community. Unfortunately, financial constraints and lack of secure facilities keep millions of young girls out of secondary school globally. GSSIF's 'Empowering Girls through Education' initiative has expanded its reach, adding 500 new academic scholarships and building safe dormitory spaces in three target districts.",
        "The program covers tuition fees, textbooks, school uniforms, and safe transportation. In addition, GSSIF has funded the construction of dedicated sanitation blocks in schools, which is a major factor in reducing absenteeism among adolescent girls. Mentorship circles and leadership workshops are also held monthly, pairing students with female professionals."
      ]
    },
    {
      id: "3",
      img: "/src/assets/images/campaign.webp",
      tag: "Agriculture",
      date: "Aug 30, 2023",
      title: "Building Climate-Resilient Farms",
      desc: "Training local farmers in sustainable techniques to ensure long-term food security against changing weather patterns.",
      author: "Marcus Thorne, Sustainable Agriculture Advisor",
      readTime: "5 min read",
      content: [
        "Smallholder farmers are on the front lines of climate change. Unpredictable rainfall patterns, soil degradation, and rising temperatures threaten food security and livelihoods. GSSIF's Sustainable Agriculture Program is actively training farming collectives in climate-resilient techniques, promoting bio-diverse crop rotation, water conservation, and natural pest control.",
        "We supply participating farmers with drought-tolerant seed varieties, organic compost, and drip-irrigation kits. Through interactive demonstration farms, agricultural specialists teach conservation tillage and agroforestry—planting trees alongside crops to retain soil moisture and prevent erosion. This holistic approach restores soil fertility while dramatically reducing dependency on costly synthetic chemicals."
      ]
    },
    {
      id: "4",
      img: "/src/assets/images/story-disaster-relief.webp",
      tag: "Disaster Relief",
      date: "Aug 12, 2023",
      title: "Rapid Response in the Wake of Tropical Cyclone",
      desc: "Our emergency teams deployed within 24 hours to provide shelter, food, and medical aid to affected regions.",
      author: "Sarah Jenkins, Emergency Response Team Lead",
      readTime: "7 min read",
      content: [
        "When a severe tropical cyclone struck the coastal regions last month, immediate action was critical to prevent secondary health disasters. Within 24 hours of landfall, GSSIF's Emergency Response Teams were on the ground, coordinating relief efforts with local emergency services and supplying immediate survival packets to affected families.",
        "GSSIF deployed temporary shelter kits, clean drinking water purification tablets, and mobile emergency medical stations. Over the first week, we distributed over 10,000 food rations and secured temporary housing for displaced individuals. Our medical staff worked around the clock, treating injuries and administering preventative care against potential water-borne disease outbreaks.",
        "As the emergency phase transitions to long-term rehabilitation, GSSIF remains committed to helping the community rebuild. We are launching a structural support program to reconstruct storm-damaged schools and clinics using wind-resistant designs."
      ]
    },
    {
      id: "5",
      img: "/src/assets/images/volunteer-action.webp",
      tag: "Human Rights",
      date: "Jul 22, 2023",
      title: "Protecting Vulnerable Populations in Conflict Zones",
      desc: "Establishing safe havens and providing legal advocacy for displaced individuals.",
      author: "Jean-Pierre Dupont, Human Rights Advocate",
      readTime: "6 min read",
      content: [
        "In regions torn apart by conflict, the protection of fundamental human rights is of paramount concern. Displaced families, minor children, and marginalized groups are often left without legal representation or secure refuge. GSSIF has partnered with local legal networks to establish Safe Havens and legal aid centers near transit routes and displacement camps.",
        "Our legal advocates assist displaced persons in recovering identity documents, securing housing rights, and obtaining asylum or legal status. Concurrently, GSSIF runs trauma-informed counseling centers for children and survivors of gender-based violence, offering a safe environment to heal and access support systems."
      ]
    }
  ],
  news: [
    {
      id: "0",
      title: "GSSIF announces $50M expansion to clean energy initiatives across Sub-Saharan Africa",
      img: "/src/assets/images/news_1.webp",
      date: "Oct 12, 2024"
    },
    {
      id: "1",
      title: "New partnership with global health organizations to deliver 1M vaccines",
      img: "/src/assets/images/news_2.webp",
      date: "Oct 05, 2024"
    },
    {
      id: "2",
      title: "Annual Sustainability Summit concludes with historic climate pledge from 20 nations",
      img: "/src/assets/images/news_3.webp",
      date: "Sep 28, 2024"
    }
  ],
  events: [
    {
      id: "0",
      date: "15",
      month: "NOV",
      title: "Global Health Symposium 2024",
      loc: "Geneva, Switzerland & Virtual",
      desc: "Annual gathering of healthcare professionals and policymakers discussing equitable health access."
    },
    {
      id: "1",
      date: "02",
      month: "DEC",
      title: "Community Climate Action Workshop",
      loc: "Nairobi, Kenya",
      desc: "Hands-on workshop for local leaders focusing on sustainable agriculture and water management."
    },
    {
      id: "2",
      date: "18",
      month: "JAN",
      title: "Human Rights Defender Training",
      loc: "Virtual",
      desc: "Comprehensive training session on legal frameworks and advocacy strategies for grassroots organizers."
    }
  ],
  opportunities: [
    {
      id: "0",
      title: "Local Advocacy Coordinator",
      type: "Remote / Community-Based",
      commitment: "5-10 hours/week",
      desc: "Organize local campaigns, manage regional outreach events, and raise awareness on critical climate and sustainability initiatives."
    },
    {
      id: "1",
      title: "Clean Water Project Assistant",
      type: "On-site (Sub-Saharan Africa / Asia)",
      commitment: "2-4 weeks (Field deployment)",
      desc: "Assist our engineering teams on the ground with mapping water points, conducting local sanitation workshops, and distributing supplies."
    },
    {
      id: "2",
      title: "Crisis Relief Logistics volunteer",
      type: "On-site or Remote Support",
      commitment: "On-call / Emergency-based",
      desc: "Help coordinate supply lines, translate community requests, or support distribution centers in the wake of humanitarian crises."
    },
    {
      id: "3",
      title: "Youth Mentor & Education Helper",
      type: "Hybrid / Remote Sessions",
      commitment: "2-4 hours/week",
      desc: "Provide academic tutoring or career mentorship to young girls enrolled in our global education scholarship programs."
    }
  ],
  positions: [
    {
      id: "0",
      title: "Senior Health Policy Advisor",
      category: "Health",
      location: "Geneva, Switzerland",
      type: "Full-Time",
      desc: "Lead GSSIF's engagement with global health bodies, coordinate vaccination programs, and design scalable primary health policies for rural centers."
    },
    {
      id: "1",
      title: "Climate Change Adaptation Specialist",
      category: "Climate",
      location: "Nairobi, Kenya",
      type: "Full-Time",
      desc: "Implement sustainable agriculture systems, oversee agroforestry projects, and help local farmers implement climate-resilient practices."
    },
    {
      id: "2",
      title: "Emergency Operations Manager",
      category: "Operations",
      location: "Bangkok, Thailand",
      type: "Full-Time",
      desc: "Coordinate rapid-response logistics in natural disaster and conflict zones. Manage distribution pipelines and field response personnel."
    },
    {
      id: "3",
      title: "Sustainable Grants Coordinator",
      category: "Operations",
      location: "Remote / Geneva",
      type: "Contract",
      desc: "Oversee grant applications, monitor budget distributions for global water projects, and ensure reporting compliance with donor agencies."
    },
    {
      id: "4",
      title: "Director of Girls' Education Programs",
      category: "Operations",
      location: "New York, USA",
      type: "Full-Time",
      desc: "Steer GSSIF's global education initiatives, grow scholarship fund portfolios, and coordinate local school construction guidelines."
    }
  ],
  partners: []
};

// Initialize file-based DB if not existing
const dataDir = path.dirname(DB_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), "utf8");
}

export function getData(): DbData {
  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    return defaultData;
  }
}

export function saveData(data: DbData): void {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
}

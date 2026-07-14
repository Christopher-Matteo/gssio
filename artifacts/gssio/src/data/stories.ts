import storyMobileClinic from "../assets/images/story-mobile-clinic.webp";
import storyCleanWater from "../assets/images/story-clean-water.webp";
import story3 from "../assets/images/story-3.webp";
import campaign from "../assets/images/campaign.webp";
import storyDisasterRelief from "../assets/images/story-disaster-relief.webp";
import volunteerAction from "../assets/images/volunteer-action.webp";

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

export const storiesData: Story[] = [
  {
    id: "0",
    img: storyMobileClinic,
    tag: "Health",
    date: "Oct 12, 2023",
    title: "New Mobile Clinics Reach Remote Villages in Sub-Saharan Africa",
    desc: "How a fleet of fully-equipped medical vehicles is changing the landscape of rural healthcare access.",
    author: "Dr. Amara Okoro, Director of Rural Health Operations",
    readTime: "5 min read",
    content: [
      "In many rural regions of Sub-Saharan Africa, accessing basic healthcare requires traveling dozens of miles on foot. For pregnant women, young children, and those with chronic conditions, this distance is often a barrier between life and death. To address this crisis, GSSIO launched its new Mobile Health Clinic initiative, deploying a fleet of custom-retrofitted off-road medical vehicles.",
      "Each mobile clinic is staffed by a dedicated team of nurses, general practitioners, and a pharmacist. Equipped with solar-powered refrigerators for vaccine storage, rapid diagnostic testing kits, and essential medications, these units can diagnose and treat the most common illnesses on the spot. From maternal checkups to malaria treatments and immunization campaigns, the clinics provide comprehensive primary care right at the village square.",
      "Since deployment last month, the clinics have visited over 40 remote settlements, treating more than 3,500 patients. 'For the first time, our children are getting their vaccinations without us having to sacrifice a full day's work and walk through rough terrain,' says Miriam, a resident of a clinic-visited village. Plans are already underway to expand the fleet and recruit more volunteer healthcare professionals to meet the overwhelming demand."
    ]
  },
  {
    id: "1",
    img: storyCleanWater,
    tag: "Water",
    date: "Sep 28, 2023",
    title: "Clean Water Initiative Brings Hope to 50,000 Families",
    desc: "A new community-managed well system provides sustainable, clean drinking water to previously drought-stricken areas.",
    author: "David Vance, Lead Hydrologist",
    readTime: "4 min read",
    content: [
      "Clean water is the foundation of community development. Without it, health, education, and economic stability are impossible to sustain. In response to prolonged droughts affecting regional farming communities, GSSIO's Clean Water Initiative has successfully engineered and completed 15 community-managed deep borewell systems, delivering potable water to over 50,000 families.",
      "Rather than simply digging wells and leaving, GSSIO's team works with local residents to establish 'Water Committees'. These committees, consisting of equal numbers of men and women, are trained in basic pump maintenance, water testing, and financial bookkeeping. The community sets a nominal usage fee to fund future repairs, ensuring the project remains self-sustaining for decades.",
      "The impact has been immediate. Incidences of water-borne diseases like cholera and dysentery have plummeted by over 80%. Furthermore, school attendance among girls has risen dramatically, as they no longer have to spend their mornings fetching water from distant, contaminated streams. This project exemplifies how sustainable infrastructure empowers local communities to secure their own future."
    ]
  },
  {
    id: "2",
    img: story3,
    tag: "Education",
    date: "Sep 15, 2023",
    title: "Empowering the Next Generation: Girls' Education Program Expands",
    desc: "Breaking down barriers to education through targeted scholarships and safe school infrastructure.",
    author: "Elena Rostova, Education Program Coordinator",
    readTime: "6 min read",
    content: [
      "Educating a girl doesn't just transform her life; it uplifts her entire family and community. Unfortunately, financial constraints and lack of secure facilities keep millions of young girls out of secondary school globally. GSSIO's 'Empowering Girls through Education' initiative has expanded its reach, adding 500 new academic scholarships and building safe dormitory spaces in three target districts.",
      "The program covers tuition fees, textbooks, school uniforms, and safe transportation. In addition, GSSIO has funded the construction of dedicated sanitation blocks in schools, which is a major factor in reducing absenteeism among adolescent girls. Mentorship circles and leadership workshops are also held monthly, pairing students with female professionals in fields like medicine, engineering, and public administration.",
      "Over 95% of the girls enrolled in our scholarship program have successfully graduated to higher education or vocational tracks. 'My dream is to become a pediatrician and return to work in my village,' says Aamina, a scholarship recipient. By investing in their education, we are building a foundation of leadership that will inspire generations to come."
    ]
  },
  {
    id: "3",
    img: campaign,
    tag: "Agriculture",
    date: "Aug 30, 2023",
    title: "Building Climate-Resilient Farms",
    desc: "Training local farmers in sustainable techniques to ensure long-term food security against changing weather patterns.",
    author: "Marcus Thorne, Sustainable Agriculture Advisor",
    readTime: "5 min read",
    content: [
      "Smallholder farmers are on the front lines of climate change. Unpredictable rainfall patterns, soil degradation, and rising temperatures threaten food security and livelihoods. GSSIO's Sustainable Agriculture Program is actively training farming collectives in climate-resilient techniques, promoting bio-diverse crop rotation, water conservation, and natural pest control.",
      "We supply participating farmers with drought-tolerant seed varieties, organic compost, and drip-irrigation kits. Through interactive demonstration farms, agricultural specialists teach conservation tillage and agroforestry—planting trees alongside crops to retain soil moisture and prevent erosion. This holistic approach restores soil fertility while dramatically reducing dependency on costly synthetic chemicals.",
      "To date, the program has trained over 8,000 farmers. Participants report crop yield increases of up to 45% despite erratic rainfall seasons. By diversifying crops, families have not only improved their nutritional intake but have also created secondary income streams by selling surplus vegetables at local markets."
    ]
  },
  {
    id: "4",
    img: storyDisasterRelief,
    tag: "Disaster Relief",
    date: "Aug 12, 2023",
    title: "Rapid Response in the Wake of Tropical Cyclone",
    desc: "Our emergency teams deployed within 24 hours to provide shelter, food, and medical aid to affected regions.",
    author: "Sarah Jenkins, Emergency Response Team Lead",
    readTime: "7 min read",
    content: [
      "When a severe tropical cyclone struck the coastal regions last month, immediate action was critical to prevent secondary health disasters. Within 24 hours of landfall, GSSIO's Emergency Response Teams were on the ground, coordinating relief efforts with local emergency services and supplying immediate survival packets to affected families.",
      "GSSIO deployed temporary shelter kits, clean drinking water purification tablets, and mobile emergency medical stations. Over the first week, we distributed over 10,000 food rations and secured temporary housing for displaced individuals. Our medical staff worked around the clock, treating injuries and administering preventative care against potential water-borne disease outbreaks.",
      "As the emergency phase transitions to long-term rehabilitation, GSSIO remains committed to helping the community rebuild. We are launching a structural support program to reconstruct storm-damaged schools and clinics using wind-resistant designs, ensuring the community is better prepared to withstand future climate disruptions."
    ]
  },
  {
    id: "5",
    img: volunteerAction,
    tag: "Human Rights",
    date: "Jul 22, 2023",
    title: "Protecting Vulnerable Populations in Conflict Zones",
    desc: "Establishing safe havens and providing legal advocacy for displaced individuals.",
    author: "Jean-Pierre Dupont, Human Rights Advocate",
    readTime: "6 min read",
    content: [
      "In regions torn apart by conflict, the protection of fundamental human rights is of paramount concern. Displaced families, minor children, and marginalized groups are often left without legal representation or secure refuge. GSSIO has partnered with local legal networks to establish Safe Havens and legal aid centers near transit routes and displacement camps.",
      "Our legal advocates assist displaced persons in recovering identity documents, securing housing rights, and obtaining asylum or legal status. Concurrently, GSSIO runs trauma-informed counseling centers for children and survivors of gender-based violence, offering a safe environment to heal and access support systems.",
      "By working closely with local communities and international monitoring agencies, we also document human rights violations and advocate for policy-level protections. Building a culture of rights and safety in active crisis zones is long and arduous work, but it is essential to pave the way for eventual peace and sustainable reconstruction."
    ]
  }
];

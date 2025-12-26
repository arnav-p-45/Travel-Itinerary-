
import { Currency } from './types';

export const THEMES = [
  { id: 'beach', label: 'Beach & Relaxation', icon: '🏖️' },
  { id: 'adventure', label: 'Adventure & Trekking', icon: '🏔️' },
  { id: 'culture', label: 'Cultural Heritage', icon: '🏛️' },
  { id: 'food', label: 'Food & Culinary', icon: '🍜' },
  { id: 'luxury', label: 'Luxury Experience', icon: '💎' },
  { id: 'solo', label: 'Solo Traveler', icon: '🚶' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'art', label: 'Art & Museums', icon: '🎨' },
  { id: 'wildlife', label: 'Wildlife Safari', icon: '🐘' },
  { id: 'winter', label: 'Winter Sports', icon: '⛷️' },
  { id: 'romance', label: 'Romantic Getaway', icon: '💑' },
  { id: 'family', label: 'Family Friendly', icon: '👨‍👩‍👧‍👦' },
  { id: 'eco', label: 'Eco-Tourism', icon: '🌿' },
  { id: 'cruise', label: 'Cruise & Sailing', icon: '🛳️' },
  { id: 'wellness', label: 'Wellness & Spa', icon: '🧘' },
  { id: 'nightlife', label: 'Party & Nightlife', icon: '🎉' },
  { id: 'photography', label: 'Photography', icon: '📷' },
  { id: 'sports', label: 'Active Sports', icon: '🚴' },
];

export const CURRENCIES: Currency[] = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
];

export const COUNTRIES = [
  "India", "United States", "United Kingdom", "France", "Japan", "Australia", 
  "Germany", "Italy", "Spain", "Canada", "Brazil", "South Africa", "Thailand",
  "Singapore", "United Arab Emirates", "Switzerland", "Netherlands", "Norway",
  "Mexico", "China", "New Zealand", "Portugal", "Greece", "Turkey", "Vietnam"
].sort();

export const GEODATA: Record<string, Record<string, string[]>> = {
  "India": {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Tirupati", "Guntur"],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat"],
    "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Tezpur"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Calangute"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Kullu"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Munnar"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
    "Manipur": ["Imphal", "Churachandpur", "Thoubal"],
    "Meghalaya": ["Shillong", "Tura", "Jowai", "Cherrapunji"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Puri"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Bikaner"],
    "Sikkim": ["Gangtok", "Namchi", "Pelling"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam"],
    "Tripura": ["Agartala", "Udaipur", "Dharmanagar"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Noida"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Rishikesh", "Nainital"],
    "West Bengal": ["Kolkata", "Darjeeling", "Siliguri", "Durgapur"],
    "Andaman and Nicobar": ["Port Blair", "Havelock Island", "Diglipur"],
    "Chandigarh": ["Chandigarh City"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
    "Lakshadweep": ["Kavaratti", "Agatti", "Minicoy"],
    "Delhi": ["New Delhi", "Old Delhi", "Gurgaon Borders", "Noida Borders"],
    "Puducherry": ["Puducherry City", "Karaikal", "Mahe", "Yanam"],
    "Ladakh": ["Leh", "Kargil", "Nubra Valley"],
    "Jammu and Kashmir": ["Srinagar", "Jammu", "Gulmarg", "Pahalgam"]
  },
  "United States": {
    "California": ["San Francisco", "Los Angeles", "San Diego", "Sacramento", "Santa Barbara"],
    "New York": ["New York City", "Albany", "Buffalo", "Rochester", "Syracuse"],
    "Texas": ["Austin", "Houston", "Dallas", "San Antonio", "El Paso"],
    "Florida": ["Miami", "Orlando", "Tampa", "Jacksonville", "Key West"],
    "Washington": ["Seattle", "Spokane", "Tacoma", "Olympia"],
    "Nevada": ["Las Vegas", "Reno", "Carson City"],
    "Illinois": ["Chicago", "Springfield", "Peoria"],
    "Hawaii": ["Honolulu", "Maui", "Kailua-Kona"]
  },
  "United Kingdom": {
    "England": ["London", "Manchester", "Birmingham", "Liverpool", "Bristol", "Oxford"],
    "Scotland": ["Edinburgh", "Glasgow", "Aberdeen", "Inverness", "Dundee"],
    "Wales": ["Cardiff", "Swansea", "Newport", "Bangor"],
    "Northern Ireland": ["Belfast", "Derry", "Lisburn", "Newry"]
  },
  "France": {
    "Île-de-France": ["Paris", "Versailles", "Boulogne-Billancourt", "Saint-Denis"],
    "Provence-Alpes-Côte d'Azur": ["Nice", "Marseille", "Cannes", "Aix-en-Provence", "Antibes"],
    "Auvergne-Rhône-Alpes": ["Lyon", "Grenoble", "Annecy", "Chamonix"],
    "Nouvelle-Aquitaine": ["Bordeaux", "Limoges", "Poitiers", "Biarritz"],
    "Normandy": ["Rouen", "Caen", "Le Havre"]
  },
  "Japan": {
    "Tokyo": ["Shinjuku", "Shibuya", "Ginza", "Akihabara", "Asakusa"],
    "Kyoto": ["Central Kyoto", "Arashiyama", "Gion", "Fushimi"],
    "Osaka": ["Umeda", "Namba", "Tennoji", "Shin-Osaka"],
    "Hokkaido": ["Sapporo", "Hakodate", "Asahikawa", "Otaru"],
    "Okinawa": ["Naha", "Ishigaki", "Miyakojima"]
  },
  "Australia": {
    "New South Wales": ["Sydney", "Newcastle", "Wollongong", "Byron Bay"],
    "Victoria": ["Melbourne", "Geelong", "Ballarat", "Bendigo"],
    "Queensland": ["Brisbane", "Gold Coast", "Cairns", "Sunshine Coast"],
    "Western Australia": ["Perth", "Fremantle", "Broome", "Margaret River"]
  },
  "Canada": {
    "Ontario": ["Toronto", "Ottawa", "Mississauga", "Hamilton", "Niagara Falls"],
    "British Columbia": ["Vancouver", "Victoria", "Kelowna", "Whistler"],
    "Quebec": ["Montreal", "Quebec City", "Laval", "Gatineau"],
    "Alberta": ["Calgary", "Edmonton", "Banff", "Jasper"]
  },
  "Germany": {
    "Bavaria": ["Munich", "Nuremberg", "Augsburg", "Regensburg"],
    "Berlin": ["Berlin City", "Potsdam", "Spandau"],
    "Hamburg": ["Hamburg City", "Altona", "Harburg"],
    "Hesse": ["Frankfurt", "Wiesbaden", "Kassel", "Darmstadt"],
    "North Rhine-Westphalia": ["Cologne", "Dusseldorf", "Dortmund", "Essen"]
  },
  "Italy": {
    "Lazio": ["Rome", "Viterbo", "Latina", "Tivoli"],
    "Tuscany": ["Florence", "Pisa", "Siena", "Lucca"],
    "Lombardy": ["Milan", "Bergamo", "Como", "Brescia"],
    "Veneto": ["Venice", "Verona", "Padua", "Vicenza"],
    "Campania": ["Naples", "Sorrento", "Positano", "Amalfi"]
  },
  "Spain": {
    "Madrid": ["Madrid City", "Alcalá de Henares", "Getafe"],
    "Catalonia": ["Barcelona", "Girona", "Tarragona", "Sitges"],
    "Andalusia": ["Seville", "Malaga", "Granada", "Cordoba"],
    "Valencia": ["Valencia City", "Alicante", "Benidorm"],
    "Balearic Islands": ["Palma", "Ibiza Town", "Mahon"]
  },
  "Brazil": {
    "São Paulo": ["São Paulo City", "Campinas", "Santos", "Guarulhos"],
    "Rio de Janeiro": ["Rio de Janeiro City", "Niterói", "Búzios", "Paraty"],
    "Bahia": ["Salvador", "Porto Seguro", "Ilhéus"],
    "Amazonas": ["Manaus", "Parintins", "Tefé"],
    "Minas Gerais": ["Belo Horizonte", "Ouro Preto", "Tiradentes"]
  },
  "Thailand": {
    "Bangkok": ["Bangkok City", "Nonthaburi"],
    "Chiang Mai": ["Chiang Mai City", "Hang Dong"],
    "Phuket": ["Phuket Town", "Patong", "Karon"],
    "Krabi": ["Krabi Town", "Ao Nang", "Railay"],
    "Surat Thani": ["Koh Samui", "Koh Phangan", "Koh Tao"]
  },
  "United Arab Emirates": {
    "Dubai": ["Dubai City", "Palm Jumeirah", "Downtown Dubai", "Hatta"],
    "Abu Dhabi": ["Abu Dhabi City", "Al Ain", "Yas Island"],
    "Sharjah": ["Sharjah City", "Khor Fakkan", "Kalba"],
    "Ras Al Khaimah": ["Ras Al Khaimah City", "Jebel Jais"]
  },
  "Switzerland": {
    "Zurich": ["Zurich City", "Winterthur", "Uster"],
    "Geneva": ["Geneva City", "Carouge", "Vernier"],
    "Bern": ["Bern City", "Interlaken", "Grindelwald"],
    "Lucerne": ["Lucerne City", "Kriens", "Emmen"],
    "Valais": ["Zermatt", "Sion", "Saas-Fee"]
  },
  "Vietnam": {
    "Hanoi": ["Hanoi City", "Tay Ho", "Hoan Kiem"],
    "Ho Chi Minh": ["Ho Chi Minh City", "District 1", "Thao Dien"],
    "Da Nang": ["Da Nang City", "Hoi An", "My Khe"],
    "Khanh Hoa": ["Nha Trang", "Cam Ranh"],
    "Lao Cai": ["Sapa", "Lao Cai City"]
  },
  "Mexico": {
    "CDMX": ["Mexico City", "Coyoacan", "Polanco"],
    "Quintana Roo": ["Cancun", "Playa del Carmen", "Tulum", "Cozumel"],
    "Jalisco": ["Guadalajara", "Puerto Vallarta", "Tlaquepaque"],
    "Baja California Sur": ["Cabo San Lucas", "San Jose del Cabo", "La Paz"],
    "Yucatan": ["Merida", "Valladolid", "Progreso"]
  },
  "South Africa": {
    "Western Cape": ["Cape Town", "Stellenbosch", "Knysna", "Hermanus"],
    "Gauteng": ["Johannesburg", "Pretoria", "Sandton", "Soweto"],
    "KwaZulu-Natal": ["Durban", "Umhlanga", "Pietermaritzburg"],
    "Mpumalanga": ["Nelspruit", "Hazyview", "White River"]
  },
  "Singapore": {
    "Singapore": ["Marina Bay", "Sentosa", "Chinatown", "Little India", "Orchard Road"]
  },
  "Netherlands": {
    "North Holland": ["Amsterdam", "Haarlem", "Zandvoort", "Alkmaar"],
    "South Holland": ["Rotterdam", "The Hague", "Delft", "Leiden"],
    "Utrecht": ["Utrecht", "Amersfoort", "Zeist"],
    "North Brabant": ["Eindhoven", "Tilburg", "Breda", "Den Bosch"]
  },
  "Norway": {
    "Oslo": ["Oslo City", "Frogner", "Grünerløkka"],
    "Vestland": ["Bergen", "Voss", "Flam", "Stavanger"],
    "Viken": ["Bærum", "Drammen", "Fredrikstad"],
    "Troms og Finnmark": ["Tromsø", "Alta", "Nordkapp"]
  },
  "China": {
    "Beijing": ["Beijing City", "Badaling", "Chaoyang"],
    "Shanghai": ["Shanghai City", "Pudong", "Huangpu"],
    "Guangdong": ["Guangzhou", "Shenzhen", "Foshan", "Zhuhai"],
    "Sichuan": ["Chengdu", "Leshan", "Jiuzhaigou"],
    "Shaanxi": ["Xi'an", "Xianyang", "Weinan"]
  },
  "New Zealand": {
    "Auckland": ["Auckland City", "Waiheke Island", "Manukau"],
    "Wellington": ["Wellington City", "Lower Hutt", "Porirua"],
    "Canterbury": ["Christchurch", "Kaikoura", "Timaru", "Tekapo"],
    "Otago": ["Queenstown", "Dunedin", "Wanaka", "Arrowtown"]
  },
  "Portugal": {
    "Lisbon": ["Lisbon City", "Sintra", "Cascais", "Estoril"],
    "Porto": ["Porto City", "Vila Nova de Gaia", "Matosinhos"],
    "Algarve": ["Faro", "Lagos", "Albufeira", "Portimao"],
    "Madeira": ["Funchal", "Porto Santo", "Machico"]
  },
  "Greece": {
    "Attica": ["Athens", "Piraeus", "Glyfada", "Vouliagmeni"],
    "Central Macedonia": ["Thessaloniki", "Katerini", "Veria"],
    "South Aegean": ["Santorini", "Mykonos", "Rhodes Town", "Naxos"],
    "Crete": ["Heraklion", "Chania", "Rethymno", "Agios Nikolaos"]
  },
  "Turkey": {
    "Istanbul": ["Istanbul City", "Fatih", "Beyoglu", "Kadikoy"],
    "Antalya": ["Antalya City", "Alanya", "Kaş", "Side"],
    "Nevşehir": ["Göreme", "Ürgüp", "Avanos", "Uchisar"],
    "Izmir": ["Izmir City", "Cesme", "Alacati", "Selcuk"]
  }
};

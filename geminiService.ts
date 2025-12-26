
import { GoogleGenAI, Type } from "@google/genai";
import { TravelPreferences, TripItinerary } from './types';

export const generateItinerary = async (prefs: TravelPreferences): Promise<TripItinerary> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Generate a professional, high-fidelity travel itinerary.
    Origin: ${prefs.origin.city}, ${prefs.origin.country}
    Destination: ${prefs.destination.city}, ${prefs.destination.country}
    Budget: ${prefs.budget} ${prefs.currency}
    Duration: ${prefs.durationDays} days
    Themes: ${prefs.themes.join(', ')}
    Travel Party: ${prefs.travelers.adults} Adults, ${prefs.travelers.children} Children, ${prefs.travelers.seniors} Seniors

    STRICT GUIDELINES:
    1. MAKEMYTRIP INTEGRATION: You MUST search makemytrip.com for specific available flights and trains. 
       - For 'realTimePricing.flights' and 'realTimePricing.trains', the 'sourceUrl' field MUST be a valid MakeMyTrip booking link or search link for that specific route.
       - Provide the actual Flight Name/Number (e.g., "Indigo 6E-554") or Train Name in the 'service' field.
    2. PROFESSIONAL TRAVEL TERMINOLOGY: Do NOT use military or mission-based words. Use "Itinerary", "Trip", "Guide", "Logistics", "Highlights".
    3. EXTENSIVE INSIDER KNOWLEDGE: 
       - At least 5 "Secret Spots" (exclusive hidden gems).
       - At least 5 "Tourist Traps to Avoid" (with reasons why they are bad).
       - Photo-specific spots for best lighting.
    4. DIETARY SURVIVAL: Provide detailed translation phrases for common allergies (nuts, dairy, gluten) and "Safe Street Food Protocols".
    5. PRECISE SCHEDULING: Use "HH:MM AM/PM" format. Ensure pacing suits the travel party (adults/seniors/kids).
    6. REAL-TIME PRICING: Include actual estimates for flights, trains, and hotels found via search.

    OUTPUT JSON SCHEMA (Strict Adherence Required):
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          overview: { type: Type.STRING },
          days: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.NUMBER },
                theme: { type: Type.STRING },
                activities: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      time: { type: Type.STRING },
                      title: { type: Type.STRING },
                      description: { type: Type.STRING },
                      cost: { type: Type.NUMBER },
                      location: { type: Type.STRING },
                      tips: { type: Type.STRING },
                      travelTimeBuffer: { type: Type.STRING }
                    },
                    required: ['time', 'title', 'description', 'cost', 'location']
                  }
                }
              },
              required: ['day', 'theme', 'activities']
            }
          },
          packingList: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                item: { type: Type.STRING },
                quantity: { type: Type.STRING },
                essential: { type: Type.BOOLEAN }
              }
            }
          },
          budgetBreakdown: {
            type: Type.OBJECT,
            properties: {
              accommodation: { type: Type.NUMBER },
              food: { type: Type.NUMBER },
              transport: { type: Type.NUMBER },
              activities: { type: Type.NUMBER },
              misc: { type: Type.NUMBER }
            }
          },
          weather: {
            type: Type.OBJECT,
            properties: {
              averageTemp: { type: Type.STRING },
              conditions: { type: Type.STRING },
              advice: { type: Type.STRING }
            }
          },
          realTimePricing: {
            type: Type.OBJECT,
            properties: {
              flights: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { service: { type: Type.STRING }, price: { type: Type.STRING }, sourceUrl: { type: Type.STRING }, lastUpdated: { type: Type.STRING } } } },
              trains: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { service: { type: Type.STRING }, price: { type: Type.STRING }, sourceUrl: { type: Type.STRING }, lastUpdated: { type: Type.STRING } } } },
              hotels: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { service: { type: Type.STRING }, price: { type: Type.STRING }, sourceUrl: { type: Type.STRING }, lastUpdated: { type: Type.STRING } } } }
            }
          },
          localTips: { type: Type.ARRAY, items: { type: Type.STRING } },
          insiderKnowledge: {
            type: Type.OBJECT,
            properties: {
              secretSpots: { type: Type.ARRAY, items: { type: Type.STRING } },
              touristTraps: { type: Type.ARRAY, items: { type: Type.STRING } },
              localSecrets: { type: Type.ARRAY, items: { type: Type.STRING } },
              bestTimeForPhotos: { type: Type.STRING },
              instagrammableSpots: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          },
          visaInfo: {
            type: Type.OBJECT,
            properties: {
              requirement: { type: Type.STRING },
              cost: { type: Type.STRING },
              processingTime: { type: Type.STRING },
              documents: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          },
          paymentAdvice: {
            type: Type.OBJECT,
            properties: {
              method: { type: Type.STRING },
              tipping: { type: Type.STRING },
              currencyTips: { type: Type.STRING }
            }
          },
          connectivity: {
            type: Type.OBJECT,
            properties: {
              simOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
              wifiRating: { type: Type.STRING }
            }
          },
          transportationAdvice: {
            type: Type.OBJECT,
            properties: {
              overall: { type: Type.STRING },
              bestMeans: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { type: { type: Type.STRING }, description: { type: Type.STRING }, costEstimate: { type: Type.STRING } } } }
            }
          },
          dietaryAdvice: {
            type: Type.OBJECT,
            properties: {
              translator: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { phrase: { type: Type.STRING }, translation: { type: Type.STRING } } } },
              warnings: { type: Type.ARRAY, items: { type: Type.STRING } },
              safeStreetFoodProtocols: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          },
          availabilityAlerts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING },
                message: { type: Type.STRING },
                provider: { type: Type.STRING },
                link: { type: Type.STRING }
              }
            }
          },
          etiquette: {
            type: Type.OBJECT,
            properties: {
              dos: { type: Type.ARRAY, items: { type: Type.STRING } },
              donts: { type: Type.ARRAY, items: { type: Type.STRING } },
              dressCode: { type: Type.STRING }
            }
          },
          emergencyContacts: {
            type: Type.OBJECT,
            properties: { police: { type: Type.STRING }, medical: { type: Type.STRING }, embassy: { type: Type.STRING } }
          }
        },
        required: ['title', 'overview', 'days', 'insiderKnowledge', 'dietaryAdvice', 'availabilityAlerts', 'realTimePricing']
      }
    }
  });

  const itineraryData = JSON.parse(response.text.trim());
  
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
    title: chunk.web?.title || 'Source',
    uri: chunk.web?.uri || '#'
  })) || [];

  return { ...itineraryData, groundingSources: sources };
};

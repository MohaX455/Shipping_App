// Types globaux - prêts pour l'intégration API

export interface TravelerDetails {
  first_name?: string;
  image?: string;
  gender?: "male" | "female";
}

export interface TravelItem {
  _id: string;
  fromWhere: string;
  toWhere: string;
  from_state_name?: string;
  to_state_name?: string;
  travel_date: string;
  maxWeight: number;
  created_at: string;
  travelerDetails?: TravelerDetails;
}

export interface FaqItem {
  faq_type: "Sender" | "Traveler";
  title: string;
  descriptions: string;
}

export interface HomePageData {
  banner?: string;
  meta_title?: string;
  meta_descriptions?: string;
}

export interface Property {
  id: { $oid: string };
  selectedCity?: string;
  propertyName?: string;
  propertyArea?: string;
  monthlyRental?: string;
  latitude?: number;
  longtitude?: number;
}

//Response is common

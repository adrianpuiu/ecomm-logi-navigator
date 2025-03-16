
import { useState, useEffect } from "react";
import { ShipmentType } from "@/types/shipment";
import { mockShipment } from "@/data/mockShipment";

export function useFetchShipment(id?: string) {
  const [shipment, setShipment] = useState<ShipmentType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchShipment = async () => {
      try {
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // For demo purposes, we'll use mock data
        if (id) {
          setShipment(mockShipment);
        } else {
          throw new Error("Shipment ID is required");
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        console.error("Error fetching shipment:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShipment();
  }, [id]);

  return { shipment, isLoading, error };
}

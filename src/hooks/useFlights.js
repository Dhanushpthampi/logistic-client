import { useState, useEffect, useCallback } from "react";

export default function useFlights(airport) {
  const [arrivals, setArrivals] = useState([]);
  const [departures, setDepartures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE;

  const fetchFlights = useCallback(async () => {
    if (!airport) return; 
    setLoading(true);
    setError(null);

    try {
      const arrivalsRes = await fetch(`${API_BASE}/api/flights/arrival?airport=${airport}`);
      const departuresRes = await fetch(`${API_BASE}/api/flights/departure?airport=${airport}`);

      if (!arrivalsRes.ok || !departuresRes.ok) {
        throw new Error("Failed to fetch flight data");
      }

      const arrivalsJson = await arrivalsRes.json();
      const departuresJson = await departuresRes.json();

      setArrivals(arrivalsJson.data || []);
      setDepartures(departuresJson.data || []);
    } catch (err) {
      setError(err.message);
      setArrivals([]);
      setDepartures([]);
    } finally {
      setLoading(false);
    }
  }, [airport]); 

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  return { arrivals, departures, loading, error, refetch: fetchFlights };
}

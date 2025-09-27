// hooks/useCoupon.ts
import { useQuery } from "@tanstack/react-query";

/*webhook+controller*/
// const API_BASE_URL = "https://super-green-mern-stack-backend.onrender.com/api/coupon/";
// const API_BASE_URL = "http://localhost:5000/api/coupon/";
/* without webhook, single controller*/
const API_BASE_URL = "https://super-green-mern-stack-backend.onrender.com/api/coupon/instant/";
// const API_BASE_URL = "http://localhost:5000/api/coupon/instant/";

const fetchCoupon = async (paymentId: string): Promise<{ coupon: string }> => {
  const response = await fetch(`${API_BASE_URL}${paymentId}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch coupon");
  }
  
  return await response.json();
};

// export const useCoupon = (paymentId: string | null) => {
//   return useQuery({
//     queryKey: ["coupon", paymentId],
//     queryFn: () => fetchCoupon(paymentId!),
//     enabled: !!paymentId,
//     retry: (failureCount, error) => {
//       // Retry only for "not found" errors
//       if (error.message.includes("not found")) {
//         return failureCount < 3;
//       }
//       return false; // No retry for invalid payments
//     },
//     retryDelay: 3000,
//     staleTime: 0, // Success cached forever
//     gcTime: 0, // Errors cached for 5 minutes only ← ONLY THIS CHANGE!
//   });
// };


export const useCoupon = (paymentId: string | null) => {
  return useQuery({
    queryKey: ["coupon", paymentId],
    queryFn: () => fetchCoupon(paymentId!),
    enabled: !!paymentId,
    retry: (failureCount, error) => {
      if (error.message.includes("not found")) {
        return failureCount < 3;
      }
      return false;
    },
    retryDelay: 3000,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    
    // 🔥 ADD THIS: Force refetch for same query key
    refetchOnMount: true, // Always refetch when component mounts
    refetchOnWindowFocus: false, // Don't refetch on window focus
  });
};
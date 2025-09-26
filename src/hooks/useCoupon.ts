// hooks/useCoupon.ts
import { useQuery } from "@tanstack/react-query";

/*webhook+controller*/
// const API_BASE_URL = "https://super-green-mern-stack-backend.onrender.com/api/coupon/";
// const API_BASE_URL = "http://localhost:5000/api/coupon/";
/* without webhook, single controller*/
const API_BASE_URL = "https://super-green-mern-stack-backend.onrender.com/api/coupon/instant/";
// const API_BASE_URL = "http://localhost:5000/api/coupon/instant/";

const fetchCoupon = async (paymentId: string): Promise<{ coupon: string }> => {
  const response = await fetch(
    `${API_BASE_URL}${paymentId}`
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch coupon");
  }
  return await response.json();
};

export const useCoupon = (paymentId: string | null) => {
  return useQuery({
    queryKey: ["coupon", paymentId],
    queryFn: () => fetchCoupon(paymentId!),
    enabled: !!paymentId,
    retry: (failureCount, error) => {
      // Retry only for 404 errors (payment not yet processed by webhook)
      if (error.message.includes("not found")) {
        return failureCount < 3; // Retry 3 times
      }
      return false; // Don't retry for other errors
    },
    retryDelay: 3000, // Retry every 2 seconds
    staleTime: Infinity, // Coupon doesn't change once assigned
  });
};

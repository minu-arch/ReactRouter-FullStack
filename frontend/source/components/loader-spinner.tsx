import { useEffect, useState } from "react";
import { Navigate } from "react-router";

export function LoaderSpinner() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (!isLoading) {
    return <Navigate to="/welcome" />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full size-32 border-t-2 border-b-2 border-white-900"></div>
      <p className="text-2xl font-bold">Loading...</p>
      <p className="text-sm text-gray-500">This may take a while...</p>
    </div>
  );
}
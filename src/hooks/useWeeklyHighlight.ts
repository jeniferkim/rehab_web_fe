// src/hooks/useWeeklyHighlight.ts
import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { reportApi } from "../apis/reportApi";
import type { WeeklyReportResult } from "../types/apis/report";

export const useWeeklyHighlight = () => {
  const { user } = useAuthStore();

  const [weekly, setWeekly] = useState<WeeklyReportResult | null>(null);
  const [metrics, setMetrics] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.userId) return;

    let cancelled = false;

    const loadWeekly = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await reportApi.getWeeklyHighlight();

        if (cancelled) return;

        setWeekly(result);

        // metrics: "{\"totalExercises\":28,\"avgCompletionRate\":82}" 형태
        try {
          const parsed = JSON.parse(result.metrics) as Record<string, number>;
          setMetrics(parsed);
        } catch (err) {
          console.error("weekly metrics parse error", err);
          setMetrics({});
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setError("주간 하이라이트를 불러오는 중 문제가 생겼어요.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadWeekly();
    return () => {
      cancelled = true;
    };
  }, [user?.userId]);

  return {
    weekly,
    metrics,
    isLoading,
    error,
  };
};

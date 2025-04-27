import ICourse from "@/types/courses";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CourseStore = {
  course: ICourse | null;
  setCourseId: (course: ICourse | null) => void;
  clearCourseId: () => void;
};

export const useCourseStore = create<CourseStore>()(
  persist(
    (set) => ({
      course: null,
      setCourseId: (value) => set({ course: value }),
      clearCourseId: () => set({ course: null }),
    }),
    {
      name: "course-storage", // localStorage key
    }
  )
);

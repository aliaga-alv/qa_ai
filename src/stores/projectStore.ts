/**
 * Project Store
 * Manages currently selected project in dashboard
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Project } from '@/types/models';

interface ProjectStore {
  // State
  selectedProject: Project | null;
  
  // Actions
  setSelectedProject: (project: Project | null) => void;
  clearSelectedProject: () => void;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      // Initial state
      selectedProject: null,

      // Actions
      setSelectedProject: (project) => set({ selectedProject: project }),
      clearSelectedProject: () => set({ selectedProject: null }),
    }),
    {
      name: 'project-storage', // localStorage key
    }
  )
);

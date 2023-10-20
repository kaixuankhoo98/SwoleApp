'use client'

import Main from '@/components/Main';
import NewWorkoutSection from '@/components/NewWorkoutSection';
import workoutData from './data';

export default function NewWorkout() {
  
  return (
    <Main>
      <NewWorkoutSection data={workoutData} />
    </Main>
  );
}
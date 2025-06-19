import { FC, useState } from "react";
import Button from "../../../shared/components/Button";
import { ExerciseModal } from "./ExerciseModal";

export const AddExerciseButton: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Add Exercise</Button>
      {isModalOpen && <ExerciseModal onClose={() => setIsModalOpen(false)} />}
    </>
  )
}
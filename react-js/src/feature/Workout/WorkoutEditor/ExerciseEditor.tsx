import { Accordion, AccordionSummary, Typography } from "@mui/material";
import { FC } from "react";
import Button from "../../../shared/components/Button";

export const ExerciseEditor: FC = () => {
  
  return (
    <>
      <Button>Add Exercise</Button>
      <Accordion>
        <AccordionSummary>
          <Typography>Exercise</Typography>
        </AccordionSummary>
      </Accordion>
    </>
  );
};


import { FC, ReactNode } from 'react';
import { 
  Accordion as MuiAccordion, 
  AccordionSummary as MuiAccordionSummary, 
  AccordionDetails as MuiAccordionDetails,
  Stack,
  Divider
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

interface AccordionProps {
  title: ReactNode;
  children: ReactNode;
  defaultExpanded?: boolean;
}

export const Accordion: FC<AccordionProps> = ({ title, children, defaultExpanded }) => {
  return (
    <MuiAccordion defaultExpanded={defaultExpanded}>
      <MuiAccordionSummary
        expandIcon={<ExpandMore />}
        sx={{
          '& .MuiAccordionSummary-expandIconWrapper': {
            transition: 'transform 0.2s'
          }
        }}
      >
        <Stack direction="row" alignItems="center">
          {title}
        </Stack>
      </MuiAccordionSummary>
      <Divider />
      <MuiAccordionDetails>
        {children}
      </MuiAccordionDetails>
    </MuiAccordion>
  );
}; 
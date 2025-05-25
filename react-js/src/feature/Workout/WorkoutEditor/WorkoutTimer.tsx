import { FC } from 'react';
import { Typography, Paper, useTheme } from '@mui/material';
import { useStopwatch } from 'react-timer-hook';

interface WorkoutTimerProps {
  offset: Date;
}

export const WorkoutTimer: FC<WorkoutTimerProps> = ({ offset }) => {
  const {
    days,
    hours,
    minutes,
    seconds,
  } = useStopwatch({ 
    autoStart: true,
    offsetTimestamp: offset
  });

  const theme = useTheme();

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 1.5, 
        backgroundColor: theme.palette.background.default, 
        color: theme.palette.text.primary,
        borderRadius: 2,
        width: '15rem',
        textAlign: 'center'
      }}
    >
      <Typography variant="h6" fontWeight="bold" fontFamily="monospace">
        {days > 0 ? `${days.toString().padStart(2, '0')}:` : ''}{hours.toString().padStart(2, '0')}:{minutes
          .toString()
          .padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </Typography>
    </Paper>
  );
}; 
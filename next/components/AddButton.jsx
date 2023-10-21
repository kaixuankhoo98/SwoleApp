import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function AddButton({ text }) {
  
  return (
    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ width: '200px', padding: '12px' }}
        className='button'
      >
        {text}
      </Button>
    </div>
  );
}
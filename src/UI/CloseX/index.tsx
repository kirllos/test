import Box from '@mui/material/Box';
import closeModal from '../../assets/icons/x-button.png';
import s from './CloseX.module.scss';

const CloseX = () => {
  return (
    <Box className={s.container}>
      <img className={s.image} src={closeModal} alt="close modal" />
    </Box>
  );
};

export default CloseX;

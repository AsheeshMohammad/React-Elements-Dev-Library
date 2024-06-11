import { Box, Button, Grid, MenuItem, Typography, styled } from '@mui/material';
import Container from '@mui/material/Container';
import { DatePicker } from '@mui/x-date-pickers';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';

export const FormComponent = styled(Grid)(({ theme }) => ({
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  }
}));
export const FormContainer = styled(Box)(({ theme }) => ({
  margin: '5px 0px',
  fontSize: '11px',
  backgroundColor: '#ffff',
  padding: '0.5em',
  border: '0px solid rgba(0, 0, 0, 0.125)',
  boxShadow: '0 1px 15px rgba(0,0,0,.04), 0 1px 6px rgba(0,0,0,.04)',
  borderRadius: '0.75rem'
}));
export const Formitem = styled(Grid, {
  shouldForwardProp: prop => prop !== 'isActive' && prop !== 'noOfColumn'
})<any>(({ theme, noOfColumn }) => ({
  width: `calc(100%/${noOfColumn})`,
  flexDirection: 'column',
  paddingLeft: '15px',
  paddingRight: '15px',
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));
export const ErrorMessageComponent = styled(Box)(() => ({
  color: 'red',
  marginTop: '4px',
  fontSize: '11px',
  fontWeight: 500
}));

export const ContainerComponent = styled(Container)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    padding: '16px 24px'
  },
  [theme.breakpoints.up('lg')]: {
    paddingLeft: '30px',
    paddingRight: '30px'
  }
}));

export const SaveButton = styled(Button)(() => ({
  color: '#fff',
  backgroundColor: '#00acc1',
  BorderColor: '#00acc1'
}));

export const BackButton = styled(Button)(() => ({
  color: '#fff',
  backgroundColor: ' #343a40',
  borderColor: '#343a40'
}));
export const LabelComponent = styled(Grid)(() => ({
  alignItems: 'start',
  gap: '1px'
}));
export const ImportantMark = styled('text')(() => ({
  color: 'red'
}));

export const FormWrapper = styled(Box)(() => ({
  margin: '5px 0px',
  backgroundColor: '#ffff',
  paddingBlock: '0.5em',
  border: '0px solid rgba(0, 0, 0, 0.125)',
  boxShadow: '0 1px 15px rgba(0,0,0,.04), 0 1px 6px rgba(0,0,0,.04)',
  borderRadius: '0.75rem',
  overflow: 'hidden',
  fontSize: '11px'
}));

export const DatepickerBox = styled(DatePicker)(() => ({
  '& .MuiInputBase-input': {
    padding: '6.38px 14px'
  }
}));
export const OptionRender = styled(MenuItem)(() => ({
  fontSize:'11px',
}));
export const OptionsBox = styled(Box)(() => ({
  maxHeight:'120px',
  overflow:'auto',
  position:'absolute',
  top:'100%',
  background:'#fff',
  zIndex:1000,
  border:'1px solid #0001',
}));
export const Options = styled(Typography)(() => ({
  fontSize:'13px',
  background:'#fff',
  padding:'5px 13px',
  zIndex:1000,
  "&:hover": {
    backgroundColor:'#0001',
    cursor:'pointer'
  },
}));
export const ArrowDown = styled(ArrowDropDownSharpIcon)(() => ({
  fontSize:'25px',
  position:'absolute',
  right:0,
  color:'#0009'
}));

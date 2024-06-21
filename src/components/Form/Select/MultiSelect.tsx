// import { useState, useMemo, useRef, useEffect } from 'react';
// import {
//   Select,
//   MenuItem,
//   ListSubheader,
//   TextField,
//   InputAdornment,
//   Checkbox,
//   ListItemText,
//   Button
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

// const containsText = (text: string, searchText: string) => text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

// const MultiSelect: React.FC<{ options: any; fields: any; setValues: any }> = ({ options, fields, setValues }) => {
//   const textfieldRef = useRef<HTMLInputElement | null>(null);
//   const [searchText, setSearchText] = useState('');
//   const [isSelectedAll, setIsSelectedAll] = useState(false);

//   const displayedOptions = useMemo(
//     () => options?.filter(option => containsText(option.name, searchText)),
//     [options, searchText]
//   );

//   // const handleSelectAllClick = () => {
//   //   if (isSelectedAll) {
//   //     setValues(fields.name, []);
//   //     setIsSelectedAll(false);
//   //   } else {
//   //     const allOptions = options.map(option => `${option.id},${option.name}`);
//   //     setValues(fields.name, allOptions, { shouldValidate: true });
//   //     setIsSelectedAll(true);
//   //   }
//   // };
//   const handleSelectAllClick = () => {
//     if (isSelectedAll) {
//       setValues(fields.name, [], { shouldValidate: true });
//       setIsSelectedAll(false);
//     } else {
//       const allOptions = options.map(option => `${option.id},${option.name}`);
//       setValues(fields.name, allOptions, { shouldValidate: true });
//       setIsSelectedAll(true);
//     }
//   };

//   useEffect(() => {
//     // If user had clicked 'select all' then he starts unselecting from below list, then make selectAll - False
//     if (!Array.isArray(fields.value)) {
//       setValues(fields.name, [], { shouldValidate: true });
//     }
//     if (isSelectedAll && options && fields?.value?.length !== options.length) {
//       setIsSelectedAll(false);
//     }

//     if (!isSelectedAll && options && fields?.value?.length !== 0 && fields.value.length === options.length) {
//       setIsSelectedAll(true);
//     }
//   }, [fields?.value, isSelectedAll]);

//   return (
//     <Select
//       multiple
//       displayEmpty
//       MenuProps={{ autoFocus: false }}
//       onOpen={() => {
//         setTimeout(() => {
//           if (textfieldRef.current) {
//             textfieldRef.current.focus();
//           }
//         }, 0);
//       }}
//       onClose={() => setSearchText('')}
//       renderValue={selected => {
//         if (selected && selected.length === 0) {
//           return 'Select';
//         }

//         if (selected) {
//           if (selected?.length > 2) {
//             return selected?.length + ' Selected';
//           } else {
//             return selected?.map(value => value.split(',')[1]).join(', ');
//           }
//         }
//       }}
//       size="small"
//       {...fields}
//     >
//       <ListSubheader>
//         <TextField
//           size="small"
//           inputRef={textfieldRef}
//           placeholder="Type to search..."
//           fullWidth
//           autoFocus
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             )
//           }}
//           onChange={e => setSearchText(e.target.value)}
//           onKeyDown={e => {
//             if (e.key !== 'Escape') {
//               e.stopPropagation();
//             }
//           }}
//         />
//       </ListSubheader>
//       {displayedOptions && displayedOptions.length !== 0 && (
//         <ListSubheader disableSticky sx={{ padding: 0 }} className={isSelectedAll ? 'select-active' : ''}>
//           <Button onClick={handleSelectAllClick}>
//             <Checkbox size="small" checked={isSelectedAll} />
//             <ListItemText primary={'Select All'} />
//           </Button>
//         </ListSubheader>
//       )}
//       {displayedOptions && displayedOptions.length !== 0 ? (
//         displayedOptions.map(option => {
//           return (
//             <MenuItem key={option.id} value={`${option.id},${option.name}`}>
//               <Checkbox size="small" checked={fields?.value.indexOf(`${option.id},${option.name}`) > -1} />
//               <ListItemText primary={option.name} />
//             </MenuItem>
//           );
//         })
//       ) : (
//         <MenuItem disabled={true} key={'NA'} value={'NA'}>
//           No data found
//         </MenuItem>
//       )}
//     </Select>
//   );
// };

// export default MultiSelect;
import React from 'react'

const MultiSelect = () => {
  return (
    <div>MultiSelect</div>
  )
}

export default MultiSelect
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, createTheme, ThemeProvider } from '@mui/material';
import './css/table.css';

function GroupTable({ markers, setGroup }) {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleSelect = (marker) => {
    setSelectedMarker(marker);
    setGroup(marker.groupId);

  };
  const theme = createTheme({
    palette: {
      background: {
        purple: '#3a0ca3'
      }
    }
  });
  return (
    <ThemeProvider theme={theme}>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{color: 'background.purple'}}>
            <TableRow>
              <TableCell >DRIVER</TableCell>
              <TableCell >COORDINATES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {markers.map((marker) => (
              <TableRow
                key={marker.groupId}
                onClick={() => handleSelect(marker)}
                selected={selectedMarker?.groupId === marker.groupId}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{marker.driverName}</TableCell>
                <TableCell>{`(${marker.lat}, ${marker.lng})`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
      </ThemeProvider>
  );
}

export default GroupTable;

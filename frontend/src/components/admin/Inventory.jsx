import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    fetch('http://vps11.alpuca.com:3000/api/product-cards') // Asegúrate de que esta ruta sea correcta
      .then(response => response.json())
      .then(data => setInventory(data))
      .catch(error => console.error('Error fetching inventory:', error));
  }, []);

  const handleToggleList = () => {
    setShowList(!showList);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Inventario Total</Typography>
      <Typography variant="h5" gutterBottom>{inventory.length}</Typography>
      <Button variant="contained" color="primary" onClick={handleToggleList}>
        {showList ? 'Ocultar Lista' : 'Mostrar Lista'}
      </Button>
      {showList && (
        <Box sx={{ marginTop: 2 }}>
          {inventory.map((item, index) => (
            <Typography key={index}>
              {item.title} - S: {item.S}, M: {item.M}, L: {item.L}, XL: {item.XL}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Inventory;

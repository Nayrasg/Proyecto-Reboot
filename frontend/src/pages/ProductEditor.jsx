import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl, Box, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import allProducts from '../data/products';

// Validación con Yup
const validationSchema = yup.object({
    title: yup.string().required('El título es obligatorio'),
    description: yup.string().required('La descripción es obligatoria'),
    price: yup.number().required('El precio es obligatorio').positive('El precio debe ser positivo'),
    location: yup.string().required('La ubicación es obligatoria'),
    tejido: yup.string().required('El tejido es obligatorio'),
    unitsS: yup.number().required('La cantidad es obligatoria').min(0, 'Debe ser al menos 0'),
    unitsM: yup.number().required('La cantidad es obligatoria').min(0, 'Debe ser al menos 0'),
    unitsL: yup.number().required('La cantidad es obligatoria').min(0, 'Debe ser al menos 0'),
    unitsXL: yup.number().required('La cantidad es obligatoria').min(0, 'Debe ser al menos 0'),
});

const ProductEditor = () => {
    const [image, setImage] = useState(null);
    const [products, setProducts] = useState(allProducts);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        formik.setValues({
            title: product.title,
            description: product.description,
            price: product.price,
            location: product.location,
            tejido: product.tejido,
            unitsS: product.stock.S,
            unitsM: product.stock.M,
            unitsL: product.stock.L,
            unitsXL: product.stock.XL,
        });
        setImage(product.image);
    };

    const handleDeleteProduct = (productId) => {
        setProducts((prevProducts) => {
            const updatedProducts = { ...prevProducts };
            for (const category in updatedProducts) {
                updatedProducts[category] = updatedProducts[category].filter((product) => product.id !== productId);
            }
            return updatedProducts;
        });
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: '',
            location: '',
            tejido: '',
            unitsS: 0,
            unitsM: 0,
            unitsL: 0,
            unitsXL: 0,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const updatedProduct = {
                ...values,
                id: editingProduct ? editingProduct.id : Date.now(),
                image: image,
                stock: {
                    S: values.unitsS,
                    M: values.unitsM,
                    L: values.unitsL,
                    XL: values.unitsXL,
                },
            };

            setProducts((prevProducts) => {
                const updatedProducts = { ...prevProducts };
                if (editingProduct) {
                    // Update existing product
                    for (const category in updatedProducts) {
                        updatedProducts[category] = updatedProducts[category].map((product) =>
                            product.id === editingProduct.id ? updatedProduct : product
                        );
                    }
                } else {
                    // Add new product
                    updatedProducts[values.location].push(updatedProduct);
                }
                return updatedProducts;
            });

            setEditingProduct(null);
            formik.resetForm();
            setImage(null);
        },
    });

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    return (
        <>
            <Navbar />
            <CartDrawer />
            <Container component="main" maxWidth="md" sx={{ marginTop: 12, marginBottom: 12, pb: 8 }}>
                <Typography component="h1" variant="h5" align="center" gutterBottom>
                    Editor de productos
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button variant="contained" component="label">
                                Cargar foto
                                <input type="file" hidden onChange={handleImageChange} />
                            </Button>
                            {image && (
                                <Box mt={2}>
                                    <img src={image} alt="Producto" style={{ maxWidth: '100%' }} />
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="title"
                                name="title"
                                label="Título"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="description"
                                name="description"
                                label="Descripción del producto"
                                multiline
                                rows={4}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="price"
                                name="price"
                                label="Precio"
                                type="number"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                error={formik.touched.price && Boolean(formik.errors.price)}
                                helperText={formik.touched.price && formik.errors.price}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="tejido"
                                name="tejido"
                                label="Tejido"
                                value={formik.values.tejido}
                                onChange={formik.handleChange}
                                error={formik.touched.tejido && Boolean(formik.errors.tejido)}
                                helperText={formik.touched.tejido && formik.errors.tejido}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="location-label">Ubicación</InputLabel>
                                <Select
                                    labelId="location-label"
                                    id="location"
                                    name="location"
                                    value={formik.values.location}
                                    onChange={formik.handleChange}
                                    error={formik.touched.location && Boolean(formik.errors.location)}
                                >
                                    <MenuItem value="destacados">Destacados</MenuItem>
                                    <MenuItem value="nuevas">Nuevas</MenuItem>
                                    <MenuItem value="populares">Populares</MenuItem>
                                    <MenuItem value="ofertas">Ofertas</MenuItem>
                                </Select>
                                {formik.touched.location && formik.errors.location && (
                                    <Typography color="error">{formik.errors.location}</Typography>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                id="unitsS"
                                name="unitsS"
                                label="Unidades S"
                                type="number"
                                value={formik.values.unitsS}
                                onChange={formik.handleChange}
                                error={formik.touched.unitsS && Boolean(formik.errors.unitsS)}
                                helperText={formik.touched.unitsS && formik.errors.unitsS}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                id="unitsM"
                                name="unitsM"
                                label="Unidades M"
                                type="number"
                                value={formik.values.unitsM}
                                onChange={formik.handleChange}
                                error={formik.touched.unitsM && Boolean(formik.errors.unitsM)}
                                helperText={formik.touched.unitsM && formik.errors.unitsM}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                id="unitsL"
                                name="unitsL"
                                label="Unidades L"
                                type="number"
                                value={formik.values.unitsL}
                                onChange={formik.handleChange}
                                error={formik.touched.unitsL && Boolean(formik.errors.unitsL)}
                                helperText={formik.touched.unitsL && formik.errors.unitsL}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                id="unitsXL"
                                name="unitsXL"
                                label="Unidades XL"
                                type="number"
                                value={formik.values.unitsXL}
                                onChange={formik.handleChange}
                                error={formik.touched.unitsXL && Boolean(formik.errors.unitsXL)}
                                helperText={formik.touched.unitsXL && formik.errors.unitsXL}
                            />
                        </Grid>
                    </Grid>
                    <Box mt={3} display="flex" justifyContent="space-between">
                        <Button color="primary" variant="contained" type="submit">
                            {editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}
                        </Button>
                        {editingProduct && (
                            <Button color="secondary" variant="contained" onClick={() => handleDeleteProduct(editingProduct.id)}>
                                Eliminar
                            </Button>
                        )}
                    </Box>
                </form>
                <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                    Todos los productos
                </Typography>
                <Grid container spacing={4}>
                    {Object.values(products).flat().map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={product.image}
                                    alt={product.title}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {product.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.price.toFixed(2)} €
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.description}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                                    <IconButton color="primary" onClick={() => handleEditProduct(product)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => handleDeleteProduct(product.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Footer />
        </>
    );
};

export default ProductEditor;

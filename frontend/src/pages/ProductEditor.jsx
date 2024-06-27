import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Box, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Validación con Yup
const validationSchema = yup.object({
    title: yup.string().required('El título es obligatorio'),
    description: yup.string().required('La descripción es obligatoria'),
    price: yup.number().required('El precio es obligatorio').positive('El precio debe ser positivo'),
    S: yup.number().required('La cantidad es obligatoria').min(0, 'Debe ser al menos 0'),
    M: yup.number().required('La cantidad es obligatoria').min(0, 'Debe ser al menos 0'),
    L: yup.number().required('La cantidad es obligatoria').min(0, 'Debe ser al menos 0'),
    XL: yup.number().required('La cantidad es obligatoria').min(0, 'Debe ser al menos 0'),
});

const ProductEditor = () => {
    const [image, setImage] = useState(null);
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetch('http://vps11.alpuca.com:3000/api/product-cards')
            .then(response => response.json())
            .then(data => setProducts(data.product_cards))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleEditProduct = (product) => {
        console.log(product)
        setEditingProduct(product);
        formik.setValues({
            title: product.title,
            description: product.description,
            price: product.price,
            S: product.S,
            M: product.M,
            L: product.L,
            XL: product.XL,
        });
        setImage(product.image);
    };

    const handleDeleteProduct = (productId) => {
        fetch(`http://vps11.alpuca.com:3000/api/product-cards/${productId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setProducts(prevProducts => prevProducts.filter(product => product.product_id !== productId));
            } else {
                console.error('Error deleting product');
            }
        })
        .catch(error => console.error('Error deleting product:', error));
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: '',
            S: 0,
            M: 0,
            L: 0,
            XL: 0,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const updatedProduct = {
                ...values,
                id: editingProduct ? editingProduct.id : Date.now(),
                image: image,
                S: values.S,
                M: values.M,
                L: values.L,
                XL: values.XL
            }

            const method = editingProduct ? 'PUT' : 'POST';
            const url = editingProduct ? `http://vps11.alpuca.com:3000/api/product-cards/${editingProduct.product_id}` : 'http://vps11.alpuca.com:3000/api/product-cards';

            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': localStorage.token                 
                },
                body: JSON.stringify(updatedProduct),
            })
            .then(response => response.json())
            .then(data => {
                if (editingProduct) {
                    setProducts(prevProducts => prevProducts.map(product => product.product_id === data.result.id ? data.result : product));
                } else {
                    setProducts(prevProducts => [...prevProducts, data.result]);
                }
                setEditingProduct(null);
                formik.resetForm();
                setImage(null);
            })
            .catch(error => console.error('Error saving product:', error));
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
                                Cargar foto!!!!!!
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
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                id="S"
                                name="S"
                                label="Unidades S"
                                type="number"
                                value={formik.values.S}
                                onChange={formik.handleChange}
                                error={formik.touched.S && Boolean(formik.errors.S)}
                                helperText={formik.touched.S && formik.errors.S}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                id="M"
                                name="M"
                                label="Unidades M"
                                type="number"
                                value={formik.values.M}
                                onChange={formik.handleChange}
                                error={formik.touched.M && Boolean(formik.errors.M)}
                                helperText={formik.touched.M && formik.errors.M}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                id="L"
                                name="L"
                                label="Unidades L"
                                type="number"
                                value={formik.values.L}
                                onChange={formik.handleChange}
                                error={formik.touched.L && Boolean(formik.errors.L)}
                                helperText={formik.touched.L && formik.errors.L}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                id="XL"
                                name="XL"
                                label="Unidades XL"
                                type="number"
                                value={formik.values.XL}
                                onChange={formik.handleChange}
                                error={formik.touched.XL && Boolean(formik.errors.XL)}
                                helperText={formik.touched.XL && formik.errors.XL}
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
                    {products.map((product) => (
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
                                        {parseFloat(product.price).toFixed(2)} €
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.description}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                                    
                                    <IconButton color="primary" onClick={() =>{ 
                                        console.log("Edit product ID:", product); 
                                        handleEditProduct(product)}}>
                                         <EditIcon />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => {
                                        console.log("Edit product ID:", product.product_id);
                                        handleDeleteProduct(product.product_id)}}>
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

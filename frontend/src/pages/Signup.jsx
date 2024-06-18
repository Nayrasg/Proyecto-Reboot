import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Grid, FormControlLabel, Checkbox } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CartDrawer from '../components/CartDrawer';

// Validación con Yup
const validationSchema = yup.object({
    firstName: yup.string().required('Nombre es obligatorio'),
    lastName: yup.string().required('Apellido es obligatorio'),
    email: yup.string().email('Debe ser un correo electrónico válido').required('Correo Electrónico es obligatorio'),
    address: yup.string().required('Dirección es obligatorio'),
    localidad: yup.string().required('Localidad es obligatorio'),
    telefono: yup.string().required('Teléfono es obligatorio'),
    cp: yup.string().required('C.P. es obligatorio'),
    numero: yup.string().required('Número es obligatorio'),
    piso: yup.string().required('Piso es obligatorio'),
    provincia: yup.string().required('Provincia es obligatorio'),
    password: yup.string().required('Contraseña es obligatorio').min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir').required('Confirmar Contraseña es obligatorio'),
    isSeller: yup.boolean(),
    nif: yup.string().when('isSeller', {
        is: true,
        then: yup.string().required('NIF/CIF/NIE es obligatorio'),
    }),
    pdfFile: yup.mixed().when('isSeller', {
        is: true,
        then: yup.mixed().required('Debe cargar el modelo 036 o equivalente').test('fileFormat', 'El archivo debe ser un PDF', (value) => {
            return value && value.type === 'application/pdf';
        }),
    }),
});

const Signup = () => {
    const [pdfFile, setPdfFile] = useState(null);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            localidad: '',
            telefono: '',
            cp: '',
            numero: '',
            piso: '',
            provincia: '',
            password: '',
            confirmPassword: '',
            isSeller: false,
            nif: '',
            pdfFile: null,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append('firstName', values.firstName);
            formData.append('lastName', values.lastName);
            formData.append('email', values.email);
            formData.append('address', values.address);
            formData.append('localidad', values.localidad);
            formData.append('telefono', values.telefono);
            formData.append('cp', values.cp);
            formData.append('numero', values.numero);
            formData.append('piso', values.piso);
            formData.append('provincia', values.provincia);
            formData.append('password', values.password);
            formData.append('isSeller', values.isSeller);
            if (values.isSeller && pdfFile) {
                formData.append('pdfFile', pdfFile);
                formData.append('nif', values.nif);
            }

            // Aquí puedes enviar el formulario con los datos y archivos adjuntos
            fetch('/api/signup', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Éxito:', data);
                    // Aquí puedes manejar la respuesta del servidor
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        },
    });

    const handlePdfChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setPdfFile(event.target.files[0]);
            formik.setFieldValue('pdfFile', event.target.files[0]);
        }
    };

    return (
        <>
            <Navbar />
            <CartDrawer />
            <Container component="main" maxWidth="md" sx={{ marginTop: 12, marginBottom: 14 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Regístrate
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Nombre/Razón Social"
                                    autoFocus
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                    helperText={formik.touched.firstName && formik.errors.firstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="lastName"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Apellido"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Correo Electrónico"
                                    name="email"
                                    autoComplete="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="address"
                                    label="Dirección"
                                    name="address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.address && Boolean(formik.errors.address)}
                                    helperText={formik.touched.address && formik.errors.address}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="localidad"
                                    label="Localidad"
                                    name="localidad"
                                    value={formik.values.localidad}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.localidad && Boolean(formik.errors.localidad)}
                                    helperText={formik.touched.localidad && formik.errors.localidad}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="telefono"
                                    label="Teléfono"
                                    name="telefono"
                                    value={formik.values.telefono}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                                    helperText={formik.touched.telefono && formik.errors.telefono}
                                />
                            </Grid>
                            {formik.values.isSeller && (
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="nif"
                                        label="NIF/CIF/NIE"
                                        name="nif"
                                        value={formik.values.nif}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.nif && Boolean(formik.errors.nif)}
                                        helperText={formik.touched.nif && formik.errors.nif}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="cp"
                                    label="C.P."
                                    name="cp"
                                    value={formik.values.cp}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.cp && Boolean(formik.errors.cp)}
                                    helperText={formik.touched.cp && formik.errors.cp}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="numero"
                                    label="Número"
                                    name="numero"
                                    value={formik.values.numero}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.numero && Boolean(formik.errors.numero)}
                                    helperText={formik.touched.numero && formik.errors.numero}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="piso"
                                    label="Piso"
                                    name="piso"
                                    value={formik.values.piso}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.piso && Boolean(formik.errors.piso)}
                                    helperText={formik.touched.piso && formik.errors.piso}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="provincia"
                                    label="Provincia"
                                    name="provincia"
                                    value={formik.values.provincia}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.provincia && Boolean(formik.errors.provincia)}
                                    helperText={formik.touched.provincia && formik.errors.provincia}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirmar Contraseña"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formik.values.isSeller}
                                            onChange={formik.handleChange}
                                            name="isSeller"
                                            color="primary"
                                        />
                                    }
                                    label="¿Quieres ser vendedor? Envíanos el modelo 036 o equivalente."
                                />
                            </Grid>
                            {formik.values.isSeller && (
                                <Grid item xs={12}>
                                    <Button variant="contained" component="label">
                                        Cargar PDF
                                        <input type="file" hidden accept="application/pdf" onChange={handlePdfChange} />
                                    </Button>
                                    {formik.values.pdfFile && (
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            {formik.values.pdfFile.name}
                                        </Typography>
                                    )}
                                    {formik.touched.pdfFile && formik.errors.pdfFile && (
                                        <Typography color="error" variant="body2">
                                            {formik.errors.pdfFile}
                                        </Typography>
                                    )}
                                </Grid>
                            )}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Registrarme
                        </Button>
                    </Box>
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default Signup;

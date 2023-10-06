import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme, useMediaQuery, Box, Button, TextField, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { setLogin } from "state/authSlice";
import Dropzone from "react-dropzone";
import FlexBw from "components/FlexBw";

const registerSchema = yup.object().shape({    
    fName: yup.string().required("required"),
    lName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    profession: yup.string().required("required"),
    picture: yup.string()
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    profession: "",
    picture: "",
};


const initialValuesLogin = {
    email: "",
    password: "",
};

const Form = () => {
    const [pageType, setPageType] = useState('login');
    const [image, setImage] = useState(null);
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isBigScreen = useMediaQuery('(min-width: 700px)');
    const isLogin = pageType === 'login';
    const isRegister = pageType === 'register';

    const register = async (values, onSubmitProps) => {
        // send form information with the user image
        const formData = new FormData();
        for(let value in values){
            formData.append(value, values[value])
        }

        //  appending filename of picture
        if(image){
            const d = new Date()
            formData.append('picturePath', `${Math.floor(d.getTime() / 10000)}-${values.picture.name}`);
        }

        const savedUserResponse = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
            {
                method: 'POST',
                body: formData 
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if(savedUser){
            setPageType('login');
        }
    };


    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(values) 
            }
        );
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        
        if(loggedIn){
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate('/home');
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if(isLogin) await login(values, onSubmitProps);
        if(isRegister) await register(values, onSubmitProps);
    };

    return(
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm}) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display='grid'
                        gap='30px'
                        gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                        sx={{
                            '& > div': {gridColumn: isBigScreen ? undefined : 'span 4'}
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField
                                    label='First Name'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.fName}
                                    name='fName'
                                    error={Boolean(touched.fName) && Boolean(errors.fName)}
                                    helperText={touched.fName && errors.fName}
                                    sx={{gridColumn: 'span 2'}}
                                />
                                <TextField
                                    label='Last Name'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lName}
                                    name='lName'
                                    error={Boolean(touched.lName) && Boolean(errors.lName)}
                                    helperText={touched.lName && errors.lName}
                                    sx={{gridColumn: 'span 2'}}
                                />
                                <TextField
                                    label='Location'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name='location'
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{gridColumn: 'span 4'}}
                                />
                                <TextField
                                    label='Profession'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.profession}
                                    name='profession'
                                    error={Boolean(touched.profession) && Boolean(errors.profession)}
                                    helperText={touched.profession && errors.profession}
                                    sx={{gridColumn: 'span 4'}}
                                />
                                <Box
                                    gridColumn='span 4'
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius='5px'
                                    p='1rem'
                                >
                                    <Dropzone
                                        acceptedFiles='.jpg,.jpeg,.png'
                                        multiple={false}
                                        onDrop={(acceptedFiles) => {
                                            setFieldValue('picture', acceptedFiles[0])
                                            setImage(acceptedFiles[0])
                                        }}
                                    >
                                        {({getRootProps, getInputProps}) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p='1rem'
                                                sx={{'&:hover': {cursor: 'pointer'}}}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p> Add Picture Here </p>
                                                ) : (
                                                    <FlexBw>
                                                        <Typography>
                                                            {values.picture.name}
                                                        </Typography>
                                                        <EditOutlinedIcon />
                                                    </FlexBw>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                        )}

                        <TextField 
                            label='Email'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name='email'
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.mail}
                            sx={{ gridColumn: 'span 4'}}
                        />
                        <TextField 
                            label='Password'
                            type='password'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name='password'
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: 'span 4'}}
                        />
                    </Box>
                    
                    {/* BUTTONS  */}
                    <Box>
                        <Button
                            fullWidth
                            type='submit'
                            sx={{
                                m: '2rem 0',
                                p: '1rem',
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                '&:hover': {color: palette.primary.main}
                            }}
                        >
                            {isLogin ? 'LOGIN': 'REGISTER'}
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? 'register' : 'login');
                                resetForm();
                            }}
                            sx={{
                                textDecoration: 'underline',
                                color: palette.primary.main,
                                '&:hover': {
                                    cursor: 'pointer',
                                    color: palette.primary.light,
                                } 
                            }}
                        >
                            {isLogin ? "Don't have an account? Sign up now!"
                                : 'Already have an account? Login here.'
                            }
                        </Typography>
                    </Box>
                </form>
            )}

        </Formik>
    )
}   

export default Form;
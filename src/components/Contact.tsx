import React from 'react';
import Section from './Section';
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material';
import Grid from "@mui/material/Grid";

interface ContactProps {
    className?: string;
    ref?: React.RefObject<HTMLDivElement> | null;
    deviceType?: 'mobile' | 'tablet' | 'desktop';
}

const Contact: React.FC<ContactProps> = ({className = "", ref = null, deviceType = 'desktop'}) => {
    // const [form, setForm] = useState({
    //     name: '',
    //     email: '',
    //     message: '',
    // });
    // const [submitted, setSubmitted] = useState(false);
    //
    // const handleChange = (
    //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    // ) => {
    //     setForm({...form, [e.target.name]: e.target.value});
    // };
    //
    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     // Process form data here (e.g., send to an API)
    //     console.log('Form data:', form);
    //     setSubmitted(true);
    // };

    return (
        <Section id="contact" ref={ref} className={`${className} contact-section final`}>
            <Typography variant="h1" align="center" gutterBottom>
                Contact Me
            </Typography>
            <Grid container spacing={4}>
                {/* Left Column: Contact Form */}
                {/*<Grid2 size={{xs: 12, md: 6}}>*/}
                {/*    {submitted ? (*/}
                {/*        <Typography variant="h2" align="center" color="primary">*/}
                {/*            Thank you for your message!*/}
                {/*        </Typography>*/}
                {/*    ) : (*/}
                {/*        <Box component="form" onSubmit={handleSubmit} noValidate>*/}
                {/*            <TextField*/}
                {/*                fullWidth*/}
                {/*                margin="normal"*/}
                {/*                label="Name"*/}
                {/*                name="name"*/}
                {/*                value={form.name}*/}
                {/*                onChange={handleChange}*/}
                {/*                required*/}
                {/*            />*/}
                {/*            <TextField*/}
                {/*                fullWidth*/}
                {/*                margin="normal"*/}
                {/*                label="Email"*/}
                {/*                name="email"*/}
                {/*                type="email"*/}
                {/*                value={form.email}*/}
                {/*                onChange={handleChange}*/}
                {/*                required*/}
                {/*            />*/}
                {/*            <TextField*/}
                {/*                fullWidth*/}
                {/*                margin="normal"*/}
                {/*                label="Message"*/}
                {/*                name="message"*/}
                {/*                value={form.message}*/}
                {/*                onChange={handleChange}*/}
                {/*                multiline*/}
                {/*                rows={4}*/}
                {/*                required*/}
                {/*            />*/}
                {/*            <Button*/}
                {/*                variant="contained"*/}
                {/*                type="submit"*/}
                {/*                fullWidth*/}
                {/*                sx={{mt: 2}}*/}
                {/*            >*/}
                {/*                Send Message*/}
                {/*            </Button>*/}
                {/*        </Box>*/}
                {/*    )}*/}
                {/*</Grid2>*/}

                {/* Right Column: My Info */}
                <Grid size={{xs:12, md:12}}>
                    <Typography variant="h6" gutterBottom>
                        My Info
                    </Typography>
                    <Typography variant="body1" sx={{mt: 1}}>
                        <strong>Email:</strong> michali.moneta@gmail.com
                    </Typography>
                    <Typography variant="body1" sx={{mt: 1}}>
                        <strong>Mobile:</strong> +31 6 2739 8232
                    </Typography>
                    <Typography variant="body1" sx={{mt: 1}}>
                        <strong>WhatsApp:</strong> +972 52 300 5600
                    </Typography>
                    <Typography variant="body1" sx={{mt: 1}}>
                        <strong>LinkedIn:</strong>{' '}
                        <a
                            href="https://www.linkedin.com/in/michal-moneta-4b5772b6"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{textDecoration: 'none', color: 'inherit'}}
                        >
                            My LinkedIn
                        </a>
                    </Typography>
                    <Button
                        variant="outlined"
                        sx={{mt: 3}}
                        href="/path/to/your-cv.pdf"
                        download
                    >
                        Download CV
                    </Button>
                    </Grid>
            </Grid>
        </Section>
    );
};

export default Contact;
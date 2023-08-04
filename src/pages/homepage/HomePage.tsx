import Banner from './banner/Banner'
import { Container, Stack, ThemeProvider } from '@mui/material'
import theme from '../../styles/homepage/theme/theme'

function HomePage() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Container
                    disableGutters
                    maxWidth="xl"
                    sx={{
                        background: "#fff",
                    }}
                >
                    <Stack>
                    <Banner />
                    </Stack>
                </Container>
            </ThemeProvider>    
        </>
    )
}

HomePage.propTypes = {}

export default HomePage

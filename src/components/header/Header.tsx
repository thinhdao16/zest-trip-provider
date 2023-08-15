import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
function Header() {
    return (
        <>

            <Box sx={{ flexGrow: 1, width: "100vw" }}>
                <AppBar position="static" style={{ backgroundColor: "white",boxShadow:"none", borderBottom:"1px solid #e4e4e4 " }}>
                    <Toolbar>
                        <Box sx={{ flexGrow: 1 }}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="error"
                                aria-label="menu"
                                sx={{ color: "black" }}
                            />
                        </Box>

                        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                            <Button color="inherit" style={{ color: "black" }}>Button 12</Button>
                            <Button color="inherit" style={{ color: "black" }}>Button 23</Button>
                            <Button color="inherit" style={{ color: "black" }}>Button 35</Button>
                            <Button color="inherit" style={{ color: "black" }}>Button 44</Button>
                        </Box>
                        <Box sx={{ flexGrow: 1, textAlign: "right" }}>
                            3
                        </Box>
                        {/* <Login />
            <SignUp />
            <SetUpProvider /> */}
                    </Toolbar>
                </AppBar>
            </Box>

        </>
    )
}

Header.propTypes = {}

export default Header

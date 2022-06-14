import {createTheme} from "@mui/material/styles";


export const themeValues = {

    // color system
    palette: {
        primary: {
            light: "#FBE9E7",
            main: "#FF3D00",
            dark: "#DD2C00",
        },
        primaryGradient: {
            light: "linear-gradient(#FBF0E7, #FBE9E7)",
            lightHorizontal: "linear-gradient(0.25turn, #FBF0E7, #FBE9E7)",
            main: "linear-gradient(#FF9000, #FF3D00)",
            mainHorizontal: "linear-gradient(0.25turn, #FF9000, #FF3D00)",
            dark: "linear-gradient(#DD7600, #DD2C00)",
            darkHorizontal: "linear-gradient(0.25turn, #DD7600, #DD2C00)",
        },
        success: {
            light: "#A5D6A7",
            main: "#4CAF50",
            dark: "#1B5E20",
        },
        error: {
            light: "#EF9A9A",
            main: "#F44336",
            dark: "#B71C1C",
        },
        warning: {
            light: "#FFF59D",
            main: "#FBC02D",
            dark: "#F57F17",
        },
        info: {
            light: "#80DEEA",
            main: "#00BCD4",
            dark: "#006064",
        },
        grey: {
            100: "#FAFAFA",
            200: "#E0E0E0",
            300: "#9E9E9E",
            400: "#616161",
            500: "#424242"
        },
        text: {
            primary: "#424242",
            secondary: "#9E9E9E",
            disabled: "#E0E0E0"
        },

        border: "rgba(0, 0, 0, 0.23)",

        background: {
            default: "#FAFAFA",
            paper: "#FFFFFF"
        },
    },

    // elevation system
    shadows: [
        "none",
        // single shadow
        "0px 1px 3px 0px rgba(5,5,5,0.1)",
        "0px 4px 6px 0px rgba(5,5,5,0.1)",
        "0px 5px 15px 0px rgba(5,5,5,0.1)",
        "0px 10px 24px 0px rgba(5,5,5,0.1)",
        "0px 15px 35px 0px rgba(5,5,5,0.1)",
        // dual shadows
        "0px 1px 3px 0px rgba(3,3,3,0.1), 0px 1px 2px 0px rgba(3,3,3,0.1)",
        "0px 3px 4px 0px rgba(3,3,3,0.1), 0px 2px 4px 0px rgba(3,3,3,0.1)",
        "0px 10px 20px 0px rgba(3,3,3,0.1), 0px 3px 6px 0px rgba(3,3,3,0.1)",
        "0px 15px 25px 0px rgba(3,3,3,0.1), 0px 5px 10px 0px rgba(3,3,3,0.1)",
        "0px 20px 40px 0px rgba(5,5,5,0.1)",
        // colorful shadows
        "0px 15px 25px 0px rgba(255,144,0,0.1), 0px 5px 10px 0px rgba(255,144,0,0.1)",
    ],

    // spacing system
    //        0, 1, 2, 3, 4,  5,  6,  7,  8,  9,  10, 11, 12, 13
    spacing: [0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 160],

    // fonts
    typography: {
        fontFamily: ["IBM Plex Sans", "Helvetica Neue", "Arial", "sans-serif"].join(','),
        h1: {
            fontFamily: ["IBM Plex Sans", "Helvetica Neue", "Arial", "sans-serif"].join(','),
            fontWeight: 300,
            fontSize: "42px",
            lineHeight: "50px",
            letterSpacing: 0,
        },
        h2: {
            fontFamily: ["IBM Plex Sans", "Helvetica Neue", "Arial", "sans-serif"].join(','),
            fontWeight: 400,
            fontSize: "32px",
            lineHeight: "4x0px",
            letterSpacing: 0,
        },
        h3: {
            fontFamily: ["IBM Plex Sans", "Helvetica Neue", "Arial", "sans-serif"].join(','),
            fontWeight: 400,
            fontSize: "28px",
            lineHeight: "36px",
            letterSpacing: 0,
        },
        h4: {
            fontFamily: ["IBM Plex Sans", "Helvetica Neue", "Arial", "sans-serif"].join(','),
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "26px",
            letterSpacing: 0,
        },
        h5: {
            fontFamily: ["IBM Plex Sans", "Helvetica Neue", "Arial", "sans-serif"].join(','),
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "22px",
            letterSpacing: 0,
        },
        h6: {
            fontFamily: ["IBM Plex Sans", "Helvetica Neue", "Arial", "sans-serif"].join(','),
            fontWeight: 600,
            fontSize: "12px",
            lineHeight: "18px",
            letterSpacing: "0.16px",
        },
        body1: {
            fontFamily: ["IBM Plex Sans", "Helvetica Neue", "Arial", "sans-serif"].join(','),
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "18px",
            letterSpacing: "0.16px"
        },
        body2: {
            fontFamily: ["IBM Plex Sans", "Helvetica Neue", "Arial", "sans-serif"].join(','),
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "22px",
            letterSpacing: 0
        },

        button: {
            fontFamily: ["IBM Plex Sans", "Helvetica Neue", "Arial", "sans-serif"].join(','),
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "22px",
            letterSpacing: 0,
        },
    },

    // border radius
    shape: {
        borderRadius: 8
    },
}

export const overrides = createTheme({
    ...themeValues,
    //component overrides
    components: {
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },

                standardError: {
                    color: themeValues.palette.error['main'],
                }
            }
        },

        MuiAlertTitle: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                },

            }
        },

        MuiCssBaseline: {
            styleOverrides: {
                "*::-webkit-scrollbar": {
                    width: '0.4em',
                },
                "*::-webkit-scrollbar-track": {
                    'WebkitBoxShadow': 'inset 0 0 6px rgba(0,0,0,0.00)',


                },
                "*::-webkit-scrollbar-thumb": {
                    backgroundColor: '#E0E0E0',
                    outline: '0px',
                    borderRadius: '4px',
                }
            }
        },
    },
});

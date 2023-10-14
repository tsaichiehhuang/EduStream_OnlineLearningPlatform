import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles'
import { outlinedInputClasses } from '@mui/material/OutlinedInput'

export const customTheme = (outerTheme: Theme) =>
    createTheme({
        palette: {
            mode: outerTheme.palette.mode,
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        borderRadius: '10px',
                        '--TextField-brandBorderColor': '#E0E3E7',
                        '--TextField-brandBorderHoverColor': '#B0B0B0',
                        '--TextField-brandBorderFocusedColor': '#000000',
                        '& label.Mui-focused': {
                            color: 'var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    notchedOutline: {
                        borderColor: 'var(--TextField-brandBorderColor)',
                        borderRadius: '10px',
                        borderWidth: '1.5px',
                        boxShadow: '0px 0px 0px 1px var(--TextField-brandBorderColor)',
                    },
                    input: {
                        padding: '10px',
                    },
                    root: {
                        borderRadius: '10px',
                        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: 'var(--TextField-brandBorderHoverColor)',
                        },
                        [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: 'var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
        },
    })

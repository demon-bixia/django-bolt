import CircularProgress, {
    circularProgressClasses,
} from "@mui/material/CircularProgress";
import {Box, styled} from "@mui/system";

const Background = styled(Box)(({theme}) => ({
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    zIndex: 9999,
    background: theme.palette.background.default,
}));

const CricleWrap = styled(Box)(({theme}) => ({
    position: 'relative'
}));

const BackgroundCircle = styled(CircularProgress)(({theme}) => ({color: theme.palette.grey['200']}));

const Circle = styled(CircularProgress)(({theme}) => ({
    color: theme.palette.primary.main,
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
    [`& .${circularProgressClasses.circle}`]: {
        strokeLinecap: 'round',
    },
}));

const Preloader = () => {
    return (<Background>
        <CricleWrap>
            <BackgroundCircle
                variant="determinate"
                size={40}
                thickness={4}
                value={100}
            />
            <Circle
                variant="indeterminate"
                disableShrink
                size={40}
                thickness={4}
            />
        </CricleWrap>
    </Background>);
}

export default Preloader;
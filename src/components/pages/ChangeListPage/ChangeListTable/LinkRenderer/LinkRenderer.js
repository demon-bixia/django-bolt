import { useTheme } from "@emotion/react";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { useParams } from 'react-router-dom';

const LinkRenderer = ({ value, id, tabIndex }) => {
    const { appLabel, modelName } = useParams();
    const url = `/${appLabel}/${modelName}/${id}/change/`;
    const theme = useTheme();

    return (
        <Link
            tabIndex={tabIndex}
            component={RouterLink}
            aria-label={value}
            to={url}
            sx={{ color: theme.palette.text.primary, textDecorationColor: theme.palette.text.primary }}
        >
            {value}
        </Link>
    );

};

export default LinkRenderer;
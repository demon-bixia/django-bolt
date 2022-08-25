import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DynamicForm from "../../forms/DynamicForm";
import Form from "./Form";
import FormSkeleton from "./Form/FormSkeleton";
import FormHeader from "./FormHeader";
import { fetchFormData, resetForm, setAlertInfo, selectAlertInfo, selectConfig, selectFields, selectInlines, selectStatus } from "./formPageSlice";
import MessageSnackBar from "../../utils/alerts/MessageSnackBar";

const FormPage = () => {
    const [skeletonAnimationDelay, setSkeletonAnimationDelay] = useState(true);
    const { appLabel, modelName, action, objectId } = useParams();
    const status = useSelector(selectStatus);
    const fields = useSelector(selectFields);
    const config = useSelector(selectConfig);
    const inlines = useSelector(selectInlines);
    const alertInfo = useSelector(selectAlertInfo);
    const dispatch = useDispatch();

    let url;

    if (action === 'add') {
        url = `${appLabel}/${modelName.slice(0, -1).toLowerCase()}/add/`;
    } else if (action === 'change') {
        url = `${appLabel}/${modelName.slice(0, -1).toLowerCase()}/${objectId}/change/`;
    }

    const handleCloseAlert = () => {
        dispatch(setAlertInfo({
            open: false,
            severity: 'success',
            message: '',
        }))
    };

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchFormData({ url }));
        }

        return () => {
            dispatch(resetForm());
        };
    }, [modelName, action]);

    // insure that the loader stays for atleast 1 second
    setTimeout(() => {
        setSkeletonAnimationDelay(false);
    }, 1000);

    return (
        <Box>
            <FormHeader action={action} />
            {
                status === 'success' && !skeletonAnimationDelay
                    ? (
                        <DynamicForm
                            url={url}
                            method={action === 'add' ? 'post' : 'put'}
                            modelName={modelName}
                            appLabel={appLabel}
                            formFields={fields}
                            FormComponent={Form}
                            config={config}
                            inlines={inlines}
                            action={action}
                        />
                    )
                    : (
                        <FormSkeleton />
                    )
            }
            <MessageSnackBar
                {...alertInfo}
                handleClose={handleCloseAlert}
            />
        </Box>
    );
};

export default FormPage;
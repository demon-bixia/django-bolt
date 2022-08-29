import { composeMessage, actionNameMapping } from "../HomePage/ActivityLog/utils";
import moment from "moment";

export const constructUrls = ({ objectId, page, pageSize }) => {
    let url = '/admin_log/';

    // pagination and ordering
    url += `?p=${page + 1}&page_size=${pageSize}&o=-action_time`;

    // filtering
    if (objectId) {
        url += `&object_id=${objectId}`;
    }

    return url;
};

export const constructRows = (actionList) => {
    return actionList.map((action, index) => ({
        id: index,
        user: action.user.username,
        object_id: action.object_id,
        object_repr: action.object_repr,
        action: actionNameMapping[action.action_flag],
        message: composeMessage(action),
        time: moment(action.action_time).format('YYYY/MM/DD hh:mm:ss A'),
    }));
};
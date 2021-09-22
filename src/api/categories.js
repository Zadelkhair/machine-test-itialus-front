import axios from "axios";
import config from "../../config";

export default {

    all(args, callback) {

        let errors = [];

        if (errors.length > 0) {
            return {
                success: false,
                data: errors
            }
        }

        axios({
            method: "GET",
            url: config.server + '/all/categories',
            data: {},
        })
            .then((response) => {
                if (response.status == 200) {
                    callback(response);
                }
            })
            .catch((error) => {
                callback(error);
            });

        return { success: true }

    },

    store(args, callback) {

        let errors = [];

        if (!args.name) {
            errors.push({
                arg: 'name',
                message: 'name is required'
            });
        }

        if (errors.length > 0) {
            return {
                success: false,
                data: errors
            }
        }

        axios({
            method: "POST",
            url: config.server + '/store/category',
            data: {
                name: args.name,
            },
        })
            .then((response) => {
                if (response.status == 200) {
                    callback(response);
                }
            })
            .catch((error) => {
                callback(error);
            });

        return { success: true }
    },

    delete(args, callback) {

        let errors = [];

        if (!args.id) {
            errors.push({
                arg: 'id',
                message: 'id is required'
            });
        }

        if (errors.length > 0) {
            return {
                success: false,
                data: errors
            }
        }

        axios({
            method: "DELETE",
            url: config.server + '/delete/category',
            data: {
                id: args.id
            },
        })
            .then((response) => {
                if (response.status == 200) {
                    callback(response);
                }
            })
            .catch((error) => {
                callback(error);
            });

        return { success: true }
    }

}
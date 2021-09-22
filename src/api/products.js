import axios from "axios";
import config from "../../config";

export default {

    all(args,callback) {

        let errors = [];

        if(!errors){
            return {
                success : false,
                data : errors
            }
        }

        axios({
            method: "GET",
            url: config.server + '/all/products',
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

        return {success : true}

    },

    get(args,callback) {

        let errors = [];

        if(!args.id){
            errors.push({
                arg : 'id',
                message : 'id is required'
            });
        }

        if(!errors){
            return {
                success : false,
                data : errors
            }
        }

        axios({
            method: "GET",
            url: config.server + '/get/product',
            data: {
                id : args.id
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

        return {success : true}

    },

    search(args,callback) {

        let errors = [];

        if(!args.search){
            errors.push({
                arg : 'search',
                message : 'search is required'
            });
        }

        if(!errors){
            return {
                success : false,
                data : errors
            }
        }

        axios({
            method: "GET",
            url: config.server + '/search/products',
            data: {
                search : args.search
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

        return {success : true}

    },

    find(args,callback) {

        let errors = [];

        if(!args.by){
            errors.push({
                arg : 'by',
                message : 'by is required'
            });
        }

        if(!args.value){
            errors.push({
                arg : 'value',
                message : 'value is required'
            });
        }

        if(!errors){
            return {
                success : false,
                data : errors
            }
        }

        axios({
            method: "GET",
            url: config.server + '/find/products',
            data: {
                by : args.by,
                value : args.value
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

        return {success : true}
    },

    store(args,callback) {

        let errors = [];

        if(!args.name){
            errors.push({
                arg : 'name',
                message : 'name is required'
            });
        }

        if(!args.category){
            errors.push({
                arg : 'category',
                message : 'category is required'
            });
        }

        if(!args.quantity){
            errors.push({
                arg : 'quantity',
                message : 'quantity is required'
            });
        }

        if(!args.status){
            errors.push({
                arg : 'status',
                message : 'status is required'
            });
        }

        if(!errors){
            return {
                success : false,
                data : errors
            }
        }

        axios({
            method: "POST",
            url: config.server + '/store/product',
            data: {
                name:args.name,
                category:args.category,
                quantity:args.quantity,
                status:args.status
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

            return {success : true}
    },

    update(args,callback) {

        let errors = [];

        if(!args.id){
            errors.push({
                arg : 'id',
                message : 'id is required'
            });
        }

        if(!errors){
            return {
                success : false,
                data : errors
            }
        }

        let data = {};

        
        if(args.id){
            data.id = args.id;
        }
        
        if(args.name){
            data.name = args.name;
        }
        
        if(args.category){
            data.category = args.category;
        }
        
        if(args.quantity){
            data.quantity = args.quantity;
        }
        
        if(args.status){
            data.status = args.status;
        }

        console.log("data",data);

        axios({
            method: "PUT",
            url: config.server + '/update/product',
            data: data,
        })
            .then((response) => {
                if (response.status == 200) {
                    callback(response);
                }
            })
            .catch((error) => {
                callback(error);
            });

            return {success : true}
    },

    delete(args,callback) {

        let errors = [];

        if(!args.id){
            errors.push({
                arg : 'id',
                message : 'id is required'
            });
        }

        if(!errors){
            return {
                success : false,
                data : errors
            }
        }

        axios({
            method: "DELETE",
            url: config.server + '/delete/product',
            data: {
                id : args.id
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

            return {success : true}
    },

}

// Links Api:

const Api_routes = {
    users: {
        register: "http://localhost:3000/api/users/register",
        login: "http://localhost:3000/api/users/login",
        delete: "http://localhost:3000/api/users/cancel",
        status: "http://localhost:3000/api/users/static"
    },
    calendar: {
        all: "http://localhost:3000/api/event/all",
        users: "http://localhost:3000/api/event/users",
        add: "http://localhost:3000/api/event/add",
        delete: "http://localhost:3000/api/event/delete",
        upadate: "http://localhost:3000/api/event/update",
    },
    booking:{
        events: "http://localhost:3000/api/booking/users",
        add: "http://localhost:3000/api/booking/add",
        verify: "http://localhost:3000/api/booking/verify"
    }
}

export default Api_routes
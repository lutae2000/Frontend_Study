let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
    backendHost = "http://localhost:8080";
    //backendHost = "http://prod-todo-backend2.us-west-2.elasticbeanstalk.com";
} else {
    backendHost = "http://prod-todo-backend2.us-west-2.elasticbeanstalk.com";
}

export const API_BASE_URL = `${backendHost}`;

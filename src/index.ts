import server from "./server/Server";

server.listen(process.env.PORT || 8000, () => console.log(`server runing on http://127.0.0.1:${process.env.PORT || 8000}`));
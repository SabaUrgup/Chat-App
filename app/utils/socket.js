import { io } from "socket.io-client";
import {SOCKET_URL} from '../config.js';
const socket = io.connect(SOCKET_URL);
export default socket;
/*
Bu kod parçası url ile bağlı serverda gerçek zamanlı bağlantı oluşturmayı sağlar
*/
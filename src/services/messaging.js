const { server } = require('../../app.js');
const socketIO = require('socket.io');

// Creacion de un servidor Socket.IO. Permite manejar conecciones HTTP y WebSocket. 
const io = socketIO(server);

/**
* Estructuras de datos para el sistema de mensajería
* @type {Array} messages - Almacena el historial de mensajes
* @type {Map} connectedUsers - Mantiene registro de usuarios conectados
*/
const messages = [];
const connectedUsers = new Map();

// Configuración de logging personalizado para WebSocket events
const wsLogger = (event, ...args) => {
    console.log(`[WebSocket][${new Date().toISOString()}] ${event}:`,
        ...args);
};

/**
* Función para la Configuración principal de Socket.IO
* Maneja todos los eventos de WebSocket
*/
const socketIOSetup = () => {

    io.on('connection', (socket) => {
        wsLogger('connect', `Cliente conectado - ID: ${socket.id}`);
        // Evento Connect
        socket.emit('welcome', {
            message: 'Bienvenido al servidor de mensajería'
        });
        // Evento Join
        socket.on('join', (userData) => {
            try {
                connectedUsers.set(socket.id, {
                    id: socket.id,
                    username: userData.username,
                    joinedAt: new Date()
                });
                wsLogger('join', `Usuario ${userData.username} se unió`);
                // Broadcast a todos los usuarios conectados
                io.emit('userJoined', {
                    userId: socket.id,
                    username: userData.username,
                    onlineUsers: Array.from(connectedUsers.values())
                });
            } catch (error) {
                handleError(socket, 'join', error);
            }
        });
        // Evento Message
        socket.on('message', (data) => {
            try {
                const user = connectedUsers.get(socket.id);
                if (!user) throw new Error('Usuario no autenticado');
                const messageData = {
                    id: Date.now(),
                    userId: socket.id,
                    username: user.username,
                    content: data.content,
                    timestamp: new Date()
                };
                messages.push(messageData);
                wsLogger('message', `Mensaje de ${user.username}: ${data.content}`);
                // Broadcast del mensaje a todos los usuarios
                io.emit('newMessage', messageData);
            } catch (error) {
                handleError(socket, 'message', error);
            }
        });
        // Evento Leave
        socket.on('leave', () => {
            try {
                const user = connectedUsers.get(socket.id);
                if (user) {
                    wsLogger('leave', `Usuario ${user.username} abandonó el chat`);
                    handleUserDisconnect(socket);
                }
            } catch (error) {
                handleError(socket, 'leave', error);
            }
        });
        // Evento Ping
        socket.on('ping', () => {
            try {
                socket.emit('pong', { timestamp: Date.now() });
                wsLogger('ping', `Ping recibido de ${socket.id}`);
            } catch (error) {
                handleError(socket, 'ping', error);
            }
        });
        // Evento Disconnect
        socket.on('disconnect', () => {
            try {
                wsLogger('disconnect', `Cliente desconectado - ID: ${socket.id}`);
                handleUserDisconnect(socket);
            } catch (error) {
                handleError(socket, 'disconnect', error);
            }
        });
        // Evento Reconnect
        socket.on('reconnect_attempt', () => {
            wsLogger('reconnect_attempt', `Intento de reconexión - ID:
        ${socket.id}`);
        });
    });
}

// Función para el manejo de desconexiones de usuarios
function handleUserDisconnect(socket) {
    const user = connectedUsers.get(socket.id);
    if (user) {
        connectedUsers.delete(socket.id);
        io.emit('userLeft', {
            userId: socket.id,
            username: user.username,
            onlineUsers: Array.from(connectedUsers.values())
        });
    }
}

// Función para manejar errores
function handleError(socket, event, error) {
    console.error(`[ERROR][${event}]`, error);
    socket.emit('error', {
        event,
        message: 'Ha ocurrido un error en el servidor',
        timestamp: new Date()
    });
}

module.exports = socketIOSetup;
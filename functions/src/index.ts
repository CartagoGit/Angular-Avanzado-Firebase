/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import * as serviceAccount from "./private/serviceAccountKey.json";

// import * as logger from "firebase-functions/logger";

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
	databaseURL:
		"https://firestore-grafica-2b149-default-rtdb.europe-west1.firebasedatabase.app",
});

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
	// logger.info("Hello logs!", { structuredData: true });
	response.json({ mensaje: "Hola desde Firebase!" });
});

export const getGoty = onRequest((request, response) => {
	const nombre = request.query.nombre || "Sin nombre";
	response.status(200).json({
		ok: true,
		mensaje: "Todo esta bien",
		nombre,
	});
});

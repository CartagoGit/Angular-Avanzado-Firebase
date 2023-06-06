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
import * as express from "express";
import * as cors from "cors";

// import * as logger from "firebase-functions/logger";

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
	databaseURL:
		"https://firestore-grafica-2b149-default-rtdb.europe-west1.firebasedatabase.app",
});

const db = admin.firestore();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((_request, response) => {
	// logger.info("Hello logs!", { structuredData: true });
	response.json({ mensaje: "Hola desde Firebase!" });
});

export const getParam = onRequest((request, response) => {
	const nombre = request.query.nombre || "Sin nombre";
	response.status(200).json({
		ok: true,
		mensaje: "Todo esta bien",
		nombre,
	});
});

// export const getGoty = onRequest(async (_request, response) => {
// 	const gotyRef = db.collection("goty");
// 	const docsSnap = await gotyRef.get();
// 	const juegos = docsSnap.docs.map((doc) => doc.data());
// 	response.json(juegos);
// });

const app = express.default();
app.use(cors.default({ origin: true }));

// exports.api = onRequest(app);
app.get("/get-goty", async (_request, response) => {
	const gotyRef = db.collection("goty");
	const docsSnap = await gotyRef.get();
	const juegos = docsSnap.docs.map((doc) => doc.data());
	response.json(juegos);
});

export const api = onRequest(app);

const express = require('express');
const { KJUR } = require('jsrsasign');
const { inNumberArray, isBetween, isRequiredAllOrNone, validateRequest } = require('../validations');
const dotenv = require('dotenv');
dotenv.config()

const zoomAuthEndpoint = express.Router({ mergeParams: true });
zoomAuthEndpoint.use(express.json());

const propValidations = {
  role: inNumberArray([0, 1]),
  expirationSeconds: isBetween(1800, 172800)
};

const schemaValidations = [isRequiredAllOrNone(['meetingNumber', 'role'])];

const coerceRequestBody = (body) => ({
  ...body,
  ...['role', 'expirationSeconds'].reduce(
    (acc, cur) => ({ ...acc, [cur]: typeof body[cur] === 'string' ? parseInt(body[cur]) : body[cur] }),
    {}
  )
});

zoomAuthEndpoint.post('/', (req, res) => {
  const requestBody = coerceRequestBody(req.body);
  const validationErrors = validateRequest(requestBody, propValidations, schemaValidations);

  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  const { meetingNumber, role, expirationSeconds } = requestBody;
  const iat = Math.floor(Date.now() / 1000);
  const exp = expirationSeconds ? iat + expirationSeconds : iat + 60 * 60 * 2;
  const oHeader = { alg: 'HS256', typ: 'JWT' };

  const oPayload = {
    appKey: process.env.ZOOM_MEETING_SDK_KEY,
    sdkKey: process.env.ZOOM_MEETING_SDK_KEY,
    mn: meetingNumber,
    role: role,
    iat,
    exp,
    tokenExp: exp
  };

  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, process.env.ZOOM_MEETING_SDK_SECRET);

  return res.json({ signature: sdkJWT });
});

module.exports = zoomAuthEndpoint